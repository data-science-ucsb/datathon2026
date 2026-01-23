import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ApplicationForm from '../components/ApplicationForm';

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
            <p className = "text-gray-400">Welcome back{userRegistration?.name ? `, ${userRegistration.name}` : ''}!</p>
          </div>
          
          {/* Logout Button - Top Right */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-600/10 hover:bg-red-600/20 backdrop-blur-xl border border-red-500/20 hover:border-red-400/40 text-red-300/80 hover:text-red-200 text-sm font-medium transition-all duration-300"
          >
            Logout
          </button>
        </div>

        {/* Pending Items */}
        <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Pending Items</h2>
          {!userRegistration?.applicationCompleted ? (
            <div className="flex items-center justify-between p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-yellow-400">Incomplete Application</p>
                  <p className="text-sm text-gray-400">Please complete your registration to attend the event</p>
                </div>
              </div>
              <button
                onClick={() => setShowApplicationForm(true)}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-medium transition"
              >
                Complete Now
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-green-400">All Caught Up!</p>
                <p className="text-sm text-gray-400">No pending items at the moment</p>
              </div>
            </div>
          )}
        </div>

        {/* Registration Status */}
        {userRegistration?.applicationCompleted && (
          <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Registration Status</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 mb-2">Your application status:</p>
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                  userRegistration.status === 'accepted' ? 'bg-green-500/20 text-green-400' :
                  userRegistration.status === 'waitlisted' ? 'bg-yellow-500/20 text-yellow-400' :
                  userRegistration.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {userRegistration.status.charAt(0).toUpperCase() + userRegistration.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* My Registration Info */}
        {userRegistration?.applicationCompleted && (
          <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold">My Registration</h2>
              <button
                onClick={() => setSelectedRegistration(userRegistration)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition text-sm"
              >
                View Full Details →
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-lg font-medium">{userRegistration.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-lg font-medium">{userRegistration.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">School</p>
                  <p className="text-lg font-medium">{userRegistration.school}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Major</p>
                  <p className="text-lg font-medium">{userRegistration.major}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedRegistration && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedRegistration(null)}
        >
          <div 
            className="bg-gray-900 border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold">Full Registration Details</h2>
              <button
                onClick={() => setSelectedRegistration(null)}
                className="text-gray-400 hover:text-white transition"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-lg font-medium">{selectedRegistration.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-lg font-medium">{selectedRegistration.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">School</p>
                  <p className="text-lg font-medium">{selectedRegistration.school}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Year</p>
                  <p className="text-lg font-medium">{selectedRegistration.year}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Major</p>
                  <p className="text-lg font-medium">{selectedRegistration.major}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-lg font-medium">{selectedRegistration.phone || 'Not provided'}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Dietary Restrictions</p>
                <p className="text-lg font-medium">{selectedRegistration.dietaryRestrictions || 'None'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Team Status</p>
                  <p className="text-lg font-medium">
                    {selectedRegistration.hasTeam === 'yes' ? 'Has a team' : 'Looking for a team'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Hackathon Experience</p>
                  <p className="text-lg font-medium">{selectedRegistration.hackathonExperience}/5</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Coding Experience</p>
                  <p className="text-lg font-medium">{selectedRegistration.codingExperience}/5</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Heard From</p>
                  <p className="text-lg font-medium">{selectedRegistration.heardFrom}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${
                    selectedRegistration.status === 'accepted' ? 'bg-green-500/20 text-green-400' :
                    selectedRegistration.status === 'waitlisted' ? 'bg-yellow-500/20 text-yellow-400' :
                    selectedRegistration.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {selectedRegistration.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Registration Date</p>
                  <p className="text-lg font-medium">
                    {new Date(selectedRegistration.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;