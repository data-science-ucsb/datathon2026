import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Registration } from './OrganizerDashboardTypes';

interface OrganizerRegistrationsSectionProps {
  isExpanded: boolean;
  onToggle: () => void;
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  filterStatus: string;
  onFilterStatusChange: (value: string) => void;
  filteredRegistrations: Registration[];
  paginatedRegistrations: Registration[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onExportCSV: () => void;
  onViewDetails: (registration: Registration) => void;
  renderCheckInBox: (registration: Registration) => React.ReactNode;
}

const getStatusBadgeClass = (status: string) => {
  if (status === 'accepted') return 'bg-green-500/20 text-green-400';
  if (status === 'waitlisted') return 'bg-yellow-500/20 text-yellow-400';
  if (status === 'rejected') return 'bg-red-500/20 text-red-400';
  if (status === 'incomplete') return 'bg-gray-500/20 text-gray-400';
  return 'bg-blue-500/20 text-blue-400';
};

const getRoleBadgeClass = (role: string) => {
  return role === 'organizer' ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-500/20 text-gray-400';
};

const OrganizerRegistrationsSection: React.FC<OrganizerRegistrationsSectionProps> = ({
  isExpanded,
  onToggle,
  searchTerm,
  onSearchTermChange,
  filterStatus,
  onFilterStatusChange,
  filteredRegistrations,
  paginatedRegistrations,
  currentPage,
  totalPages,
  onPageChange,
  onExportCSV,
  onViewDetails,
  renderCheckInBox,
}) => {
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const provisionalEndPage = startPage + maxVisiblePages - 1;
  let endPage = Math.min(totalPages, provisionalEndPage);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pageNumbers: number[] = [];
  for (let page = startPage; page <= endPage; page += 1) {
    pageNumbers.push(page);
  }

  const startItem = ((currentPage - 1) * 10) + 1;
  const endItem = Math.min(currentPage * 10, filteredRegistrations.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden mb-6"
    >
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold">All Registrations</h3>
            <p className="text-sm text-gray-400">{filteredRegistrations.length} registrations found</p>
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
            <div className="border-t border-white/10">
              <div className="p-6 border-b border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      placeholder="Search by name, email, or school..."
                      value={searchTerm}
                      onChange={(e) => onSearchTermChange(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-950/50 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => onFilterStatusChange(e.target.value)}
                    className="px-4 py-3 bg-gray-950/50 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition"
                  >
                    <option value="all">All Status</option>
                    <option value="incomplete">Incomplete</option>
                    <option value="submitted">Submitted</option>
                    <option value="accepted">Accepted</option>
                    <option value="waitlisted">Waitlisted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div className="mt-4">
                  <button
                    onClick={onExportCSV}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition"
                  >
                    Export to CSV ({filteredRegistrations.length})
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-950/50 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Check In</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">School</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Year</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {paginatedRegistrations.map((registration) => (
                      <tr
                        key={registration.uid}
                        className="hover:bg-white/5 transition"
                      >
                        <td className="px-6 py-4 text-sm">{registration.name || '—'}</td>
                        <td className="px-6 py-4 text-sm text-gray-400">{registration.email}</td>
                        <td className="px-6 py-4 text-sm">{renderCheckInBox(registration)}</td>
                        <td className="px-6 py-4 text-sm">{registration.school || '—'}</td>
                        <td className="px-6 py-4 text-sm">{registration.year || '—'}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(registration.status)}`}>
                            {registration.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeClass(registration.role)}`}>
                            {registration.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={() => onViewDetails(registration)}
                            className="text-blue-400 hover:text-blue-300 transition"
                          >
                            View Details →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredRegistrations.length === 0 && (
                <div className="text-center py-12 text-gray-500">No registrations found</div>
              )}

              {filteredRegistrations.length > 0 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
                  <div className="text-sm text-gray-400">
                    Showing {startItem} to {endItem} of {filteredRegistrations.length} entries
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        currentPage === 1
                          ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    {startPage > 1 && (
                      <>
                        <button
                          onClick={() => onPageChange(1)}
                          className="px-3 py-2 rounded-lg text-sm font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-all"
                        >
                          1
                        </button>
                        {startPage > 2 && <span className="text-gray-500">...</span>}
                      </>
                    )}

                    {pageNumbers.map((page) => (
                      <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    {endPage < totalPages && (
                      <>
                        {endPage < totalPages - 1 && <span className="text-gray-500">...</span>}
                        <button
                          onClick={() => onPageChange(totalPages)}
                          className="px-3 py-2 rounded-lg text-sm font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-all"
                        >
                          {totalPages}
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        currentPage === totalPages
                          ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default OrganizerRegistrationsSection;
