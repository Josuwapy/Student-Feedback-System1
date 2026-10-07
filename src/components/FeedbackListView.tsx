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
  Tag
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
      if (categoryFilter !== 'all') {
        const cat = fb.category || 'academics';
        if (cat !== categoryFilter) return false;
      }

      // Course match (if course filter selected and fb is academic)
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
        const studentMatch = fb.studentName?.toLowerCase().includes(q);

        if (!courseMatch && !titleMatch && !deptMatch && !ticketMatch && !entityMatch && !strengthsMatch && !improveMatch && !tagsMatch && !commentsMatch && !studentMatch) {
          return false;
        }
      }

      return true;
    });
  }, [feedbacks, courses, categoryFilter, courseFilter, ratingFilter, statusFilter, searchQuery]);

  return (
    <div className="max-w-5xl mx-auto py-4 sm:py-8 px-4 sm:px-6 space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              TCC Student Submissions & Opinions
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Voice repository across Torres Capitol College campus services, facilities, student events, and faculty evaluations.
          </p>
        </div>

        <button
          id="btn-list-new-feedback"
          type="button"
          onClick={onNewFeedbackClick}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors shadow-xs shrink-0"
        >
          + Submit New Feedback
        </button>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {[
          { id: 'all', label: 'All Submissions' },
          { id: 'services', label: '🏢 School Services' },
          { id: 'facilities', label: '🧪 Campus Facilities' },
          { id: 'activities', label: '🏆 Student Activities' },
          { id: 'academics', label: '📚 Academic Courses' }
        ].map((cat) => (
          <button
            key={cat.id}
            id={`filter-cat-${cat.id}`}
            type="button"
            onClick={() => setCategoryFilter(cat.id)}
            className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
              categoryFilter === cat.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="input-search-feedbacks"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ticket # (e.g. SFS-2024-8192), department, course, keywords, or tags..."
            className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[42px]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-1"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filters row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
          {/* Rating filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
              Satisfaction Rating
            </label>
            <select
              id="filter-list-rating"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[38px]"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars (Outstanding)</option>
              <option value="4">4 Stars (Very Good)</option>
              <option value="3">3 Stars (Good)</option>
              <option value="2">2 Stars (Fair)</option>
              <option value="1">1 Star (Unsatisfactory)</option>
            </select>
          </div>

          {/* Status filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
              Resolution Status
            </label>
            <select
              id="filter-list-status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[38px]"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending / New</option>
              <option value="in_progress">In Progress / Investigating</option>
              <option value="resolved">Resolved / Action Taken</option>
            </select>
          </div>

          {/* Academic Course Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
              Course Specific
            </label>
            <select
              id="filter-list-course"
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[38px]"
            >
              <option value="all">All Courses / Units</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.code}: {c.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredFeedbacks.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-8 text-center space-y-2">
            <MessageSquare className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No submissions found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No student feedback matches your selected search criteria. Try adjusting or resetting your filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
                setCourseFilter('all');
                setRatingFilter('all');
                setStatusFilter('all');
              }}
              className="mt-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredFeedbacks.map((fb) => {
            const course = courses.find((c) => c.id === fb.courseId);
            const isExpanded = !!expandedCards[fb.id];
            const dateFormatted = new Date(fb.timestamp).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });

            const isResolved = fb.status === 'resolved' || fb.status === 'addressed';
            const isInProgress = fb.status === 'in_progress' || fb.status === 'investigating' || fb.status === 'reviewed';

            return (
              <article
                key={fb.id}
                id={`card-feedback-${fb.id}`}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all p-4 sm:p-6 space-y-4"
              >
                {/* Header: Ticket number, Category, Target, Rating, Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 flex-wrap">
                    {fb.ticketNumber && (
                      <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200">
                        {fb.ticketNumber}
                      </span>
                    )}

                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {fb.category || 'ACADEMICS'}
                    </span>

                    {course ? (
                      <span className="text-xs font-bold text-slate-900">
                        {course.code} • {course.name} ({course.instructor})
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-slate-900">
                        {fb.department || fb.targetEntity}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <div className="flex items-center gap-1.5 bg-amber-50/70 border border-amber-200/60 px-2 py-0.5 rounded-lg">
                      <StarRating value={fb.overallRating} readOnly={true} size="sm" />
                      <span className="text-xs font-bold text-amber-700 ml-0.5">
                        {fb.overallRating}.0
                      </span>
                    </div>

                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                        isResolved
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : isInProgress
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {isResolved ? '✓ Resolved' : isInProgress ? 'In Progress' : 'Pending Review'}
                    </span>
                  </div>
                </div>

                {/* Subject Title if available */}
                {fb.title && (
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    {fb.title}
                  </h4>
                )}

                {/* Metadata details: Student anonymity, date, location */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    {fb.isAnonymous ? (
                      <>
                        <Shield className="w-3.5 h-3.5 text-slate-400" />
                        <span>Anonymous Student</span>
                      </>
                    ) : (
                      <>
                        <User className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="font-medium text-slate-700">{fb.studentName || 'Student'}</span>
                        {fb.studentId && <span className="text-[10px] text-slate-400">({fb.studentId})</span>}
                      </>
                    )}
                  </span>

                  <span>•</span>

                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{dateFormatted}</span>
                  </span>

                  {fb.location && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{fb.location}</span>
                      </span>
                    </>
                  )}
                </div>

                {/* Feedback Tags */}
                {fb.selectedTags && fb.selectedTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {fb.selectedTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Qualitative Statements */}
                <div className="space-y-2 text-xs">
                  {fb.strengths && (
                    <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/70">
                      <span className="font-bold text-emerald-900 block mb-0.5">
                        Strengths & Positives:
                      </span>
                      <p className="text-slate-700 leading-relaxed">{fb.strengths}</p>
                    </div>
                  )}

                  {fb.areasForImprovement && (
                    <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-100/70">
                      <span className="font-bold text-amber-900 block mb-0.5">
                        Concerns & Recommended Improvements:
                      </span>
                      <p className="text-slate-700 leading-relaxed">{fb.areasForImprovement}</p>
                    </div>
                  )}

                  {fb.additionalComments && (
                    <div className="text-slate-600 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      "{fb.additionalComments}"
                    </div>
                  )}
                </div>

                {/* Official Resolution Callout if Resolved */}
                {fb.adminResponse && (
                  <div className="bg-emerald-50 rounded-xl border border-emerald-300 p-3.5 text-xs space-y-1.5">
                    <div className="flex items-center justify-between font-bold text-emerald-900">
                      <span className="flex items-center gap-1.5">
                        <FileCheck2 className="w-4 h-4 text-emerald-700" />
                        Institutional Action Taken (Resolved)
                      </span>
                      <span className="text-[11px] font-medium text-emerald-700">
                        {new Date(fb.adminResponse.resolvedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-emerald-950 font-medium leading-relaxed">
                      {fb.adminResponse.actionTaken}
                    </p>
                    <div className="text-[11px] text-emerald-800">
                      Authorized by: <strong>{fb.adminResponse.resolvedBy}</strong>
                    </div>
                  </div>
                )}

                {/* Card Footer: Upvote helpful, Expand details, Track ticket */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onVoteHelpful(fb.id)}
                      className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 font-medium transition-colors"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>Endorse / Agree ({fb.helpfulCount || 0})</span>
                    </button>

                    {fb.ticketNumber && onTrackTicket && (
                      <button
                        type="button"
                        onClick={() => onTrackTicket(fb.ticketNumber || fb.id)}
                        className="text-indigo-600 hover:text-indigo-800 font-semibold"
                      >
                        Track Progress →
                      </button>
                    )}
                  </div>

                  {/* Rubric Breakdown Accordion */}
                  {fb.ratings && Object.keys(fb.ratings).length > 0 && (
                    <button
                      type="button"
                      onClick={() => toggleExpand(fb.id)}
                      className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      <span>{isExpanded ? 'Hide Rubric' : 'View Ratings'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>

                {/* Expanded Rubric Details */}
                {isExpanded && fb.ratings && (
                  <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-50/50 p-3 rounded-xl">
                    {Object.entries(fb.ratings).map(([critId, val]) => {
                      const critDef = EVALUATION_CRITERIA.find((c) => c.id === critId);
                      return (
                        <div key={critId} className="flex items-center justify-between py-1 border-b border-slate-100 last:border-none">
                          <span className="text-slate-600 font-medium">
                            {critDef?.label || critId.replace('_', ' ')}:
                          </span>
                          <span className="font-bold text-slate-800">{val} / 5</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>

    </div>
  );
};
