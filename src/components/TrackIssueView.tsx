import React, { useState, useMemo } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Building2, 
  MapPin, 
  Calendar, 
  UserCheck, 
  ArrowRight, 
  ThumbsUp, 
  FileCheck2, 
  HelpCircle,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Filter
} from 'lucide-react';
import { FeedbackSubmission, TicketStatus } from '../types';

interface TrackIssueViewProps {
  feedbacks: FeedbackSubmission[];
  initialTicketId?: string;
  onVoteHelpful: (feedbackId: string) => void;
  onNavigateToSubmit: () => void;
}

export const TrackIssueView: React.FC<TrackIssueViewProps> = ({
  feedbacks,
  initialTicketId,
  onVoteHelpful,
  onNavigateToSubmit
}) => {
  const [searchTicket, setSearchTicket] = useState<string>(initialTicketId || '');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [activeTicketId, setActiveTicketId] = useState<string | null>(
    initialTicketId || feedbacks[0]?.id || null
  );

  // Find exact ticket if searching
  const searchedTicket = useMemo(() => {
    if (!searchTicket.trim()) return null;
    const query = searchTicket.trim().toLowerCase();
    return feedbacks.find(
      f => (f.ticketNumber && f.ticketNumber.toLowerCase().includes(query)) ||
           f.id.toLowerCase().includes(query)
    );
  }, [searchTicket, feedbacks]);

  // Filter list of trackable concerns and feedback
  const trackableList = useMemo(() => {
    return feedbacks.filter(f => {
      if (selectedCategory !== 'all' && (f.category || 'academics') !== selectedCategory) {
        return false;
      }
      if (selectedStatusFilter !== 'all' && f.status !== selectedStatusFilter) {
        return false;
      }
      return true;
    });
  }, [feedbacks, selectedCategory, selectedStatusFilter]);

  // The active ticket displayed in detail
  const currentDetailTicket = useMemo(() => {
    if (searchedTicket) return searchedTicket;
    if (activeTicketId) {
      const found = feedbacks.find(f => f.id === activeTicketId);
      if (found) return found;
    }
    return feedbacks[0] || null;
  }, [searchedTicket, activeTicketId, feedbacks]);

  const getStatusStepIndex = (status: TicketStatus) => {
    switch (status) {
      case 'resolved':
      case 'addressed':
        return 3;
      case 'in_progress':
      case 'reviewed':
        return 2;
      case 'investigating':
        return 1;
      case 'pending':
      case 'new':
      default:
        return 0;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Hero Search Tracker */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-indigo-950/40">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>Torres Capitol College • Concern Tracker & Resolution Monitor</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-white">
            Track Issue Resolution & Institutional Actions
          </h2>
          <p className="text-xs sm:text-sm text-indigo-200/90 leading-relaxed">
            Enter your unique TCC tracking number to view real-time investigation stages, department assignments, and official resolutions from college administrators.
          </p>

          {/* Ticket Search Bar */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2 max-w-xl">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-indigo-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="input-track-ticket-number"
                type="text"
                value={searchTicket}
                onChange={(e) => setSearchTicket(e.target.value)}
                placeholder="Enter Ticket # (e.g. TCC-2024-8192 or TCC-2024-7401)"
                className="w-full text-xs sm:text-sm pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-200/60 focus:bg-white focus:text-slate-900 focus:outline-none focus:ring-2 focus:ring-white transition-all"
              />
            </div>
            {searchTicket && (
              <button
                type="button"
                onClick={() => setSearchTicket('')}
                className="px-4 py-2.5 rounded-xl text-xs font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Left is List of Trackable Tickets, Right is Active Detail & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Tickets Directory (4 cols on lg) */}
        <div className="lg:col-span-5 space-y-3">
          
          <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">
                Submitted Student Issues ({trackableList.length})
              </span>
              <button
                type="button"
                onClick={onNavigateToSubmit}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
              >
                + Submit New Concern
              </button>
            </div>

            {/* Quick Filters */}
            <div className="grid grid-cols-2 gap-2">
              <select
                id="track-select-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 min-h-[34px]"
              >
                <option value="all">All Categories</option>
                <option value="services">School Services</option>
                <option value="facilities">Campus Facilities</option>
                <option value="activities">Student Activities</option>
                <option value="academics">Academics</option>
              </select>

              <select
                id="track-select-status"
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 min-h-[34px]"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>

          {/* List items */}
          <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
            {trackableList.map((ticket) => {
              const isSelected = currentDetailTicket?.id === ticket.id;
              const isResolved = ticket.status === 'resolved' || ticket.status === 'addressed';

              return (
                <div
                  key={ticket.id}
                  id={`ticket-list-item-${ticket.id}`}
                  onClick={() => {
                    setActiveTicketId(ticket.id);
                    setSearchTicket('');
                  }}
                  className={`cursor-pointer p-4 rounded-xl border transition-all text-left space-y-2 ${
                    isSelected
                      ? 'bg-indigo-50/70 border-indigo-300 shadow-xs ring-1 ring-indigo-200'
                      : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200">
                      {ticket.ticketNumber || ticket.id}
                    </span>

                    {isResolved ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> Resolved
                      </span>
                    ) : ticket.status === 'in_progress' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                        <Clock className="w-3 h-3" /> In Progress
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        <AlertCircle className="w-3 h-3" /> Under Review
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-bold text-slate-900 line-clamp-1">
                    {ticket.title || ticket.strengths.slice(0, 50)}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="truncate max-w-[180px]">
                      {ticket.department || 'Academic Affairs'}
                    </span>
                    <span>
                      {new Date(ticket.timestamp).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Tracker View with Stepper & Official Resolution (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-4">
          {currentDetailTicket ? (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-6">
              
              {/* Top Header of Ticket */}
              <div className="space-y-2 border-b border-slate-100 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-200">
                      {currentDetailTicket.ticketNumber || currentDetailTicket.id}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                      {(currentDetailTicket.category || 'academics').toUpperCase()}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500">
                    Logged: {new Date(currentDetailTicket.timestamp).toLocaleString(undefined, {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {currentDetailTicket.title || currentDetailTicket.strengths}
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-1">
                  <span className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/60">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <strong>Office:</strong> {currentDetailTicket.department || 'Office of Academic Affairs'}
                  </span>
                  <span className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/60">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <strong>Location:</strong> {currentDetailTicket.location || currentDetailTicket.targetEntity || 'Campus'}
                  </span>
                </div>
              </div>

              {/* Progress Stepper */}
              <div>
                <div className="text-xs font-bold text-slate-700 mb-3 uppercase tracking-wider">
                  Live Resolution Progress Tracker
                </div>

                <div className="grid grid-cols-4 gap-2 text-center relative">
                  {['Submitted', 'Acknowledged', 'In Progress', 'Resolved'].map((step, idx) => {
                    const currentIdx = getStatusStepIndex(currentDetailTicket.status);
                    const isCompleted = idx <= currentIdx;
                    const isCurrent = idx === currentIdx;

                    return (
                      <div key={step} className="space-y-1.5 flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            isCompleted
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-400 border border-slate-200'
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <div
                          className={`text-[11px] font-medium leading-tight ${
                            isCurrent ? 'text-indigo-600 font-bold' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                          }`}
                        >
                          {step}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Detailed Description */}
              <div className="space-y-2 bg-slate-50/80 p-4 rounded-xl border border-slate-200/70 text-xs">
                <div className="font-bold text-slate-900">Reported Student Statement:</div>
                <p className="text-slate-700 leading-relaxed">
                  {currentDetailTicket.areasForImprovement || currentDetailTicket.strengths}
                </p>
                {currentDetailTicket.additionalComments && (
                  <p className="text-slate-500 italic pt-1 border-t border-slate-200/50">
                    "{currentDetailTicket.additionalComments}"
                  </p>
                )}
              </div>

              {/* Official Resolution Box */}
              {currentDetailTicket.adminResponse ? (
                <div className="bg-emerald-50/80 rounded-xl border border-emerald-300 p-4 text-xs space-y-2">
                  <div className="flex items-center justify-between font-bold text-emerald-900 border-b border-emerald-200/60 pb-2">
                    <span className="flex items-center gap-1.5">
                      <FileCheck2 className="w-4 h-4 text-emerald-700" />
                      Official Institutional Action Taken
                    </span>
                    <span className="text-[11px] font-medium text-emerald-800">
                      Resolved {new Date(currentDetailTicket.adminResponse.resolvedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-emerald-950 font-medium leading-relaxed">
                    {currentDetailTicket.adminResponse.actionTaken}
                  </p>

                  <div className="pt-2 text-[11px] text-emerald-800 flex items-center justify-between">
                    <span><strong>Signed off by:</strong> {currentDetailTicket.adminResponse.resolvedBy}</span>
                    {currentDetailTicket.adminResponse.officialNotes && (
                      <span className="italic">{currentDetailTicket.adminResponse.officialNotes}</span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-amber-50/70 rounded-xl border border-amber-200 p-4 text-xs space-y-1">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-600" />
                    Investigation & Remediation in Progress
                  </div>
                  <p className="text-amber-800 leading-relaxed">
                    This item has been assigned to <strong>{currentDetailTicket.assignedTo || currentDetailTicket.department || 'the administrative team'}</strong>. Standard resolution time is typically 24-48 business hours. Check back for official completion notes.
                  </p>
                </div>
              )}

              {/* Action and Upvote Footer */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                <div className="text-slate-500 flex items-center gap-1">
                  <span>Student Submitter:</span>
                  <strong className="text-slate-800">
                    {currentDetailTicket.isAnonymous ? 'Anonymous' : (currentDetailTicket.studentName || 'Student')}
                  </strong>
                </div>

                <button
                  type="button"
                  onClick={() => onVoteHelpful(currentDetailTicket.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-medium transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-indigo-600" />
                  <span>I also experience this ({currentDetailTicket.helpfulCount || 0})</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <HelpCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <div className="text-sm font-semibold text-slate-900">No ticket selected</div>
              <p className="text-xs text-slate-500 mt-1">
                Select a ticket from the left column or search by ticket code above.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
