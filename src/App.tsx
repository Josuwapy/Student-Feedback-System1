import React, { useState, useEffect, useMemo } from 'react';
import { Course, FeedbackSubmission, NavigationTab, UserRole, TicketStatus } from './types';
import { loadCourses, saveCourses, loadFeedbacks, saveFeedbacks, resetToDemoData } from './utils/storage';
import { Navbar } from './components/Navbar';
import { StudentFeedbackForm } from './components/StudentFeedbackForm';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { FeedbackListView } from './components/FeedbackListView';
import { CoursesDirectory } from './components/CoursesDirectory';
import { AdminResolverView } from './components/AdminResolverView';
import { TrackIssueView } from './components/TrackIssueView';
import { SchoolInfoView } from './components/SchoolInfoView';
import { CheckCircle2, Info } from 'lucide-react';

export default function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [feedbacks, setFeedbacks] = useState<FeedbackSubmission[]>([]);
  const [activeTab, setActiveTab] = useState<NavigationTab>('submit');
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [selectedCourseForForm, setSelectedCourseForForm] = useState<string>('');
  const [feedbackListCourseFilter, setFeedbackListCourseFilter] = useState<string>('all');
  const [activeTrackingTicket, setActiveTrackingTicket] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize data
  useEffect(() => {
    const loadedCourses = loadCourses();
    const loadedFeedbacks = loadFeedbacks();
    setCourses(loadedCourses);
    setFeedbacks(loadedFeedbacks);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Compute pending tickets for administrator badge
  const pendingAdminCount = useMemo(() => {
    return feedbacks.filter(
      (f) => f.status === 'pending' || f.status === 'investigating' || f.status === 'in_progress' || f.status === 'new'
    ).length;
  }, [feedbacks]);

  // Add new feedback submission
  const handleSubmitFeedback = (
    newFeedbackData: Omit<FeedbackSubmission, 'id' | 'timestamp' | 'helpfulCount' | 'status'>
  ) => {
    const now = new Date().toISOString();
    const newSubmission: FeedbackSubmission = {
      ...newFeedbackData,
      id: `fb-${Date.now()}`,
      timestamp: now,
      helpfulCount: 0,
      status: 'pending',
      timeline: [
        {
          id: `tl-${Date.now()}`,
          timestamp: now,
          title: 'Feedback Registered',
          description: 'Feedback received and registered in institutional queue.',
          type: 'submission',
          status: 'pending',
          note: 'Feedback received and registered in institutional queue.',
          actor: 'Student Portal System'
        }
      ]
    };

    const updated = [newSubmission, ...feedbacks];
    setFeedbacks(updated);
    saveFeedbacks(updated);
    showToast(`Ticket ${newSubmission.ticketNumber || newSubmission.id} generated successfully!`);
  };

  // Update status or resolution notes (from Teacher or Admin)
  const handleUpdateFeedbackStatus = (
    feedbackId: string,
    status: TicketStatus,
    notes?: string,
    adminAction?: {
      actionTaken: string;
      resolvedBy: string;
      officialNotes?: string;
    }
  ) => {
    const now = new Date().toISOString();
    const updated = feedbacks.map((fb) => {
      if (fb.id === feedbackId) {
        const timeline = [...(fb.timeline || [])];
        timeline.push({
          id: `tl-${Date.now()}`,
          timestamp: now,
          title: `Status: ${status}`,
          description: notes || (adminAction ? adminAction.actionTaken : `Status updated to ${status}`),
          type: status === 'resolved' || status === 'addressed' ? 'resolution' : 'status_change',
          status,
          note: notes || (adminAction ? adminAction.actionTaken : `Status updated to ${status}`),
          actor: adminAction?.resolvedBy || 'Administrator / Faculty'
        });

        return {
          ...fb,
          status,
          facultyNotes: notes !== undefined ? notes : fb.facultyNotes,
          adminResponse: adminAction
            ? {
                actionTaken: adminAction.actionTaken,
                resolvedBy: adminAction.resolvedBy,
                resolvedAt: now,
                officialNotes: adminAction.officialNotes
              }
            : fb.adminResponse,
          timeline
        };
      }
      return fb;
    });

    setFeedbacks(updated);
    saveFeedbacks(updated);
    showToast(`Status updated to "${status.replace('_', ' ').toUpperCase()}"`);
  };

  // Upvote helpful feedback
  const handleVoteHelpful = (feedbackId: string) => {
    const updated = feedbacks.map((fb) => {
      if (fb.id === feedbackId) {
        return {
          ...fb,
          helpfulCount: (fb.helpfulCount || 0) + 1
        };
      }
      return fb;
    });

    setFeedbacks(updated);
    saveFeedbacks(updated);
  };

  // Reset to demo data
  const handleResetData = () => {
    const { courses: demoCourses, feedbacks: demoFeedbacks } = resetToDemoData();
    setCourses(demoCourses);
    setFeedbacks(demoFeedbacks);
    showToast('Demo evaluation and complaint tickets restored.');
  };

  // Add new course
  const handleAddNewCourse = (courseData: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      ...courseData,
      id: `c-${Date.now()}`
    };
    const updated = [...courses, newCourse];
    setCourses(updated);
    saveCourses(updated);
    showToast(`Course ${newCourse.code} registered successfully!`);
  };

  // Quick navigation handlers
  const handleCourseToFeedback = (courseId: string) => {
    setSelectedCourseForForm(courseId);
    setActiveTab('submit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCourseToAnalytics = (courseId: string) => {
    setActiveTab('analytics');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToReviewsFiltered = (courseId?: string) => {
    setFeedbackListCourseFilter(courseId || 'all');
    setActiveTab('feedback_list');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToTrack = (ticketId: string) => {
    setActiveTrackingTicket(ticketId);
    setActiveTab('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        userRole={userRole}
        onToggleRole={setUserRole}
        onResetData={handleResetData}
        feedbackCount={feedbacks.length}
        pendingAdminCount={pendingAdminCount}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 max-w-sm bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 text-xs animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="flex-1 font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 pb-24 lg:pb-12">
        {activeTab === 'submit' && (
          <StudentFeedbackForm
            courses={courses}
            selectedCourseId={selectedCourseForForm}
            onSubmitFeedback={handleSubmitFeedback}
            onNavigateToAnalytics={() => setActiveTab('analytics')}
            onNavigateToReviews={() => setActiveTab('feedback_list')}
            onNavigateToTrack={handleNavigateToTrack}
          />
        )}

        {activeTab === 'track' && (
          <TrackIssueView
            feedbacks={feedbacks}
            initialTicketId={activeTrackingTicket}
            onVoteHelpful={handleVoteHelpful}
            onNavigateToSubmit={() => setActiveTab('submit')}
          />
        )}

        {activeTab === 'admin_resolver' && (
          <AdminResolverView
            feedbacks={feedbacks}
            onUpdateFeedbackStatus={handleUpdateFeedbackStatus}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsDashboard
            courses={courses}
            feedbacks={feedbacks}
            onSelectCourseForFeedback={handleCourseToFeedback}
            onNavigateToFeedbackList={handleNavigateToReviewsFiltered}
          />
        )}

        {activeTab === 'feedback_list' && (
          <FeedbackListView
            courses={courses}
            feedbacks={feedbacks}
            initialCourseFilter={feedbackListCourseFilter}
            onUpdateFeedbackStatus={(id, status, notes) => handleUpdateFeedbackStatus(id, status, notes)}
            onVoteHelpful={handleVoteHelpful}
            onNewFeedbackClick={() => setActiveTab('submit')}
            onTrackTicket={handleNavigateToTrack}
          />
        )}

        {activeTab === 'courses' && (
          <CoursesDirectory
            courses={courses}
            feedbacks={feedbacks}
            onSelectCourseToFeedback={handleCourseToFeedback}
            onSelectCourseToAnalytics={handleCourseToAnalytics}
            onAddNewCourse={handleAddNewCourse}
          />
        )}

        {activeTab === 'school_info' && (
          <SchoolInfoView
            onNavigateToFeedback={() => setActiveTab('submit')}
            onNavigateToCourse={handleCourseToFeedback}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="hidden lg:block bg-white border-t border-slate-200/80 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">Torres Capitol College (TCC)</span>
            <span>•</span>
            <span className="text-slate-600">Student Feedback & Resolution Portal</span>
            <span>•</span>
            <a 
              href="https://philcountryville.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 font-medium underline inline-flex items-center gap-1"
            >
              philcountryville.com
            </a>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Confidential & Student-Protected Submissions</span>
            <span>•</span>
            <span>Mobile & Desktop Responsive</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
