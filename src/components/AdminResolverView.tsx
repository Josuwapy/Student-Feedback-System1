import React, { useState, useMemo } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Filter, 
  Search, 
  Download, 
  UserCheck, 
  Building2, 
  MessageSquare, 
  ArrowUpRight, 
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
  MapPin,
  Calendar,
  Send,
  X,
  RefreshCw,
  Eye,
  FileCheck2,
  AlertCircle
} from 'lucide-react';
import { FeedbackSubmission, TicketPriority, TicketStatus, FeedbackCategory } from '../types';
import { CAMPUS_DEPARTMENTS } from '../data/initialData';

interface AdminResolverViewProps {
  feedbacks: FeedbackSubmission[];
  onUpdateFeedbackStatus: (
    feedbackId: string, 
    status: TicketStatus, 
    notes?: string,
    adminResponse?: {
      actionTaken: string;
      resolvedBy: string;
      officialNotes?: string;
    },
    assignedTo?: string,
    priority?: TicketPriority
  ) => void;
  onSelectFeedbackForDetail?: (feedback: FeedbackSubmission) => void;
}

export const AdminResolverView: React.FC<AdminResolverViewProps> = ({
  feedbacks,
  onUpdateFeedbackStatus
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'unresolved' | 'urgent' | 'resolved'>('all');

  // Active ticket being edited / resolved in modal
  const [resolvingTicket, setResolvingTicket] = useState<FeedbackSubmission | null>(null);
  const [modalStatus, setModalStatus] = useState<TicketStatus>('in_progress');
  const [modalPriority, setModalPriority] = useState<TicketPriority>('medium');
  const [modalAssignedTo, setModalAssignedTo] = useState<string>('');
  const [modalActionTaken, setModalActionTaken] = useState<string>('');
  const [modalOfficialNotes, setModalOfficialNotes] = useState<string>('');
  const [modalDepartment, setModalDepartment] = useState<string>('');

  // Open modal with current ticket data
  const handleOpenResolverModal = (ticket: FeedbackSubmission) => {
    setResolvingTicket(ticket);
    setModalStatus(ticket.status || 'pending');
    setModalPriority(ticket.priority || 'medium');
    setModalAssignedTo(ticket.assignedTo || '');
    setModalDepartment(ticket.department || CAMPUS_DEPARTMENTS[0]?.name || '');
    setModalActionTaken(ticket.adminResponse?.actionTaken || '');
    setModalOfficialNotes(ticket.adminResponse?.officialNotes || ticket.facultyNotes || '');
  };

  // Submit resolution or status update
  const handleSaveResolution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolvingTicket) return;

    const adminResponseData = modalActionTaken.trim() ? {
      actionTaken: modalActionTaken.trim(),
      resolvedBy: modalAssignedTo.trim() || 'TCC Administration',
      officialNotes: modalOfficialNotes.trim()
    } : undefined;

    onUpdateFeedbackStatus(
      resolvingTicket.id,
      modalStatus,
      modalOfficialNotes.trim() || undefined,
      adminResponseData,
      modalAssignedTo.trim() || undefined,
      modalPriority
    );

    setResolvingTicket(null);
  };

  // Metrics calculation
  const metrics = useMemo(() => {
    const total = feedbacks.length;
    const resolved = feedbacks.filter(f => f.status === 'resolved' || f.status === 'addressed').length;
    const inProgress = feedbacks.filter(f => f.status === 'in_progress' || f.status === 'investigating' || f.status === 'reviewed').length;
    const pending = feedbacks.filter(f => f.status === 'pending' || f.status === 'new' || !f.status).length;
    const urgent = feedbacks.filter(f => f.priority === 'urgent' && f.status !== 'resolved' && f.status !== 'closed').length;
    const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

    return {
      total,
      resolved,
      inProgress,
      pending,
      urgent,
      resolutionRate
    };
  }, [feedbacks]);

  // Filtered tickets
  const filteredTickets = useMemo(() => {
    return feedbacks.filter(ticket => {
      // Tab filter
      if (activeTabFilter === 'unresolved' && (ticket.status === 'resolved' || ticket.status === 'closed')) return false;
      if (activeTabFilter === 'urgent' && ticket.priority !== 'urgent') return false;
      if (activeTabFilter === 'resolved' && ticket.status !== 'resolved' && ticket.status !== 'addressed') return false;

      // Category filter
      if (selectedCategory !== 'all') {
        const cat = ticket.category || 'academics';
        if (cat !== selectedCategory) return false;
      }

      // Status filter
      if (selectedStatus !== 'all') {
        if (ticket.status !== selectedStatus) return false;
      }

      // Priority filter
      if (selectedPriority !== 'all') {
        if (ticket.priority !== selectedPriority) return false;
      }

      // Department filter
      if (selectedDepartment !== 'all') {
        if (ticket.department !== selectedDepartment) return false;
      }

      // Search query
      if (search.trim()) {
        const q = search.toLowerCase();
        const ticketNo = (ticket.ticketNumber || ticket.id).toLowerCase();
        const title = (ticket.title || '').toLowerCase();
        const strengths = (ticket.strengths || '').toLowerCase();
        const areas = (ticket.areasForImprovement || '').toLowerCase();
        const student = (ticket.studentName || '').toLowerCase();
        const dept = (ticket.department || '').toLowerCase();
        const entity = (ticket.targetEntity || '').toLowerCase();
        const location = (ticket.location || '').toLowerCase();

        return (
          ticketNo.includes(q) ||
          title.includes(q) ||
          strengths.includes(q) ||
          areas.includes(q) ||
          student.includes(q) ||
          dept.includes(q) ||
          entity.includes(q) ||
          location.includes(q)
        );
      }

      return true;
    });
  }, [feedbacks, activeTabFilter, selectedCategory, selectedStatus, selectedPriority, selectedDepartment, search]);

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      'Ticket Number',
      'Date Submitted',
      'Category',
      'Feedback Type',
      'Title / Subject',
      'Department',
      'Target Facility/Course',
      'Location',
      'Priority',
      'Status',
      'Assigned To',
      'Student',
      'Action Taken / Resolution',
      'Official Notes'
    ];

    const rows = filteredTickets.map(t => [
      `"${t.ticketNumber || t.id}"`,
      `"${new Date(t.timestamp).toLocaleDateString()}"`,
      `"${t.category || 'academics'}"`,
      `"${t.feedbackNature || 'evaluation'}"`,
      `"${(t.title || t.strengths.slice(0, 40)).replace(/"/g, '""')}"`,
      `"${(t.department || 'Academic Affairs').replace(/"/g, '""')}"`,
      `"${(t.targetEntity || t.courseId).replace(/"/g, '""')}"`,
      `"${(t.location || 'Campus').replace(/"/g, '""')}"`,
      `"${t.priority || 'medium'}"`,
      `"${t.status}"`,
      `"${(t.assignedTo || 'Unassigned').replace(/"/g, '""')}"`,
      `"${t.isAnonymous ? 'Anonymous' : (t.studentName || 'Student')}"`,
      `"${(t.adminResponse?.actionTaken || '').replace(/"/g, '""')}"`,
      `"${(t.adminResponse?.officialNotes || t.facultyNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `TCC_Student_Feedback_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getPriorityBadge = (priority?: TicketPriority) => {
    switch (priority) {
      case 'urgent':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200 animate-pulse">
            <AlertTriangle className="w-3 h-3" />
            Urgent
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            High
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
            Medium
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
            Low
          </span>
        );
    }
  };

  const getStatusBadge = (status?: TicketStatus) => {
    switch (status) {
      case 'resolved':
      case 'addressed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Resolved
          </span>
        );
      case 'in_progress':
      case 'investigating':
      case 'reviewed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200">
            <Clock className="w-3.5 h-3.5" />
            In Progress
          </span>
        );
      case 'closed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-200 text-slate-700">
            Closed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
            <AlertCircle className="w-3.5 h-3.5" />
            Pending Review
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-sm border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/30 text-indigo-300 border border-indigo-500/40">
              Administrator Operations Center
            </span>
            <span className="text-slate-400 text-xs">• Issue Resolution Desk</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Student Feedback & Concern Monitoring
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Triage, assign responsible campus departments, track action timelines, and log official institutional resolutions to student complaints and recommendations.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            id="btn-export-admin-csv"
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all shadow-xs min-h-[40px]"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV Audit Log</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-slate-500 text-xs font-medium">Total Tickets</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{metrics.total}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Across all pillars</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-200/80 bg-amber-50/20 shadow-xs">
          <div className="text-amber-700 text-xs font-medium flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            Pending Action
          </div>
          <div className="text-2xl font-bold text-amber-700 mt-1">{metrics.pending}</div>
          <div className="text-[11px] text-amber-600/80 mt-0.5">Awaiting triage</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-indigo-200/80 bg-indigo-50/20 shadow-xs">
          <div className="text-indigo-700 text-xs font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            In Progress
          </div>
          <div className="text-2xl font-bold text-indigo-700 mt-1">{metrics.inProgress}</div>
          <div className="text-[11px] text-indigo-600/80 mt-0.5">Action ongoing</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-200/80 bg-emerald-50/20 shadow-xs">
          <div className="text-emerald-700 text-xs font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Resolved
          </div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">{metrics.resolved}</div>
          <div className="text-[11px] text-emerald-600/80 mt-0.5">Official action logged</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-rose-200/80 bg-rose-50/20 shadow-xs">
          <div className="text-rose-700 text-xs font-medium flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            Urgent Attention
          </div>
          <div className="text-2xl font-bold text-rose-700 mt-1">{metrics.urgent}</div>
          <div className="text-[11px] text-rose-600/80 mt-0.5">High SLA priority</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-slate-500 text-xs font-medium">Resolution Rate</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{metrics.resolutionRate}%</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">SLA target: &gt;80%</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-3">
        
        {/* Quick Tab Filters */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <button
              id="admin-tab-all"
              type="button"
              onClick={() => setActiveTabFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTabFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              All Submissions ({feedbacks.length})
            </button>
            <button
              id="admin-tab-unresolved"
              type="button"
              onClick={() => setActiveTabFilter('unresolved')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTabFilter === 'unresolved'
                  ? 'bg-amber-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Needs Attention ({metrics.pending + metrics.inProgress})
            </button>
            <button
              id="admin-tab-urgent"
              type="button"
              onClick={() => setActiveTabFilter('urgent')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTabFilter === 'urgent'
                  ? 'bg-rose-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Urgent Issues ({metrics.urgent})
            </button>
            <button
              id="admin-tab-resolved"
              type="button"
              onClick={() => setActiveTabFilter('resolved')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTabFilter === 'resolved'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Resolved ({metrics.resolved})
            </button>
          </div>

          <span className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-900">{filteredTickets.length}</strong> matching tickets
          </span>
        </div>

        {/* Dropdown Filters & Search */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {/* Search box */}
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="input-admin-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ticket #, keyword, student, room..."
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[38px]"
            />
          </div>

          {/* Category */}
          <div>
            <select
              id="select-admin-category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs px-2.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[38px]"
            >
              <option value="all">All Categories</option>
              <option value="services">School Services</option>
              <option value="facilities">Campus Facilities</option>
              <option value="activities">Student Activities</option>
              <option value="academics">Academics & Courses</option>
            </select>
          </div>

          {/* Department */}
          <div>
            <select
              id="select-admin-department"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full text-xs px-2.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[38px] truncate"
            >
              <option value="all">All Departments</option>
              {CAMPUS_DEPARTMENTS.map(d => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <select
              id="select-admin-status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full text-xs px-2.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[38px]"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending Review</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-3">
        {filteredTickets.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">No matching tickets found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search query, status, or category filter to inspect other student submissions.
            </p>
          </div>
        ) : (
          filteredTickets.map((ticket) => {
            const ticketNo = ticket.ticketNumber || ticket.id;
            const categoryLabel = ticket.category 
              ? (ticket.category.charAt(0).toUpperCase() + ticket.category.slice(1))
              : 'Academics';
            const isResolved = ticket.status === 'resolved' || ticket.status === 'addressed';

            return (
              <div
                key={ticket.id}
                id={`admin-ticket-card-${ticket.id}`}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 transition-all shadow-xs p-5 space-y-4"
              >
                {/* Card Top Row: Identifiers & Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
                      {ticketNo}
                    </span>
                    <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                      {categoryLabel}
                    </span>
                    {getPriorityBadge(ticket.priority)}
                    {getStatusBadge(ticket.status)}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {new Date(ticket.timestamp).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span>•</span>
                    <span>{ticket.isAnonymous ? 'Anonymous Student' : (ticket.studentName || 'Student')}</span>
                  </div>
                </div>

                {/* Title and Details */}
                <div className="space-y-2">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {ticket.title || ticket.strengths.slice(0, 60)}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                      <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="truncate">
                        <strong>Dept:</strong> {ticket.department || 'Office of Academic Affairs'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="truncate">
                        <strong>Target:</strong> {ticket.targetEntity || ticket.location || ticket.courseId || 'Campus-wide'}
                      </span>
                    </div>
                  </div>

                  {/* Concern / Improvement Text */}
                  <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-200/60 text-xs text-slate-700 space-y-1">
                    <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                      <span>Reported Concern / Recommendation:</span>
                    </div>
                    <p className="leading-relaxed">
                      {ticket.areasForImprovement || ticket.strengths}
                    </p>
                    {ticket.additionalComments && (
                      <p className="text-slate-500 italic mt-1 pt-1 border-t border-slate-200/50">
                        "{ticket.additionalComments}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Official Resolution Display if exists */}
                {ticket.adminResponse && (
                  <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-emerald-900">
                      <span className="flex items-center gap-1.5">
                        <FileCheck2 className="w-4 h-4 text-emerald-600" />
                        Official Administrative Resolution:
                      </span>
                      <span className="text-[11px] font-medium text-emerald-700">
                        Resolved by {ticket.adminResponse.resolvedBy}
                      </span>
                    </div>
                    <p className="text-emerald-950 font-medium leading-relaxed">
                      {ticket.adminResponse.actionTaken}
                    </p>
                    {ticket.adminResponse.officialNotes && (
                      <p className="text-emerald-800 text-[11px] mt-1 pt-1 border-t border-emerald-200/60">
                        <strong>Note:</strong> {ticket.adminResponse.officialNotes}
                      </p>
                    )}
                  </div>
                )}

                {/* Footer Controls: Assignee & Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-slate-400" />
                    <span>
                      Assigned: <strong>{ticket.assignedTo || 'Unassigned (General Pool)'}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      id={`btn-manage-ticket-${ticket.id}`}
                      type="button"
                      onClick={() => handleOpenResolverModal(ticket)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-xs min-h-[36px]"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>{isResolved ? 'Review / Edit Resolution' : 'Resolve & Update Ticket'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Resolution & Triage Modal */}
      {resolvingTicket && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-300 font-bold">
                    {resolvingTicket.ticketNumber || resolvingTicket.id}
                  </span>
                  <span className="text-xs text-slate-400">Resolution Desk</span>
                </div>
                <h3 className="text-base font-bold text-white mt-1 line-clamp-1">
                  {resolvingTicket.title || resolvingTicket.strengths.slice(0, 50)}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setResolvingTicket(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveResolution} className="p-6 space-y-4 overflow-y-auto flex-1">
              
              {/* Ticket Quick Context */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="text-slate-500">Student Submission:</div>
                <p className="text-slate-800 font-medium">
                  {resolvingTicket.areasForImprovement || resolvingTicket.strengths}
                </p>
                <div className="text-[11px] text-slate-400 pt-1 flex items-center justify-between">
                  <span>Target: {resolvingTicket.targetEntity || resolvingTicket.location || 'General Campus'}</span>
                  <span>Submitted: {new Date(resolvingTicket.timestamp).toLocaleString()}</span>
                </div>
              </div>

              {/* Status and Priority Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Update Resolution Status *
                  </label>
                  <select
                    id="modal-select-status"
                    value={modalStatus}
                    onChange={(e) => setModalStatus(e.target.value as TicketStatus)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[40px]"
                  >
                    <option value="pending">Pending Review</option>
                    <option value="investigating">Under Investigation</option>
                    <option value="in_progress">In Progress / Action Ongoing</option>
                    <option value="resolved">Resolved / Action Taken</option>
                    <option value="closed">Closed / Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Priority Level *
                  </label>
                  <select
                    id="modal-select-priority"
                    value={modalPriority}
                    onChange={(e) => setModalPriority(e.target.value as TicketPriority)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[40px]"
                  >
                    <option value="low">Low (Routine)</option>
                    <option value="medium">Medium (Standard)</option>
                    <option value="high">High (Urgent Attention)</option>
                    <option value="urgent">Urgent (Immediate Safety/Outage)</option>
                  </select>
                </div>
              </div>

              {/* Department and Assignee */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Assigned Campus Department
                  </label>
                  <select
                    id="modal-select-department"
                    value={modalDepartment}
                    onChange={(e) => setModalDepartment(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[40px]"
                  >
                    {CAMPUS_DEPARTMENTS.map(d => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Officer / Person In Charge
                  </label>
                  <input
                    id="modal-input-assigned"
                    type="text"
                    value={modalAssignedTo}
                    onChange={(e) => setModalAssignedTo(e.target.value)}
                    placeholder="e.g., Engr. David Bautista (IT Network)"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[40px]"
                  />
                </div>
              </div>

              {/* Action Taken (Visible to student) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                  <span>Official Action Taken / Resolution Summary</span>
                  <span className="text-[11px] font-normal text-indigo-600">Visible to student in Ticket Tracker</span>
                </label>
                <textarea
                  id="modal-textarea-action"
                  rows={3}
                  value={modalActionTaken}
                  onChange={(e) => setModalActionTaken(e.target.value)}
                  placeholder="Describe concrete steps taken to investigate or resolve this issue (e.g., 'Replaced AP-302 hardware, verified 100 Mbps signal across floor 3')..."
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y"
                />
              </div>

              {/* Internal / Administrative Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Internal Administrative / Maintenance Notes
                </label>
                <textarea
                  id="modal-textarea-notes"
                  rows={2}
                  value={modalOfficialNotes}
                  onChange={(e) => setModalOfficialNotes(e.target.value)}
                  placeholder="Work order IDs, vendor contact info, scheduled preventative dates..."
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y"
                />
              </div>

              {/* Action Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setResolvingTicket(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  id="btn-save-resolution"
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Save & Record Action</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
