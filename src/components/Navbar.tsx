import React from 'react';
import { 
  GraduationCap, 
  PenTool, 
  BarChart3, 
  MessageSquareText, 
  BookOpen, 
  RotateCcw,
  ShieldCheck,
  Clock,
  ShieldAlert,
  UserCheck,
  CheckCircle2,
  Building2,
  Info
} from 'lucide-react';
import { NavigationTab, UserRole } from '../types';

interface NavbarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  userRole: UserRole;
  onToggleRole: (role: UserRole) => void;
  onResetData: () => void;
  feedbackCount: number;
  pendingAdminCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  userRole,
  onToggleRole,
  onResetData,
  feedbackCount,
  pendingAdminCount = 0
}) => {
  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo & Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-indigo-800 flex items-center justify-center text-white shadow-sm shadow-indigo-200">
                <GraduationCap className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none">
                    Student Feedback System
                  </h1>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Online Portal
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block mt-0.5">
                  Torres Capitol College • Services, Facilities, Activities & Academics
                </p>
              </div>
            </div>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200/60" aria-label="Main Navigation">
              
              {/* Submit Feedback */}
              <button
                id="nav-tab-submit"
                type="button"
                onClick={() => onSelectTab('submit')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'submit'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Submit Feedback</span>
              </button>

              {/* Track Issue / Concerns */}
              <button
                id="nav-tab-track"
                type="button"
                onClick={() => onSelectTab('track')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'track'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Track Issues</span>
              </button>

              {/* Administrator Resolution Desk */}
              <button
                id="nav-tab-admin-resolver"
                type="button"
                onClick={() => {
                  onSelectTab('admin_resolver');
                  if (userRole !== 'admin') onToggleRole('admin');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                  activeTab === 'admin_resolver'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-700 hover:text-indigo-700 hover:bg-indigo-50/50'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Resolution Desk</span>
                {pendingAdminCount > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    activeTab === 'admin_resolver' 
                      ? 'bg-rose-500 text-white' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {pendingAdminCount}
                  </span>
                )}
              </button>

              {/* Submissions & Voice */}
              <button
                id="nav-tab-feedback-list"
                type="button"
                onClick={() => onSelectTab('feedback_list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'feedback_list'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <MessageSquareText className="w-3.5 h-3.5" />
                <span>Submissions</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-semibold bg-slate-200/80 text-slate-700">
                  {feedbackCount}
                </span>
              </button>

              {/* Analytics */}
              <button
                id="nav-tab-analytics"
                type="button"
                onClick={() => onSelectTab('analytics')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'analytics'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Analytics</span>
              </button>

              {/* Courses */}
              <button
                id="nav-tab-courses"
                type="button"
                onClick={() => onSelectTab('courses')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'courses'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Courses</span>
              </button>

              {/* About Torres Capitol College */}
              <button
                id="nav-tab-school-info"
                type="button"
                onClick={() => onSelectTab('school_info')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'school_info'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>About TCC</span>
              </button>
            </nav>

            {/* Header Right Actions: Role Toggle & Reset */}
            <div className="flex items-center gap-2">
              
              {/* Target Users 3-Way Role Switcher */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs shadow-2xs">
                <button
                  id="role-toggle-student"
                  type="button"
                  onClick={() => {
                    onToggleRole('student');
                    if (activeTab === 'admin_resolver') onSelectTab('submit');
                  }}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    userRole === 'student'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Switch to Student Persona"
                >
                  Student
                </button>

                <button
                  id="role-toggle-teacher"
                  type="button"
                  onClick={() => {
                    onToggleRole('teacher');
                    if (activeTab === 'submit') onSelectTab('feedback_list');
                  }}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    userRole === 'teacher' || userRole === 'faculty'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Switch to Teacher / Faculty Persona"
                >
                  Teacher
                </button>

                <button
                  id="role-toggle-admin"
                  type="button"
                  onClick={() => {
                    onToggleRole('admin');
                    onSelectTab('admin_resolver');
                  }}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    userRole === 'admin'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Switch to Administrator Persona"
                >
                  Admin
                </button>
              </div>

              {/* Reset Data Button */}
              <button
                id="btn-reset-data"
                type="button"
                onClick={onResetData}
                title="Reset to sample evaluation and complaint tickets"
                className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (5 tabs with 48px min touch targets) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-lg px-2 py-1">
        <div className="grid grid-cols-5 gap-1 max-w-lg mx-auto">
          
          <button
            id="mobile-nav-submit"
            type="button"
            onClick={() => onSelectTab('submit')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[11px] transition-colors touch-manipulation min-h-[48px] ${
              activeTab === 'submit'
                ? 'text-indigo-600 bg-indigo-50/80 font-bold'
                : 'text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <PenTool className="w-4 h-4 mb-0.5" />
            <span className="truncate">Submit</span>
          </button>

          <button
            id="mobile-nav-track"
            type="button"
            onClick={() => onSelectTab('track')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[11px] transition-colors touch-manipulation min-h-[48px] ${
              activeTab === 'track'
                ? 'text-indigo-600 bg-indigo-50/80 font-bold'
                : 'text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <Clock className="w-4 h-4 mb-0.5" />
            <span className="truncate">Track</span>
          </button>

          <button
            id="mobile-nav-admin"
            type="button"
            onClick={() => {
              onSelectTab('admin_resolver');
              onToggleRole('admin');
            }}
            className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[11px] transition-colors touch-manipulation min-h-[48px] ${
              activeTab === 'admin_resolver'
                ? 'text-indigo-600 bg-indigo-50/80 font-bold'
                : 'text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <ShieldAlert className="w-4 h-4 mb-0.5" />
            <span className="truncate">Resolve</span>
            {pendingAdminCount > 0 && (
              <span className="absolute top-1 right-2 w-3.5 h-3.5 text-[9px] font-bold bg-rose-600 text-white rounded-full flex items-center justify-center">
                {pendingAdminCount}
              </span>
            )}
          </button>

          <button
            id="mobile-nav-feedback-list"
            type="button"
            onClick={() => onSelectTab('feedback_list')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[11px] transition-colors touch-manipulation min-h-[48px] ${
              activeTab === 'feedback_list'
                ? 'text-indigo-600 bg-indigo-50/80 font-bold'
                : 'text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <MessageSquareText className="w-4 h-4 mb-0.5" />
            <span className="truncate">Submissions</span>
          </button>

          <button
            id="mobile-nav-analytics"
            type="button"
            onClick={() => onSelectTab('analytics')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[11px] transition-colors touch-manipulation min-h-[48px] ${
              activeTab === 'analytics'
                ? 'text-indigo-600 bg-indigo-50/80 font-bold'
                : 'text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <BarChart3 className="w-4 h-4 mb-0.5" />
            <span className="truncate">Analytics</span>
          </button>

        </div>
      </div>
    </>
  );
};
