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

interface RegistrationCardProps {
  registration: Registration;
  onViewDetails: () => void;
}

const RegistrationCard: React.FC<RegistrationCardProps> = ({ registration, onViewDetails }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-xl font-bold">My Registration</h2>
        <button
          onClick={onViewDetails}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition text-sm"
        >
          View Full Details →
        </button>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-lg font-medium">{registration.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-medium">{registration.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">School</p>
            <p className="text-lg font-medium">{registration.school}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Major</p>
            <p className="text-lg font-medium">{registration.major}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationCard;