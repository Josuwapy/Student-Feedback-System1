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
  Filter,
  Check,
  Copy,
  AlertTriangle,
  RotateCcw
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
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Active ticket displayed in detail
  const [activeTicketId, setActiveTicketId] = useState<string | null>(
    initialTicketId || feedbacks[0]?.id || null
  );

  // Find exact ticket if searching
  const searchedTicket = useMemo(() => {
    if (!searchTicket.trim()) return null;
    const query = searchTicket.trim().toLowerCase();
    return feedbacks.find(
      (f) =>
        (f.ticketNumber && f.ticketNumber.toLowerCase().includes(query)) ||
        f.id.toLowerCase().includes(query)
    );
  }, [searchTicket, feedbacks]);

  // Filter list of trackable concerns and feedback
  const trackableList = useMemo(() => {
    return feedbacks.filter((f) => {
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
      const found = feedbacks.find((f) => f.id === activeTicketId);
      if (found) return found;
    }
    return feedbacks[0] || null;
  }, [searchedTicket, activeTicketId, feedbacks]);

  const handleCopyCode = (code?: string) => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

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

  const currentStepIndex = currentDetailTicket ? getStatusStepIndex(currentDetailTicket.status) : 0;

  // Sample tickets for quick 1-click exploration
  const sampleTickets = useMemo(() => {
    return feedbacks.slice(0, 3);
  }, [feedbacks]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Editorial Header */}
      <div className="border-b border-slate-200/90 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <span>Torres Capitol College</span>
              <span aria-hidden="true">·</span>
              <span>Accountability & Transparency Desk</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
              Track Issue Resolution & Institutional Actions
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Inspect live investigation milestones, assigned department officers, and official closure resolutions for any ticket.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="w-full sm:w-80">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="input-track-ticket-number"
                type="text"
                value={searchTicket}
                onChange={(e) => setSearchTicket(e.target.value)}
                placeholder="Search ticket # (e.g. TCC-2024-8192)..."
                className="w-full text-xs font-mono-numbers pl-9 pr-8 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 shadow-2xs"
              />
              {searchTicket && (
                <button
                  type="button"
                  onClick={() => setSearchTicket('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Quick Sample Tickets Click Strip */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span>Quick explore sample tickets:</span>
          {sampleTickets.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => {
                setSearchTicket(sample.ticketNumber || sample.id);
                setActiveTicketId(sample.id);
              }}
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono-numbers text-[11px] transition-colors cursor-pointer"
            >
              {sample.ticketNumber || sample.id} · {sample.department || sample.courseId}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left is Active Detail & Lifecycle, Right is Ticket Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Active Ticket Detail (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {currentDetailTicket ? (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
              
              {/* Ticket Top Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-mono-numbers font-bold text-slate-900 text-sm">
                      {currentDetailTicket.ticketNumber || currentDetailTicket.id}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(currentDetailTicket.ticketNumber || currentDetailTicket.id)}
                      title="Copy ticket number"
                      className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">{currentDetailTicket.category || 'academics'}</span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">{currentDetailTicket.feedbackNature || 'concern'}</span>
                  </div>

                  <h2 className="font-display text-xl font-semibold text-slate-900 tracking-tight">
                    {currentDetailTicket.title || currentDetailTicket.strengths || 'Student Feedback Ticket'}
                  </h2>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-0.5">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{currentDetailTicket.department || 'Office of Academic Affairs'}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-mono-numbers">
                        {new Date(currentDetailTicket.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      Priority: <strong className="capitalize text-slate-800">{currentDetailTicket.priority || 'Medium'}</strong>
                    </span>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="shrink-0 text-left sm:text-right">
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Current State</div>
                  <div className={`text-sm font-semibold capitalize mt-0.5 ${
                    currentDetailTicket.status === 'resolved' || currentDetailTicket.status === 'addressed'
                      ? 'text-emerald-700'
                      : currentDetailTicket.status === 'in_progress' || currentDetailTicket.status === 'investigating'
                      ? 'text-amber-700'
                      : 'text-slate-700'
                  }`}>
                    {currentDetailTicket.status.replace('_', ' ')}
                  </div>
                </div>
              </div>

              {/* 4-Stage Lifecycle Stepper */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                  Resolution Progress Pipeline
                </span>
                
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { step: 0, label: 'Submitted', desc: 'Registered in queue' },
                    { step: 1, label: 'Investigating', desc: 'Officer assigned' },
                    { step: 2, label: 'In Remediation', desc: 'Action in progress' },
                    { step: 3, label: 'Resolved', desc: 'Officially closed' }
                  ].map((s) => {
                    const isCompleted = currentStepIndex >= s.step;
                    const isCurrent = currentStepIndex === s.step;
                    return (
                      <div
                        key={s.step}
                        className={`p-3 rounded-xl border transition-all ${
                          isCurrent
                            ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                            : isCompleted
                            ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                            : 'bg-slate-50 border-slate-200/60 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-[10px] font-mono-numbers font-semibold ${isCurrent ? 'text-indigo-300' : isCompleted ? 'text-emerald-700' : 'text-slate-400'}`}>
                            Phase 0{s.step + 1}
                          </span>
                          {isCompleted && !isCurrent && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          )}
                        </div>
                        <div className={`font-semibold text-xs ${isCurrent ? 'text-white' : isCompleted ? 'text-slate-900' : 'text-slate-500'}`}>
                          {s.label}
                        </div>
                        <div className={`text-[10px] mt-0.5 line-clamp-1 ${isCurrent ? 'text-slate-300' : 'text-slate-500'}`}>
                          {s.desc}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Official Resolution Card (if resolved or action taken) */}
              {(currentDetailTicket.adminResponse || currentDetailTicket.facultyNotes) && (
                <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-xl p-4 sm:p-5 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs uppercase tracking-wider">
                    <FileCheck2 className="w-4 h-4 text-emerald-600" />
                    <span>Official Institutional Response & Action Taken</span>
                  </div>
                  
                  {currentDetailTicket.adminResponse?.actionTaken && (
                    <div>
                      <div className="text-xs text-slate-500">Remediation Action:</div>
                      <div className="text-xs sm:text-sm font-semibold text-slate-900 mt-0.5">
                        {currentDetailTicket.adminResponse.actionTaken}
                      </div>
                    </div>
                  )}

                  {(currentDetailTicket.adminResponse?.officialNotes || currentDetailTicket.facultyNotes) && (
                    <div>
                      <div className="text-xs text-slate-500">Official Remarks & Notes:</div>
                      <div className="text-xs text-slate-700 mt-0.5 leading-relaxed bg-white/80 p-3 rounded-lg border border-emerald-100">
                        {currentDetailTicket.adminResponse?.officialNotes || currentDetailTicket.facultyNotes}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 border-t border-emerald-100 flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-900">
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Signed by: <strong>{currentDetailTicket.adminResponse?.resolvedBy || currentDetailTicket.assignedTo || 'Office of the Vice President'}</strong></span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onVoteHelpful(currentDetailTicket.id)}
                      className="px-2.5 py-1 rounded-md bg-white border border-emerald-200 text-emerald-800 font-medium text-xs hover:bg-emerald-100/50 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <ThumbsUp className="w-3 h-3 text-emerald-600" />
                      <span>Resolution Helpful ({currentDetailTicket.helpfulCount || 0})</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Student Report Content */}
              <div className="space-y-3 pt-2 border-t border-slate-100 text-xs">
                <div>
                  <span className="font-semibold text-slate-800">Submitted Observations / Details:</span>
                  <p className="mt-1 text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/60">
                    {currentDetailTicket.areasForImprovement || currentDetailTicket.strengths}
                  </p>
                </div>

                {currentDetailTicket.additionalComments && (
                  <div>
                    <span className="font-semibold text-slate-800">Additional Context:</span>
                    <p className="mt-1 text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                      {currentDetailTicket.additionalComments}
                    </p>
                  </div>
                )}

                {/* Tags */}
                {currentDetailTicket.selectedTags && currentDetailTicket.selectedTags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-2">
                    <span className="text-slate-500">Related Tags:</span>
                    {currentDetailTicket.selectedTags.map((t) => (
                      <span key={t} className="text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/90 text-slate-500">
              <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="font-medium text-sm text-slate-700">No ticket found with that identifier.</p>
              <p className="text-xs text-slate-500 mt-1">Check the code format (e.g. TCC-2024-8192) or choose a ticket from the queue.</p>
            </div>
          )}
        </div>

        {/* Right: Trackable Queue Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-semibold text-sm text-slate-900">
                  Institutional Ticket Queue
                </h3>
                <span className="text-xs text-slate-500">
                  {trackableList.length} tickets matching filters
                </span>
              </div>
            </div>

            {/* Filter controls */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-1/2 text-xs py-1.5 px-2 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  <option value="all">All Domains</option>
                  <option value="academics">Academics</option>
                  <option value="facilities">Facilities</option>
                  <option value="services">Services</option>
                  <option value="activities">Student Affairs</option>
                </select>

                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  className="w-1/2 text-xs py-1.5 px-2 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  <option value="all">All States</option>
                  <option value="pending">Pending</option>
                  <option value="investigating">Investigating</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>

            {/* Ticket items scroll list */}
            <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
              {trackableList.map((ticket) => {
                const isSelected = (currentDetailTicket?.id === ticket.id);
                return (
                  <button
                    key={ticket.id}
                    type="button"
                    onClick={() => {
                      setActiveTicketId(ticket.id);
                      setSearchTicket(ticket.ticketNumber || ticket.id);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-slate-900 bg-slate-900 text-white shadow-2xs'
                        : 'border-slate-200/80 bg-white hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className={`font-mono-numbers font-semibold ${isSelected ? 'text-indigo-300' : 'text-slate-900'}`}>
                        {ticket.ticketNumber || ticket.id}
                      </span>
                      <span className={`capitalize ${
                        ticket.status === 'resolved' || ticket.status === 'addressed'
                          ? isSelected ? 'text-emerald-300' : 'text-emerald-700'
                          : isSelected ? 'text-amber-300' : 'text-amber-700'
                      }`}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className={`font-semibold text-xs line-clamp-1 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                      {ticket.title || ticket.strengths}
                    </div>

                    <div className={`flex items-center gap-2 text-[10px] mt-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                      <span>{ticket.department || 'Academic Affairs'}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-numbers">
                        {new Date(ticket.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Submit link */}
            <div className="pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onNavigateToSubmit}
                className="w-full py-2 px-3 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Submit New Feedback</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
