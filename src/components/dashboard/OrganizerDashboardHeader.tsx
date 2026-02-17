import React from 'react';

interface OrganizerDashboardHeaderProps {
  onLogout: () => void;
}

const OrganizerDashboardHeader: React.FC<OrganizerDashboardHeaderProps> = ({ onLogout }) => {
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Organizer Dashboard</h1>
        <p className="text-gray-400">Overview of all registrations and statistics</p>
      </div>
      <button
        onClick={onLogout}
        className="px-4 py-2 rounded-lg bg-red-600/10 hover:bg-red-600/20 backdrop-blur-xl border border-red-500/20 hover:border-red-400/40 text-red-300/80 hover:text-red-200 text-sm font-medium transition-all duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default OrganizerDashboardHeader;
