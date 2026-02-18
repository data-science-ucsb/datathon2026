import React from 'react';

interface RegistrationStatusProps {
  status: string;
}

const RegistrationStatus: React.FC<RegistrationStatusProps> = ({ status }) => {
  const getStatusStyles = () => {
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
    <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Registration Status</h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 mb-2">Your application status:</p>
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getStatusStyles()}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationStatus;