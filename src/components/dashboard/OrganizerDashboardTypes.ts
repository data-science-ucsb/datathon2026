export interface Registration {
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
  isCheckedIn?: boolean;
}

export interface TeamMember {
  uid: string;
  name: string;
  email: string;
}

export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  createdAt: string;
}

export interface OrganizerStats {
  totalAccounts: number;
  completedApplications: number;
  incompleteApplications: number;
  checkedIn: number;
  accepted: number;
  submitted: number;
  waitlisted: number;
  rejected: number;
  organizers: number;
  students: number;
  hasTeam: number;
  lookingForTeam: number;
  avgHackathonExp: string;
  avgCodingExp: string;
  completionRate: string;
}
