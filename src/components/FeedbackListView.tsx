import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ThumbsUp, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  Shield, 
  User, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Award, 
  Sparkles, 
  Bookmark, 
  MessageCircle, 
  Building2, 
  MapPin, 
  FileCheck2, 
  AlertTriangle, 
  Lightbulb, 
  Tag, 
  ArrowRight
} from 'lucide-react';
import { Course, FeedbackSubmission, FeedbackCategory, TicketStatus } from '../types';
import { EVALUATION_CRITERIA } from '../data/initialData';
import { StarRating } from './StarRating';

interface FeedbackListViewProps {
  courses: Course[];
  feedbacks: FeedbackSubmission[];
  initialCourseFilter?: string;
  onUpdateFeedbackStatus: (feedbackId: string, status: TicketStatus, notes?: string) => void;
  onVoteHelpful: (feedbackId: string) => void;
  onNewFeedbackClick: () => void;
  onTrackTicket?: (ticketId: string) => void;
}

export const FeedbackListView: React.FC<FeedbackListViewProps> = ({
  courses,
  feedbacks,
  initialCourseFilter = 'all',
  onUpdateFeedbackStatus,
  onVoteHelpful,
  onNewFeedbackClick,
  onTrackTicket
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [courseFilter, setCourseFilter] = useState<string>(initialCourseFilter);
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState<string>('');

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleStartEditNote = (fb: FeedbackSubmission) => {
    setEditingNoteId(fb.id);
    setNoteText(fb.facultyNotes || '');
  };

  const handleSaveNote = (fbId: string) => {
    const fb = feedbacks.find((f) => f.id === fbId);
    if (fb) {
      onUpdateFeedbackStatus(fbId, fb.status === 'new' ? 'reviewed' : fb.status, noteText.trim() || undefined);
    }
    setEditingNoteId(null);
  };

  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter((fb) => {
      // Category match
      if (categoryFilter !== 'all' && (fb.category || 'academics') !== categoryFilter) {
        return false;
      }

      // Course match
      if (courseFilter !== 'all' && fb.courseId !== courseFilter) {
        return false;
      }

      // Rating match
      if (ratingFilter !== 'all') {
        const targetRating = parseInt(ratingFilter, 10);
        if (Math.round(fb.overallRating) !== targetRating) {
          return false;
        }
      }

      // Status match
      if (statusFilter !== 'all') {
        if (statusFilter === 'resolved' && (fb.status === 'resolved' || fb.status === 'addressed')) {
          // match
        } else if (statusFilter === 'in_progress' && (fb.status === 'in_progress' || fb.status === 'investigating')) {
          // match
        } else if (statusFilter === 'pending' && (fb.status === 'pending' || fb.status === 'new')) {
          // match
        } else if (fb.status !== statusFilter) {
          return false;
        }
      }

      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const course = courses.find((c) => c.id === fb.courseId);
        const courseMatch = course?.name.toLowerCase().includes(q) || course?.code.toLowerCase().includes(q) || course?.instructor.toLowerCase().includes(q);
        const titleMatch = fb.title?.toLowerCase().includes(q);
        const deptMatch = fb.department?.toLowerCase().includes(q);
        const ticketMatch = fb.ticketNumber?.toLowerCase().includes(q) || fb.id.toLowerCase().includes(q);
        const entityMatch = fb.targetEntity?.toLowerCase().includes(q);
        const strengthsMatch = fb.strengths?.toLowerCase().includes(q);
        const improveMatch = fb.areasForImprovement?.toLowerCase().includes(q);
        const tagsMatch = fb.selectedTags?.some((t) => t.toLowerCase().includes(q));
        const commentsMatch = fb.additionalComments?.toLowerCase().includes(q);

        return (
          courseMatch ||
          titleMatch ||
          deptMatch ||
          ticketMatch ||
          entityMatch ||
          strengthsMatch ||
          improveMatch ||
          tagsMatch ||
          commentsMatch
        );
      }

      return true;
    });
  }, [feedbacks, courses, categoryFilter, courseFilter, ratingFilter, statusFilter, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Editorial Header */}
      <div className="border-b border-slate-200/90 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Torres Capitol College</span>
            <span aria-hidden="true">·</span>
            <span>Verified Student Submissions</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
            Campus Voices & Evaluation Registry
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Public transparent registry of course evaluations, service feedback, and resolved facilities tickets across all colleges.
          </p>
        </div>

        <button
          type="button"
          onClick={onNewFeedbackClick}
          className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs inline-flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer self-start sm:self-auto"
        >
          <span>Submit Feedback</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
          
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search keyword, course, department, or ticket #..."
              className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>

          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full text-xs py-2 px-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            >
              <option value="all">All Domains</option>
              <option value="academics">Academics</option>
              <option value="facilities">Campus Facilities</option>
              <option value="services">Student Services</option>
              <option value="activities">Student Affairs</option>
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full text-xs py-2 px-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending Triage</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved Closed</option>
            </select>
          </div>

        </div>

        {/* Course Filter Dropdown if category is Academics or All */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Filter by Course:</span>
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="text-xs py-1 px-2 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
            >
              <option value="all">All Courses</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.code}: {c.name}</option>
              ))}
            </select>
          </div>

          <span className="text-slate-500 font-mono-numbers">
            {filteredFeedbacks.length} submissions found
          </span>
        </div>
      </div>

      {/* Feedbacks Grid */}
      <div className="space-y-4">
        {filteredFeedbacks.length > 0 ? (
          filteredFeedbacks.map((fb) => {
            const course = courses.find((c) => c.id === fb.courseId);
            const isExpanded = expandedCards[fb.id] || false;
            const isEditing = editingNoteId === fb.id;

            return (
              <div
                key={fb.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 space-y-4 transition-all hover:border-slate-300"
              >
                {/* Header Strip */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-mono-numbers font-bold text-slate-900">
                        {fb.ticketNumber || fb.id}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="capitalize">{fb.category || 'academics'}</span>
                      <span aria-hidden="true">·</span>
                      <span className="capitalize">{fb.feedbackNature || 'evaluation'}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-numbers">
                        {new Date(fb.timestamp).toLocaleDateString()}
                      </span>
                    </div>

                    <h2 className="font-display text-base sm:text-lg font-semibold text-slate-900">
                      {fb.title || (course ? `${course.code} Evaluation` : fb.department)}
                    </h2>

                    <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
                      <span>Target: <strong className="text-slate-800">{course ? `${course.code} — ${course.instructor}` : fb.department}</strong></span>
                      {fb.location && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>Location: {fb.location}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Rating & Status */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1">
                    <div className="flex items-center gap-1.5">
                      <StarRating rating={Math.round(fb.overallRating)} size="sm" readOnly />
                      <span className="text-xs font-mono-numbers font-bold text-slate-900">
                        {fb.overallRating}.0
                      </span>
                    </div>

                    <span className={`text-xs capitalize font-semibold ${
                      fb.status === 'resolved' || fb.status === 'addressed' ? 'text-emerald-700' :
                      fb.status === 'in_progress' || fb.status === 'investigating' ? 'text-amber-700' :
                      'text-slate-600'
                    }`}>
                      {fb.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="space-y-3 text-xs">
                  {fb.strengths && fb.strengths !== 'No specific commendations noted.' && (
                    <div>
                      <span className="font-semibold text-slate-800">Commendation / Highlights:</span>
                      <p className="mt-0.5 text-slate-700 leading-relaxed bg-slate-50/60 p-3 rounded-lg border border-slate-100">
                        {fb.strengths}
                      </p>
                    </div>
                  )}

                  {fb.areasForImprovement && (
                    <div>
                      <span className="font-semibold text-slate-800">Areas for Action / Remediation:</span>
                      <p className="mt-0.5 text-slate-700 leading-relaxed bg-slate-50/60 p-3 rounded-lg border border-slate-100">
                        {fb.areasForImprovement}
                      </p>
                    </div>
                  )}

                  {/* Official Response Banner */}
                  {(fb.adminResponse?.actionTaken || fb.adminResponse?.officialNotes) && (
                    <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-3.5 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-emerald-800 font-semibold text-[11px] uppercase tracking-wider">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Official Resolution Action</span>
                      </div>
                      <p className="text-slate-900 font-medium">
                        {fb.adminResponse.actionTaken}
                      </p>
                      {fb.adminResponse.officialNotes && (
                        <p className="text-slate-600 text-[11px] leading-relaxed">
                          {fb.adminResponse.officialNotes}
                        </p>
                      )}
                      <div className="text-[10px] text-emerald-900 pt-0.5">
                        Resolved by: <strong>{fb.adminResponse.resolvedBy}</strong>
                      </div>
                    </div>
                  )}

                  {/* Expanded Criteria Breakdown */}
                  {isExpanded && fb.ratings && (
                    <div className="pt-3 border-t border-slate-100 space-y-2 animate-in fade-in duration-150">
                      <span className="font-semibold text-slate-800">Rubric Criteria Breakdown:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {EVALUATION_CRITERIA.map((crit) => (
                          <div key={crit.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 text-[11px]">
                            <span className="text-slate-600">{crit.shortLabel}:</span>
                            <span className="font-mono-numbers font-semibold text-slate-900">
                              {fb.ratings[crit.id] || 4}.0 / 5.0
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Action Strip */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onVoteHelpful(fb.id)}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-slate-400" />
                      <span>Helpful ({fb.helpfulCount || 0})</span>
                    </button>

                    {onTrackTicket && (
                      <button
                        type="button"
                        onClick={() => onTrackTicket(fb.ticketNumber || fb.id)}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Track Ticket</span>
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleExpand(fb.id)}
                    className="text-slate-500 hover:text-slate-800 font-medium inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isExpanded ? 'Less Details' : 'View Rubric Breakdown'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/90 text-slate-500">
            <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="font-medium text-sm text-slate-700">No submissions found matching criteria.</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting the domain, rating, or search filters.</p>
          </div>
        )}
      </div>

    </div>
  );
};
