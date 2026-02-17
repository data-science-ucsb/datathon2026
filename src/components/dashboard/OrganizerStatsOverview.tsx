import React from 'react';
import type { OrganizerStats } from './OrganizerDashboardTypes';

interface OrganizerStatsOverviewProps {
  stats: OrganizerStats;
}

const OrganizerStatsOverview: React.FC<OrganizerStatsOverviewProps> = ({ stats }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Total Accounts</p>
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-blue-400">{stats.totalAccounts}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Completed Apps</p>
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-green-400">{stats.completedApplications}</p>
          <p className="text-xs text-gray-500 mt-1">{stats.completionRate}% completion rate</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Incomplete Apps</p>
            <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-yellow-400">{stats.incompleteApplications}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Checked In</p>
            <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-purple-400">{stats.checkedIn}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4">Role Distribution</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Students</span>
              <span className="font-bold text-blue-400">{stats.students}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Organizers</span>
              <span className="font-bold text-purple-400">{stats.organizers}</span>
            </div>
            <div className="pt-2 border-t border-white/10">
              <p className="text-sm text-gray-500">Ratio: {stats.students}:{stats.organizers}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4">Team Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Has Team</span>
              <span className="font-bold text-green-400">{stats.hasTeam}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Looking for Team</span>
              <span className="font-bold text-yellow-400">{stats.lookingForTeam}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4">Avg Experience</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Hackathon</span>
              <span className="font-bold text-blue-400">{stats.avgHackathonExp}/5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Coding</span>
              <span className="font-bold text-green-400">{stats.avgCodingExp}/5</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-bold mb-4">Application Status Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">{stats.submitted}</p>
            <p className="text-sm text-gray-500">Submitted</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">{stats.accepted}</p>
            <p className="text-sm text-gray-500">Accepted</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-400">{stats.waitlisted}</p>
            <p className="text-sm text-gray-500">Waitlisted</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-400">{stats.rejected}</p>
            <p className="text-sm text-gray-500">Rejected</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizerStatsOverview;
