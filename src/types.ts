export interface Course {
  id: string;
  code: string;
  name: string;
  department: string;
  instructor: string;
  instructorTitle: string;
  term: string;
  credits: number;
  enrolledStudents: number;
  color: string;
}

export interface EvaluationCriteria {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  iconName: string;
}

export type FeedbackCategory = 'services' | 'facilities' | 'activities' | 'academics';

export type FeedbackNature = 'concern' | 'recommendation' | 'commendation' | 'evaluation';

export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export type TicketStatus = 'pending' | 'investigating' | 'in_progress' | 'resolved' | 'closed' | 'new' | 'reviewed' | 'addressed';

export interface TicketTimelineEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  actor: string;
  type: 'submission' | 'assignment' | 'status_change' | 'resolution';
  status?: TicketStatus;
  note?: string;
}

export interface AdminResponse {
  resolvedAt: string;
  resolvedBy: string;
  actionTaken: string;
  officialNotes?: string;
}

export interface FeedbackSubmission {
  id: string;
  ticketNumber?: string; // e.g., 'SFS-2024-8192'
  category?: FeedbackCategory;
  feedbackNature?: FeedbackNature;
  title?: string;
  department?: string; // Responsible department / office
  targetEntity?: string; // e.g. "Registrar Window 2", "Campus Wi-Fi", "Main Library", "CS 101"
  location?: string; // e.g. "Science Building 3rd Floor"
  priority?: TicketPriority;
  assignedTo?: string; // Staff or unit assigned
  
  courseId: string;
  timestamp: string;
  isAnonymous: boolean;
  studentName?: string;
  studentEmail?: string;
  studentId?: string;
  term: string;
  ratings: Record<string, number>; // criteriaId -> 1-5
  overallRating: number; // 1-5
  recommendation: 'yes' | 'maybe' | 'no';
  strengths: string;
  areasForImprovement: string;
  additionalComments?: string;
  selectedTags: string[];
  attendanceRate: 'always' | 'regular' | 'occasional';
  difficulty: 'easy' | 'moderate' | 'challenging' | 'very_difficult';
  
  status: TicketStatus;
  facultyNotes?: string;
  adminResponse?: AdminResponse;
  timeline?: TicketTimelineEvent[];
  helpfulCount: number;
}

export interface CampusDepartment {
  id: string;
  name: string;
  category: FeedbackCategory;
  head: string;
  email: string;
  description: string;
  icon: string;
  color: string;
}

export type NavigationTab = 
  | 'submit' 
  | 'track' 
  | 'admin_resolver' 
  | 'feedback_list' 
  | 'analytics' 
  | 'courses'
  | 'school_info';

export type UserRole = 'student' | 'teacher' | 'admin' | 'faculty';

