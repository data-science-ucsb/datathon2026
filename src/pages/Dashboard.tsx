import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { collection, query, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import StudentDashboard from './StudentDashboard';
import OrganizerDashboard from './OrganizerDashboard';
import { motion } from 'framer-motion';

interface Registration {
  uid: string;
  email: string;
  name?: string;
  school?: string;
  year?: string;
  major?: string;
  phone?: string | null;
  dietaryRestrictions?: string;
  hasTeam?: string;
  hackathonExperience?: number;
  codingExperience?: number;
  heardFrom?: string;
  status: string;
  role: string;
  createdAt: string;
  emailVerified: boolean;
  applicationCompleted: boolean;
}

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [userRole, setUserRole] = useState<string>('student');
  const [userRegistration, setUserRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    fetchData();
  }, [currentUser]);

  const fetchData = async () => {
    if (!currentUser) return;

    try {
      const userDoc = await getDoc(doc(db, 'registrations', currentUser.uid));
      
      if (!userDoc.exists()) {
        console.error('No user document found!');
        setLoading(false);
        return;
      }

      const userData = userDoc.data() as Registration;
      const role = userData?.role || 'student';
      setUserRole(role);
      setUserRegistration(userData);

      if (role === 'organizer') {
        const q = query(collection(db, 'registrations'));
        const querySnapshot = await getDocs(q);
        const regs: Registration[] = [];
        querySnapshot.forEach((doc) => {
          regs.push(doc.data() as Registration);
        });
        setRegistrations(regs);
      } else {
        setRegistrations([userData]);
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen pt-24 px-6 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Loading your dashboard...</p>
        </div>
      </motion.div>
    );
  }

  // Route to appropriate dashboard based on role
  if (userRole === 'organizer') {
    return <OrganizerDashboard registrations={registrations} />;
  }

  return (
    <StudentDashboard 
      userRegistration={userRegistration!} 
      currentUserId={currentUser!.uid}
      onRefresh={fetchData}
    />
  );
};

export default Dashboard;