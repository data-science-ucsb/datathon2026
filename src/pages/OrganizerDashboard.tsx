import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

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

interface OrganizerDashboardProps {
  registrations: Registration[];
}

const OrganizerDashboard: React.FC<OrganizerDashboardProps> = ({ registrations }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
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

  // Calculate statistics
  const stats = useMemo(() => {
    const totalAccounts = registrations.length;
    const completedApplications = registrations.filter(r => r.applicationCompleted).length;
    const incompleteApplications = totalAccounts - completedApplications;
    const accepted = registrations.filter(r => r.status === 'accepted').length;
    const submitted = registrations.filter(r => r.status === 'submitted').length;
    const waitlisted = registrations.filter(r => r.status === 'waitlisted').length;
    const rejected = registrations.filter(r => r.status === 'rejected').length;
    const organizers = registrations.filter(r => r.role === 'organizer').length;
    const students = registrations.filter(r => r.role === 'student').length;
    const hasTeam = registrations.filter(r => r.hasTeam === 'yes').length;
    const lookingForTeam = registrations.filter(r => r.hasTeam === 'no').length;

    // Average experience
    const completedRegs = registrations.filter(r => r.applicationCompleted);
    const avgHackathonExp = completedRegs.length > 0
      ? (completedRegs.reduce((sum, r) => sum + (r.hackathonExperience || 0), 0) / completedRegs.length).toFixed(1)
      : '0';
    const avgCodingExp = completedRegs.length > 0
      ? (completedRegs.reduce((sum, r) => sum + (r.codingExperience || 0), 0) / completedRegs.length).toFixed(1)
      : '0';

    return {
      totalAccounts,
      completedApplications,
      incompleteApplications,
      accepted,
      submitted,
      waitlisted,
      rejected,
      organizers,
      students,
      hasTeam,
      lookingForTeam,
      avgHackathonExp,
      avgCodingExp,
      completionRate: totalAccounts > 0 ? ((completedApplications / totalAccounts) * 100).toFixed(0) : '0'
    };
  }, [registrations]);

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'School', 'Year', 'Major', 'Phone', 'Dietary Restrictions', 'Has Team', 'Hackathon Experience', 'Coding Experience', 'Heard From', 'Status', 'Role', 'Created At'];
    const rows = filteredRegistrations.map(reg => [
      reg.name || '',
      reg.email || '',
      reg.school || '',
      reg.year || '',
      reg.major || '',
      reg.phone || '',
      reg.dietaryRestrictions || '',
      reg.hasTeam || '',
      reg.hackathonExperience || '',
      reg.codingExperience || '',
      reg.heardFrom || '',
      reg.status,
      reg.role,
      new Date(reg.createdAt).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registrations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = (reg.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (reg.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (reg.school || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || reg.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header with Logout */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Organizer Dashboard</h1>
            <p className="text-gray-400">Overview of all registrations and statistics</p>
          </div>
          
          {/* Logout Button - Top Right */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-600/10 hover:bg-red-600/20 backdrop-blur-xl border border-red-500/20 hover:border-red-400/40 text-red-300/80 hover:text-red-200 text-sm font-medium transition-all duration-300"
          >
            Logout
          </button>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Accounts */}
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

          {/* Completed Applications */}
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

          {/* Incomplete Applications */}
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

          {/* Accepted */}
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Accepted</p>
              <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-purple-400">{stats.accepted}</p>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Role Distribution */}
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
                <p className="text-sm text-gray-500">
                  Ratio: {stats.students}:{stats.organizers}
                </p>
              </div>
            </div>
          </div>

          {/* Team Status */}
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

          {/* Experience Levels */}
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

        {/* Application Status Breakdown */}
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

        {/* Search and Filter */}
        <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Search by name, email, or school..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-gray-950/50 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
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
              onClick={exportToCSV}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition"
            >
              Export to CSV ({filteredRegistrations.length})
            </button>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-950/50 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">School</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Year</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredRegistrations.map((reg) => (
                  <tr 
                    key={reg.uid} 
                    className="hover:bg-white/5 transition"
                  >
                    <td className="px-6 py-4 text-sm">{reg.name || '—'}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{reg.email}</td>
                    <td className="px-6 py-4 text-sm">{reg.school || '—'}</td>
                    <td className="px-6 py-4 text-sm">{reg.year || '—'}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        reg.status === 'accepted' ? 'bg-green-500/20 text-green-400' :
                        reg.status === 'waitlisted' ? 'bg-yellow-500/20 text-yellow-400' :
                        reg.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                        reg.status === 'incomplete' ? 'bg-gray-500/20 text-gray-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {reg.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        reg.role === 'organizer' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {reg.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => setSelectedRegistration(reg)}
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
            <div className="text-center py-12 text-gray-500">
              No registrations found
            </div>
          )}
        </div>
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
              <h2 className="text-2xl font-bold">Registration Details</h2>
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
                  <p className="text-lg font-medium">{selectedRegistration.name || '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-lg font-medium">{selectedRegistration.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">School</p>
                  <p className="text-lg font-medium">{selectedRegistration.school || '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Year</p>
                  <p className="text-lg font-medium">{selectedRegistration.year || '—'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Major</p>
                  <p className="text-lg font-medium">{selectedRegistration.major || '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-lg font-medium">{selectedRegistration.phone || 'Not provided'}</p>
                </div>
              </div>

              {selectedRegistration.applicationCompleted && (
                <>
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
                </>
              )}

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
                  <p className="text-sm text-gray-500">Role</p>
                  <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${
                    selectedRegistration.role === 'organizer' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {selectedRegistration.role}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Registration Date</p>
                <p className="text-lg font-medium">
                  {new Date(selectedRegistration.createdAt).toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">User ID</p>
                <p className="text-sm font-mono text-gray-400">{selectedRegistration.uid}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizerDashboard;