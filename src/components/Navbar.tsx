import React from 'react';
import { 
  GraduationCap, 
  RotateCcw,
  Sparkles,
  Inbox,
  PenLine,
  Search,
  BarChart3,
  BookOpen,
  Building2,
  ShieldCheck
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
      {/* Top Header strictly adhering to Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Zone 1: Single text element Brand Wordmark */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onSelectTab('submit')}
                className="flex items-center gap-2.5 text-left text-slate-900 hover:text-indigo-950 transition-colors group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-2xs group-hover:bg-indigo-900 transition-colors">
                  <GraduationCap className="w-5 h-5 text-amber-300" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-semibold text-base sm:text-lg tracking-tight leading-none text-slate-900">
                    Torres Capitol College
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 tracking-normal mt-0.5">
                    Student Feedback & Resolution Portal
                  </span>
                </div>
              </button>
            </div>

            {/* Zone 2: Navigation Links (Clean text with subtle indicators) */}
            <nav className="hidden xl:flex items-center gap-1 text-xs font-medium" aria-label="Main Navigation">
              
              <button
                id="nav-tab-submit"
                type="button"
                onClick={() => onSelectTab('submit')}
                className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'submit'
                    ? 'bg-slate-100 text-slate-900 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Submit Feedback
              </button>

              <button
                id="nav-tab-track"
                type="button"
                onClick={() => onSelectTab('track')}
                className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'track'
                    ? 'bg-slate-100 text-slate-900 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Track Tickets
              </button>

              <button
                id="nav-tab-admin-resolver"
                type="button"
                onClick={() => {
                  onSelectTab('admin_resolver');
                  if (userRole !== 'admin') onToggleRole('admin');
                }}
                className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap inline-flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'admin_resolver'
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>Resolution Desk</span>
                {pendingAdminCount > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono-numbers font-semibold ${
                    activeTab === 'admin_resolver' 
                      ? 'bg-white/20 text-white' 
                      : 'bg-amber-100 text-amber-900'
                  }`}>
                    {pendingAdminCount}
                  </span>
                )}
              </button>

              <button
                id="nav-tab-feedback-list"
                type="button"
                onClick={() => onSelectTab('feedback_list')}
                className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap inline-flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'feedback_list'
                    ? 'bg-slate-100 text-slate-900 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>Submissions</span>
                <span className="text-[10px] text-slate-400 font-mono-numbers">
                  ({feedbackCount})
                </span>
              </button>

              <button
                id="nav-tab-analytics"
                type="button"
                onClick={() => onSelectTab('analytics')}
                className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'analytics'
                    ? 'bg-slate-100 text-slate-900 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Analytics
              </button>

              <button
                id="nav-tab-courses"
                type="button"
                onClick={() => onSelectTab('courses')}
                className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'courses'
                    ? 'bg-slate-100 text-slate-900 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Curriculum
              </button>

              <button
                id="nav-tab-school-info"
                type="button"
                onClick={() => onSelectTab('school_info')}
                className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'school_info'
                    ? 'bg-slate-100 text-slate-900 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                About TCC
              </button>
            </nav>

            {/* Zone 3: Actions & Role Persona Switcher */}
            <div className="flex items-center gap-2">
              
              {/* Target Users Role Switcher */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/80 text-xs">
                <button
                  id="role-toggle-student"
                  type="button"
                  onClick={() => {
                    onToggleRole('student');
                    if (activeTab === 'admin_resolver') onSelectTab('submit');
                  }}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    userRole === 'student'
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
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
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    userRole === 'teacher' || userRole === 'faculty'
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Switch to Teacher / Faculty Persona"
                >
                  Faculty
                </button>

                <button
                  id="role-toggle-admin"
                  type="button"
                  onClick={() => {
                    onToggleRole('admin');
                    onSelectTab('admin_resolver');
                  }}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    userRole === 'admin'
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
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
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200/80 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Bar */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-lg px-2 py-1">
        <div className="grid grid-cols-5 gap-1 max-w-lg mx-auto">
          
          <button
            type="button"
            onClick={() => onSelectTab('submit')}
            className={`min-h-[48px] flex flex-col items-center justify-center rounded-lg transition-colors ${
              activeTab === 'submit' ? 'text-indigo-600 font-semibold' : 'text-slate-500'
            }`}
          >
            <PenLine className="w-4 h-4" />
            <span className="text-[10px] mt-0.5 whitespace-nowrap">Feedback</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('track')}
            className={`min-h-[48px] flex flex-col items-center justify-center rounded-lg transition-colors ${
              activeTab === 'track' ? 'text-indigo-600 font-semibold' : 'text-slate-500'
            }`}
          >
            <Search className="w-4 h-4" />
            <span className="text-[10px] mt-0.5 whitespace-nowrap">Track</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onSelectTab('admin_resolver');
              if (userRole !== 'admin') onToggleRole('admin');
            }}
            className={`min-h-[48px] flex flex-col items-center justify-center rounded-lg transition-colors ${
              activeTab === 'admin_resolver' ? 'text-indigo-600 font-semibold' : 'text-slate-500'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] mt-0.5 whitespace-nowrap">Resolver</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('analytics')}
            className={`min-h-[48px] flex flex-col items-center justify-center rounded-lg transition-colors ${
              activeTab === 'analytics' ? 'text-indigo-600 font-semibold' : 'text-slate-500'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span className="text-[10px] mt-0.5 whitespace-nowrap">Analytics</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('courses')}
            className={`min-h-[48px] flex flex-col items-center justify-center rounded-lg transition-colors ${
              activeTab === 'courses' ? 'text-indigo-600 font-semibold' : 'text-slate-500'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-[10px] mt-0.5 whitespace-nowrap">Curriculum</span>
          </button>

        </div>
      </div>
    </>
  );
};
