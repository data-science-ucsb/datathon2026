import React from 'react';

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

interface RegistrationModalProps {
  registration: Registration;
  onClose: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ registration, onClose }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-500/20 text-green-400';
      case 'waitlisted':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'rejected':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-blue-500/20 text-blue-400';
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold">Full Registration Details</h2>
          <button
            onClick={onClose}
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
              <p className="text-lg font-medium">{registration.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-medium">{registration.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">School</p>
              <p className="text-lg font-medium">{registration.school}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Year</p>
              <p className="text-lg font-medium">{registration.year}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Major</p>
              <p className="text-lg font-medium">{registration.major}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-lg font-medium">{registration.phone || 'Not provided'}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Dietary Restrictions</p>
            <p className="text-lg font-medium">{registration.dietaryRestrictions || 'None'}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Team Status</p>
              <p className="text-lg font-medium">
                {registration.hasTeam === 'yes' ? 'Has a team' : 'Looking for a team'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Hackathon Experience</p>
              <p className="text-lg font-medium">{registration.hackathonExperience}/5</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Coding Experience</p>
              <p className="text-lg font-medium">{registration.codingExperience}/5</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Heard From</p>
              <p className="text-lg font-medium">{registration.heardFrom}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(registration.status)}`}>
                {registration.status}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Registration Date</p>
              <p className="text-lg font-medium">
                {new Date(registration.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;