import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import ApplicationForm from '../components/ApplicationForm';
import PendingItems from '../components/dashboard/PendingItems';
import RegistrationCard from '../components/dashboard/RegistrationCard';
import RegistrationModal from '../components/dashboard/RegistrationModal';
import StudentResources from '../components/dashboard/StudentResources';

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
  isCheckedIn?: boolean;
}

interface TeamMember {
  uid: string;
  name: string;
  email: string;
}

interface Team {
  id: string;
  name: string;
  teamNumber: number;
  members: TeamMember[];
  createdAt: string;
}

interface StudentDashboardProps {
  userRegistration: Registration;
  currentUserId: string;
  onRefresh: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ userRegistration, currentUserId, onRefresh }) => {
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [userTeam, setUserTeam] = useState<Team | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const isCheckedIn = userRegistration?.isCheckedIn ?? false;

  // Listen for team assignment
  useEffect(() => {
    if (!currentUserId || !isCheckedIn) {
      setUserTeam(null);
      return;
    }

    const unsubscribe = onSnapshot(collection(db, 'teams'), (snapshot) => {
      let foundTeam: Team | null = null;
      snapshot.forEach((teamDoc) => {
        const teamData = teamDoc.data() as Omit<Team, 'id'>;
        if (teamData.members?.some((member) => member.uid === currentUserId)) {
          foundTeam = {
            id: teamDoc.id,
            ...teamData
          } as Team;
        }
      });
      setUserTeam(foundTeam);
    });

    return () => unsubscribe();
  }, [currentUserId, isCheckedIn]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  if (showApplicationForm) {
    return (
      <div className="min-h-screen pt-24 px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <ApplicationForm 
            uid={currentUserId} 
            onComplete={() => {
              setShowApplicationForm(false);
              onRefresh();
            }}
            onExit={() => {
              setShowApplicationForm(false);
              onRefresh();
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header with Logout */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
            <p className="text-gray-400">Welcome back{userRegistration?.name ? `, ${userRegistration.name}` : ''}!</p>
          </div>
          
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-600/10 hover:bg-red-600/20 backdrop-blur-xl border border-red-500/20 hover:border-red-400/40 text-red-300/80 hover:text-red-200 text-sm font-medium transition-all duration-300"
          >
            Logout
          </button>
        </div>

        {/* Pending Items */}
        <PendingItems 
          applicationCompleted={userRegistration?.applicationCompleted ?? false}
          onCompleteApplication={() => setShowApplicationForm(true)}
        />

        {/* Show content based on check-in status */}
        {userRegistration?.applicationCompleted && (
          <>
            {isCheckedIn ? (
              /* Checked In: Show team info and full resources */
              <>
                {/* Team Assignment Card */}
                <div className="mb-6">
                  {userTeam ? (
                    <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-purple-400">{userTeam.teamNumber}</span>
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-white">{userTeam.teamCode}</h2>
                          <p className="text-sm text-gray-400">
                            {userTeam.members.length} team member{userTeam.members.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      
                      {/* Team Members */}
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <h3 className="text-sm font-semibold text-gray-400 mb-3">Team Members</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {userTeam.members.map((member) => (
                            <div 
                              key={member.uid}
                              className={`flex items-center gap-3 p-3 rounded-lg ${
                                member.uid === currentUserId 
                                  ? 'bg-purple-500/10 border border-purple-500/20' 
                                  : 'bg-gray-800/50'
                              }`}
                            >
                              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-sm font-medium">
                                {member.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">
                                  {member.name}
                                  {member.uid === currentUserId && (
                                    <span className="ml-2 text-xs text-purple-400">(You)</span>
                                  )}
                                </p>
                                <p className="text-xs text-gray-500 truncate">{member.email}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-700/50 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold text-gray-300">No Team Assigned Yet</h2>
                          <p className="text-sm text-gray-500">An organizer will assign you to a team soon!</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Full Resources */}
                <StudentResources />
              </>
            ) : (
              /* Not Checked In: Show registration info only */
              <>

                {/* My Registration Info */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-4">My Registration</h2>
                  <RegistrationCard 
                    registration={userRegistration}
                    onViewDetails={() => setSelectedRegistration(userRegistration)}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Detail Modal */}
      {selectedRegistration && (
        <RegistrationModal 
          registration={selectedRegistration}
          onClose={() => setSelectedRegistration(null)}
        />
      )}
    </div>
  );
};

export default StudentDashboard;