import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import OrganizerDashboardHeader from '../components/dashboard/OrganizerDashboardHeader';
import OrganizerStatsOverview from '../components/dashboard/OrganizerStatsOverview';
import OrganizerRegistrationsSection from '../components/dashboard/OrganizerRegistrationsSection';
import OrganizerTeamsSandbox from '../components/dashboard/OrganizerTeamsSandbox';
import OrganizerRegistrationModal from '../components/dashboard/OrganizerRegistrationModal';
import type { Registration, Team, TeamMember } from '../components/dashboard/OrganizerDashboardTypes';

interface OrganizerDashboardProps {
  registrations: Registration[];
}

const ITEMS_PER_PAGE = 10;

const OrganizerDashboard: React.FC<OrganizerDashboardProps> = ({ registrations }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [isTableExpanded, setIsTableExpanded] = useState(false);
  const [isTeamsSandboxExpanded, setIsTeamsSandboxExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [localCheckInStatus, setLocalCheckInStatus] = useState<Record<string, boolean>>({});
  const [loadingCheckIn, setLoadingCheckIn] = useState<Record<string, boolean>>({});

  const [teams, setTeams] = useState<Team[]>([]);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [memberSearchTerm, setMemberSearchTerm] = useState('');
  const [showMemberSearch, setShowMemberSearch] = useState(false);
  const [loadingTeams, setLoadingTeams] = useState(true);

  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'teams'), (snapshot) => {
      const teamsData: Team[] = [];
      snapshot.forEach((teamDoc) => {
        teamsData.push({
          id: teamDoc.id,
          ...teamDoc.data()
        } as Team);
      });

      teamsData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setTeams(teamsData);
      setLoadingTeams(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  const handleCheckInToggle = async (
    uid: string,
    currentStatus: boolean,
    event: React.MouseEvent | React.ChangeEvent
  ) => {
    event.stopPropagation();

    const newStatus = !currentStatus;

    try {
      setLoadingCheckIn((previous) => ({ ...previous, [uid]: true }));

      await updateDoc(doc(db, 'registrations', uid), {
        isCheckedIn: newStatus
      });

      await new Promise((resolve) => setTimeout(resolve, 500));

      setLocalCheckInStatus((previous) => ({
        ...previous,
        [uid]: newStatus
      }));

      if (newStatus) {
        toast.success('Checked in!', { duration: 1500 });
      }
    } catch (error) {
      console.error('Error toggling check-in:', error);
      toast.error('Failed to update check-in status');
    } finally {
      setLoadingCheckIn((previous) => ({ ...previous, [uid]: false }));
    }
  };

  const handleCreateTeam = async () => {
    if (!newTeamName.trim()) {
      toast.error('Please enter a team name');
      return;
    }

    try {
      setIsCreatingTeam(true);
      await addDoc(collection(db, 'teams'), {
        name: newTeamName.trim(),
        members: [],
        createdAt: new Date().toISOString()
      });
      setNewTeamName('');
      toast.success('Team created!');
    } catch (error) {
      console.error('Error creating team:', error);
      toast.error('Failed to create team');
    } finally {
      setIsCreatingTeam(false);
    }
  };

  const handleDeleteTeam = async (teamId: string) => {
    if (!confirm('Are you sure you want to delete this team?')) return;

    try {
      await deleteDoc(doc(db, 'teams', teamId));
      if (selectedTeamId === teamId) setSelectedTeamId(null);
      toast.success('Team deleted!');
    } catch (error) {
      console.error('Error deleting team:', error);
      toast.error('Failed to delete team');
    }
  };

  const handleAddMember = async (teamId: string, member: Registration) => {
    const team = teams.find((candidate) => candidate.id === teamId);
    if (!team) return;

    if (team.members.some((teamMember) => teamMember.uid === member.uid)) {
      toast.error('Member already in this team');
      return;
    }

    const existingTeam = teams.find((candidate) =>
      candidate.members.some((teamMember) => teamMember.uid === member.uid)
    );
    if (existingTeam) {
      toast.error(`${member.name || member.email} is already in team "${existingTeam.name}"`);
      return;
    }

    try {
      const newMember: TeamMember = {
        uid: member.uid,
        name: member.name || 'Unknown',
        email: member.email
      };

      await updateDoc(doc(db, 'teams', teamId), {
        members: [...team.members, newMember]
      });

      setMemberSearchTerm('');
      setShowMemberSearch(false);
      toast.success(`Added ${member.name || member.email} to team!`);
    } catch (error) {
      console.error('Error adding member:', error);
      toast.error('Failed to add member');
    }
  };

  const handleRemoveMember = async (teamId: string, memberUid: string) => {
    const team = teams.find((candidate) => candidate.id === teamId);
    if (!team) return;

    try {
      const updatedMembers = team.members.filter((member) => member.uid !== memberUid);
      await updateDoc(doc(db, 'teams', teamId), {
        members: updatedMembers
      });
      toast.success('Member removed!');
    } catch (error) {
      console.error('Error removing member:', error);
      toast.error('Failed to remove member');
    }
  };

  const assignedMemberUids = useMemo(() => {
    const uids = new Set<string>();
    teams.forEach((team) => {
      team.members.forEach((member) => {
        uids.add(member.uid);
      });
    });
    return uids;
  }, [teams]);

  const availableMembers = useMemo(() => {
    return registrations.filter((registration) => {
      const isCheckedIn = localCheckInStatus[registration.uid] ?? registration.isCheckedIn ?? false;
      const normalizedSearch = memberSearchTerm.toLowerCase();
      const matchesSearch =
        memberSearchTerm.trim() === ''
        || (registration.name || '').toLowerCase().includes(normalizedSearch)
        || registration.email.toLowerCase().includes(normalizedSearch);

      return isCheckedIn && matchesSearch && !assignedMemberUids.has(registration.uid);
    });
  }, [registrations, memberSearchTerm, localCheckInStatus, assignedMemberUids]);

  const stats = useMemo(() => {
    const totalAccounts = registrations.length;
    const completedApplications = registrations.filter((registration) => registration.applicationCompleted).length;
    const incompleteApplications = totalAccounts - completedApplications;

    const checkedIn = registrations.filter((registration) => {
      const localStatus = localCheckInStatus[registration.uid];
      return localStatus !== undefined ? localStatus : registration.isCheckedIn;
    }).length;

    const submitted = registrations.filter((registration) => registration.status === 'submitted').length;
    const waitlisted = registrations.filter((registration) => registration.status === 'waitlisted').length;
    const rejected = registrations.filter((registration) => registration.status === 'rejected').length;
    const organizers = registrations.filter((registration) => registration.role === 'organizer').length;
    const students = registrations.filter((registration) => registration.role === 'student').length;
    const hasTeam = registrations.filter((registration) => registration.hasTeam === 'yes').length;
    const lookingForTeam = registrations.filter((registration) => registration.hasTeam === 'no').length;

    const completedRegistrations = registrations.filter((registration) => registration.applicationCompleted);
    const avgHackathonExp = completedRegistrations.length > 0
      ? (
          completedRegistrations.reduce(
            (sum, registration) => sum + (registration.hackathonExperience || 0),
            0
          ) / completedRegistrations.length
        ).toFixed(1)
      : '0';
    const avgCodingExp = completedRegistrations.length > 0
      ? (
          completedRegistrations.reduce(
            (sum, registration) => sum + (registration.codingExperience || 0),
            0
          ) / completedRegistrations.length
        ).toFixed(1)
      : '0';

    return {
      totalAccounts,
      completedApplications,
      incompleteApplications,
      checkedIn,
      accepted: registrations.filter((registration) => registration.status === 'accepted').length,
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
  }, [registrations, localCheckInStatus]);

  const filteredRegistrations = useMemo(() => {
    return registrations.filter((registration) => {
      const normalizedSearch = searchTerm.toLowerCase();
      const matchesSearch =
        (registration.name || '').toLowerCase().includes(normalizedSearch)
        || registration.email.toLowerCase().includes(normalizedSearch)
        || (registration.school || '').toLowerCase().includes(normalizedSearch);
      const matchesStatus = filterStatus === 'all' || registration.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [registrations, searchTerm, filterStatus]);

  const totalPages = Math.ceil(filteredRegistrations.length / ITEMS_PER_PAGE);
  const paginatedRegistrations = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRegistrations.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredRegistrations, currentPage]);

  const exportToCSV = () => {
    const headers = [
      'Name',
      'Email',
      'School',
      'Year',
      'Major',
      'Phone',
      'Dietary Restrictions',
      'Has Team',
      'Hackathon Experience',
      'Coding Experience',
      'Heard From',
      'Status',
      'Role',
      'Created At'
    ];

    const rows = filteredRegistrations.map((registration) => [
      registration.name || '',
      registration.email || '',
      registration.school || '',
      registration.year || '',
      registration.major || '',
      registration.phone || '',
      registration.dietaryRestrictions || '',
      registration.hasTeam || '',
      registration.hackathonExperience || '',
      registration.codingExperience || '',
      registration.heardFrom || '',
      registration.status,
      registration.role,
      new Date(registration.createdAt).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `registrations-${new Date().toISOString().split('T')[0]}.csv`;
    anchor.click();
  };

  const exportTeamsToCSV = () => {
    const headers = [
      'Team Name',
      'Member Count',
      'Member Names',
      'Member Emails',
      'Created At'
    ];

    const rows = teams.map((team) => [
      team.name,
      team.members.length,
      team.members.map((m) => m.name).join('; '),
      team.members.map((m) => m.email).join('; '),
      new Date(team.createdAt).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `teams-${new Date().toISOString().split('T')[0]}.csv`;
    anchor.click();
  };

  const renderCheckInBox = (registration: Registration) => {
    const isLoading = loadingCheckIn[registration.uid];
    const isChecked = localCheckInStatus[registration.uid] ?? registration.isCheckedIn ?? false;

    return (
      <div
        onClick={(event) => {
          if (!isLoading) {
            handleCheckInToggle(registration.uid, isChecked, event);
          }
        }}
        className={`w-6 h-6 rounded border-2 flex items-center justify-center cursor-pointer transition-all duration-200 ${
          isLoading
            ? 'border-blue-400 bg-blue-500/20'
            : isChecked
              ? 'border-green-500 bg-green-500'
              : 'border-gray-500 bg-gray-800 hover:border-gray-400'
        }`}
      >
        {isLoading ? (
          <ClipLoader size={14} color="#60a5fa" />
        ) : isChecked ? (
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        ) : null}
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-24 px-6 pb-12">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto">
        <OrganizerDashboardHeader onLogout={handleLogout} />

        <OrganizerStatsOverview stats={stats} />

        <OrganizerRegistrationsSection
          isExpanded={isTableExpanded}
          onToggle={() => setIsTableExpanded(!isTableExpanded)}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          filterStatus={filterStatus}
          onFilterStatusChange={setFilterStatus}
          filteredRegistrations={filteredRegistrations}
          paginatedRegistrations={paginatedRegistrations}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onExportCSV={exportToCSV}
          onViewDetails={setSelectedRegistration}
          renderCheckInBox={renderCheckInBox}
        />

        <OrganizerTeamsSandbox
          isExpanded={isTeamsSandboxExpanded}
          onToggle={() => setIsTeamsSandboxExpanded(!isTeamsSandboxExpanded)}
          teams={teams}
          assignedMemberCount={assignedMemberUids.size}
          loadingTeams={loadingTeams}
          selectedTeamId={selectedTeamId}
          onTeamSelect={setSelectedTeamId}
          onDeleteTeam={handleDeleteTeam}
          onRemoveMember={handleRemoveMember}
          onAddMember={handleAddMember}
          newTeamName={newTeamName}
          onNewTeamNameChange={setNewTeamName}
          onCreateTeam={handleCreateTeam}
          isCreatingTeam={isCreatingTeam}
          memberSearchTerm={memberSearchTerm}
          onMemberSearchTermChange={setMemberSearchTerm}
          showMemberSearch={showMemberSearch}
          onShowMemberSearchChange={setShowMemberSearch}
          availableMembers={availableMembers}
          onExportCSV={exportTeamsToCSV}
        />
      </div>

      <OrganizerRegistrationModal
        registration={selectedRegistration}
        onClose={() => setSelectedRegistration(null)}
      />
    </div>
  );
};

export default OrganizerDashboard;
