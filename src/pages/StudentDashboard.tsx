import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

interface StudentDashboardProps {
  userRegistration: Registration;
  currentUserId: string;
  onRefresh: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ userRegistration, currentUserId, onRefresh }) => {
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const isCheckedIn = userRegistration?.isCheckedIn ?? false;

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
              /* Checked In: Show full resources */
              <StudentResources />
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