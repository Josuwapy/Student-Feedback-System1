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
      resolvedBy: modalAssignedTo.trim() || 'TCC Institutional Quality Desk',
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

  // Metrics calculation with tabular numerals
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Editorial Header */}
      <div className="border-b border-slate-200/90 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Torres Capitol College</span>
            <span aria-hidden="true">·</span>
            <span>Administrative Governance & Triage</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
            Institutional Resolution Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Administrative queue for assigning department leads, conducting facility audits, updating resolution milestones, and issuing official closures.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCSV}
          className="px-4 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-medium text-xs inline-flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Export Audit Log (CSV)</span>
        </button>
      </div>

      {/* SLA & Metric Overview Bar with Tabular Figures */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500">Total in Registry</span>
          <div className="text-2xl font-bold font-mono-numbers text-slate-900">
            {metrics.total}
          </div>
          <span className="text-[11px] text-slate-400">All submissions logged</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500">Pending Triage</span>
          <div className="text-2xl font-bold font-mono-numbers text-amber-700">
            {metrics.pending}
          </div>
          <span className="text-[11px] text-slate-400">Awaiting assignment</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500">In Active Remediation</span>
          <div className="text-2xl font-bold font-mono-numbers text-indigo-700">
            {metrics.inProgress}
          </div>
          <span className="text-[11px] text-slate-400">Investigation underway</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500">Urgent Backlog</span>
          <div className="text-2xl font-bold font-mono-numbers text-rose-700">
            {metrics.urgent}
          </div>
          <span className="text-[11px] text-slate-400">&lt; 24h SLA response</span>
        </div>

        <div className="col-span-2 lg:col-span-1 bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500">Resolution Rate</span>
          <div className="text-2xl font-bold font-mono-numbers text-emerald-700">
            {metrics.resolutionRate}%
          </div>
          <span className="text-[11px] text-slate-400 font-mono-numbers">{metrics.resolved} of {metrics.total} resolved</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs space-y-4">
        
        {/* Segmented Filter Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200/70 text-xs">
            {[
              { id: 'all', label: 'All Queue' },
              { id: 'unresolved', label: 'Unresolved' },
              { id: 'urgent', label: 'Urgent Backlog' },
              { id: 'resolved', label: 'Resolved Closed' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTabFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                  activeTabFilter === tab.id
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-500 font-mono-numbers">
            Showing {filteredTickets.length} of {feedbacks.length} records
          </span>
        </div>

        {/* Dropdowns & Search */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ticket #, department, keyword, or student..."
              className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>

          <div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full text-xs py-2 px-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            >
              <option value="all">All Departments</option>
              {CAMPUS_DEPARTMENTS.map(d => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full text-xs py-2 px-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="investigating">Investigating</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>

      </div>

      {/* Tickets Table / List */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-3 px-4">Ticket</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Subject & Department</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Assigned Lead</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="font-mono-numbers font-semibold text-slate-900">
                        {ticket.ticketNumber || ticket.id}
                      </span>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap text-slate-500 font-mono-numbers">
                      {new Date(ticket.timestamp).toLocaleDateString()}
                    </td>

                    <td className="py-3 px-4 max-w-xs">
                      <div className="font-semibold text-slate-900 line-clamp-1">
                        {ticket.title || ticket.strengths}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {ticket.department || 'Academic Affairs'}
                      </div>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`capitalize font-medium ${
                        ticket.priority === 'urgent' ? 'text-rose-700 font-bold' :
                        ticket.priority === 'high' ? 'text-amber-700 font-semibold' :
                        'text-slate-700'
                      }`}>
                        {ticket.priority || 'medium'}
                      </span>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`capitalize font-medium ${
                        ticket.status === 'resolved' || ticket.status === 'addressed' ? 'text-emerald-700 font-semibold' :
                        ticket.status === 'in_progress' || ticket.status === 'investigating' ? 'text-amber-700 font-semibold' :
                        'text-slate-700'
                      }`}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap text-slate-600">
                      {ticket.assignedTo || ticket.adminResponse?.resolvedBy || (
                        <span className="text-slate-400 italic">Unassigned</span>
                      )}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap text-right">
                      <button
                        type="button"
                        onClick={() => handleOpenResolverModal(ticket)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors cursor-pointer shadow-2xs"
                      >
                        Triage & Resolve
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No tickets match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resolver / Triage Modal */}
      {resolvingTicket && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl max-w-2xl w-full p-6 space-y-6 animate-in fade-in duration-150">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-mono-numbers text-indigo-600 font-semibold uppercase tracking-wider">
                  Triage Protocol · {resolvingTicket.ticketNumber || resolvingTicket.id}
                </span>
                <h3 className="font-display text-lg font-semibold text-slate-900 mt-0.5">
                  Update Investigation & Official Resolution
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setResolvingTicket(null)}
                className="text-slate-400 hover:text-slate-600 text-sm p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Ticket Snapshot */}
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/70 text-xs space-y-1">
              <div className="font-semibold text-slate-900">
                {resolvingTicket.title || resolvingTicket.strengths}
              </div>
              <p className="text-slate-600 line-clamp-2">
                {resolvingTicket.areasForImprovement || resolvingTicket.strengths}
              </p>
              <div className="flex items-center gap-3 text-slate-500 pt-1">
                <span>Dept: <strong>{resolvingTicket.department}</strong></span>
                <span aria-hidden="true">·</span>
                <span>Submitted by: <strong>{resolvingTicket.isAnonymous ? 'Protected Anonymous' : resolvingTicket.studentName}</strong></span>
              </div>
            </div>

            <form onSubmit={handleSaveResolution} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    Status State
                  </label>
                  <select
                    value={modalStatus}
                    onChange={(e) => setModalStatus(e.target.value as TicketStatus)}
                    className="w-full py-2 px-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  >
                    <option value="pending">Pending</option>
                    <option value="investigating">Investigating</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    Priority Level
                  </label>
                  <select
                    value={modalPriority}
                    onChange={(e) => setModalPriority(e.target.value as TicketPriority)}
                    className="w-full py-2 px-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    Assign Lead Officer
                  </label>
                  <input
                    type="text"
                    value={modalAssignedTo}
                    onChange={(e) => setModalAssignedTo(e.target.value)}
                    placeholder="e.g. Engr. Jayson Baluyos"
                    className="w-full py-2 px-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Remediation Action Taken (Institutional Record)
                </label>
                <input
                  type="text"
                  value={modalActionTaken}
                  onChange={(e) => setModalActionTaken(e.target.value)}
                  placeholder="e.g. Replaced capacitor on Aircon Unit Rm 204; scheduled weekly preventive check"
                  className="w-full py-2 px-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Official Closure Notes & Remarks (Visible to Student)
                </label>
                <textarea
                  rows={3}
                  value={modalOfficialNotes}
                  onChange={(e) => setModalOfficialNotes(e.target.value)}
                  placeholder="Explain findings, follow-up schedule, or university policy adjustments made..."
                  className="w-full py-2 px-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setResolvingTicket(null)}
                  className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold cursor-pointer shadow-2xs"
                >
                  Commit Resolution & Update Registry
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
