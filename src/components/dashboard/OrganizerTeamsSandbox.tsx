import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners';
import type { Registration, Team } from './OrganizerDashboardTypes';

interface OrganizerTeamsSandboxProps {
  isExpanded: boolean;
  onToggle: () => void;
  teams: Team[];
  assignedMemberCount: number;
  loadingTeams: boolean;
  selectedTeamId: string | null;
  onTeamSelect: (teamId: string | null) => void;
  onDeleteTeam: (teamId: string) => void;
  onRemoveMember: (teamId: string, memberUid: string) => void;
  onAddMember: (teamId: string, registration: Registration) => void;
  onCreateTeam: () => void;
  isCreatingTeam: boolean;
  memberSearchTerm: string;
  onMemberSearchTermChange: (value: string) => void;
  showMemberSearch: boolean;
  onShowMemberSearchChange: (show: boolean) => void;
  availableMembers: Registration[];
  onExportCSV: () => void;
}

const OrganizerTeamsSandbox: React.FC<OrganizerTeamsSandboxProps> = ({
  isExpanded,
  onToggle,
  teams,
  assignedMemberCount,
  loadingTeams,
  selectedTeamId,
  onTeamSelect,
  onDeleteTeam,
  onRemoveMember,
  onAddMember,
  onCreateTeam,
  isCreatingTeam,
  memberSearchTerm,
  onMemberSearchTermChange,
  showMemberSearch,
  onShowMemberSearchChange,
  availableMembers,
  onExportCSV,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold">Teams</h3>
            <p className="text-sm text-gray-400">
              {teams.length} team{teams.length !== 1 ? 's' : ''} • {assignedMemberCount} participant{assignedMemberCount !== 1 ? 's' : ''} assigned
            </p>
          </div>
        </div>

        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/10 p-6">
              {/* Action Buttons */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={onCreateTeam}
                  disabled={isCreatingTeam}
                  className={`px-6 py-3 rounded-lg font-medium transition flex items-center gap-2 ${
                    isCreatingTeam
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  {isCreatingTeam ? (
                    <ClipLoader size={16} color="#fff" />
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Create New Team
                    </>
                  )}
                </button>

                {teams.length > 0 && (
                  <button
                    onClick={onExportCSV}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export Teams CSV
                  </button>
                )}
              </div>

              {loadingTeams ? (
                <div className="flex items-center justify-center py-12">
                  <ClipLoader size={32} color="#a855f7" />
                </div>
              ) : teams.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence>
                    {teams.map((team) => {
                      const isSelected = selectedTeamId === team.id;
                      return (
                        <motion.div
                          key={team.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className={`p-4 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-blue-500/10 border-blue-500/50'
                              : 'bg-gray-800/50 border-white/10 hover:border-white/20'
                          }`}
                          onClick={() => onTeamSelect(isSelected ? null : team.id)}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">
                                  {team.teamNumber}
                                </span>
                                <h4 className="font-bold text-lg">{team.teamCode}</h4>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {team.members.length} member{team.members.length !== 1 ? 's' : ''}
                              </p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteTeam(team.id);
                              }}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>

                          <div className="space-y-2">
                            {team.members.map((member) => (
                              <div
                                key={member.uid}
                                className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg"
                              >
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">{member.name}</p>
                                  <p className="text-xs text-gray-500 truncate">{member.email}</p>
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onRemoveMember(team.id, member.uid);
                                  }}
                                  className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-all ml-2"
                                >
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            ))}

                            {team.members.length === 0 && (
                              <p className="text-sm text-gray-500 text-center py-2">No members yet</p>
                            )}
                          </div>

                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-4 pt-4 border-t border-white/10"
                            >
                              <div className="relative">
                                <input
                                  type="text"
                                  placeholder="Search checked-in participants..."
                                  value={memberSearchTerm}
                                  onChange={(e) => {
                                    onMemberSearchTermChange(e.target.value);
                                    onShowMemberSearchChange(true);
                                  }}
                                  onFocus={() => onShowMemberSearchChange(true)}
                                  onClick={(e) => e.stopPropagation()}
                                  className="w-full px-3 py-2 bg-gray-900/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition"
                                />

                                {showMemberSearch && memberSearchTerm.trim() !== '' && (
                                  <div
                                    className="absolute z-10 top-full left-0 right-0 mt-1 bg-gray-900 border border-white/10 rounded-lg shadow-xl max-h-48 overflow-y-auto"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {availableMembers.length > 0 ? (
                                      availableMembers.slice(0, 5).map((registration) => (
                                        <button
                                          key={registration.uid}
                                          onClick={() => onAddMember(team.id, registration)}
                                          className="w-full p-3 text-left hover:bg-white/5 transition flex items-center justify-between"
                                        >
                                          <div>
                                            <p className="text-sm font-medium">{registration.name || 'Unknown'}</p>
                                            <p className="text-xs text-gray-500">{registration.email}</p>
                                          </div>
                                          <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                          </svg>
                                        </button>
                                      ))
                                    ) : (
                                      <p className="p-3 text-sm text-gray-500 text-center">No available participants found</p>
                                    )}
                                  </div>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 mt-2">Only checked-in participants can be added to teams</p>
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p>No teams created yet</p>
                  <p className="text-sm mt-1">Click "Create New Team" to get started</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default OrganizerTeamsSandbox;