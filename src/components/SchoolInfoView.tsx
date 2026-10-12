import React from 'react';
import { 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  GraduationCap, 
  BookOpen, 
  ShieldCheck, 
  Award, 
  Users, 
  ExternalLink,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Briefcase,
  FileText,
  Download,
  Printer
} from 'lucide-react';
import { CAMPUS_DEPARTMENTS, COURSES } from '../data/initialData';
import tccCampusQuadImg from '../assets/images/tcc_campus_quad_1791375651163.jpg';

interface SchoolInfoViewProps {
  onNavigateToFeedback: () => void;
  onNavigateToCourse: (courseId: string) => void;
  onOpenResearchPaper?: () => void;
}

export const SchoolInfoView: React.FC<SchoolInfoViewProps> = ({
  onNavigateToFeedback,
  onNavigateToCourse,
  onOpenResearchPaper
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Editorial Campus Banner with High-Fidelity Photograph */}
      <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs">
        <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-900">
          <img
            src={tccCampusQuadImg}
            alt="Torres Capitol College Campus Academic Hall and Quadrangle"
            loading="eager"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== '/images/tcc_campus_quad.jpg') {
                target.src = '/images/tcc_campus_quad.jpg';
              }
            }}
            className="w-full h-full object-cover object-center brightness-95 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider">
              <span>Sayre Highway, Panadtalan, Maramag, Bukidnon 8714</span>
              <span aria-hidden="true">·</span>
              <span>CHED & TESDA Accredited</span>
            </div>
            <h1 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-white">
              Torres Capitol College, Inc.
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl line-clamp-2">
              Formerly Philippine Countryville College (philcountryville.com). A premier higher education institution in Southern Bukidnon dedicated to academic excellence, hands-on technical competence, and community transformation.
            </p>
          </div>
        </div>

        {/* Quick Institutional Action Bar */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-slate-600">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Maramag, Bukidnon</span>
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>CHED Recognized</span>
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-mono-numbers">(088) 356-1188</span>
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="https://philcountryville.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 hover:bg-slate-100 font-medium text-xs inline-flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>philcountryville.com</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <button
              type="button"
              onClick={onNavigateToFeedback}
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs inline-flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            >
              <span>Submit Feedback</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xs uppercase tracking-wider">
            <Award className="w-4 h-4 text-indigo-600" />
            <span>Institutional Vision</span>
          </div>
          <h2 className="font-display text-lg font-semibold text-slate-900">
            Leading Center of Learning in Southern Bukidnon
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            "Divine providence as its guiding principle, the institution envisions to be the leading non-sectarian and community-oriented educational institution in Southern Bukidnon, dedicating itself to the service of the community, country, and God, with steadfast adherence to academic freedom, competitive instruction, scholarships, goodwill, and Christian values."
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xs uppercase tracking-wider">
            <Users className="w-4 h-4 text-indigo-600" />
            <span>Institutional Mission</span>
          </div>
          <h2 className="font-display text-lg font-semibold text-slate-900">
            Accessible, Quality & Empowering Instruction
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            "Committed to providing quality and affordable higher education, thereby enhancing the ability of graduates to improve social and economic well-being; transforming students into competent, diligent, and morally upright professionals through dedicated teaching staff and responsible technical resources."
          </p>
        </div>
      </div>

      {/* Academic Colleges & Programs */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-xs font-mono-numbers text-indigo-600 font-semibold uppercase tracking-wider">
            Academic Offerings
          </span>
          <h2 className="font-display text-lg font-semibold text-slate-900 mt-0.5">
            Collegiate Programs & Disciplines
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-2">
            <div className="font-semibold text-xs text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>College of Information Technology</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              BS in Information Technology (BSIT). Specialized in Software Engineering, Computer Networking, Systems Administration, and Database Architectures.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-2">
            <div className="font-semibold text-xs text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-slate-700" />
              <span>College of Criminology & Public Safety</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              BS in Criminology (BS Crim). Forensics investigation, criminal law, law enforcement administration, and defense tactics.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-2">
            <div className="font-semibold text-xs text-slate-900 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span>College of Business Administration</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              BS in Business Administration (BSBA). Financial Management, Marketing Strategy, Entrepreneurship, and Organizational Leadership.
            </p>
          </div>
        </div>
      </div>

      {/* Student Charter of Rights & Complaint Guarantees */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-xs font-mono-numbers text-indigo-600 font-semibold uppercase tracking-wider">
            Student Protection Policy
          </span>
          <h2 className="font-display text-lg font-semibold text-slate-900 mt-0.5">
            Student Feedback & Grievance Guarantees
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="space-y-1">
            <strong className="text-slate-900 block font-semibold">1. Right to Confidentiality</strong>
            <p className="leading-relaxed">
              Evaluations and reported concerns may be submitted anonymously without retaliation or academic penalization.
            </p>
          </div>

          <div className="space-y-1">
            <strong className="text-slate-900 block font-semibold">2. Mandatory Triage SLA</strong>
            <p className="leading-relaxed">
              Every logged ticket is cataloged and assigned to the relevant department head within 24 to 72 operational hours.
            </p>
          </div>

          <div className="space-y-1">
            <strong className="text-slate-900 block font-semibold">3. Transparent Closure</strong>
            <p className="leading-relaxed">
              Students receive a permanent tracking code to review verified institutional remediation actions and official remarks.
            </p>
          </div>
        </div>
      </div>

      {/* Department Contacts Directory */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono-numbers text-indigo-600 font-semibold uppercase tracking-wider">
              Directory
            </span>
            <h2 className="font-display text-lg font-semibold text-slate-900 mt-0.5">
              Key Campus Departments & Officers
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {CAMPUS_DEPARTMENTS.map((dept) => (
            <div key={dept.id} className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/40 space-y-1.5 text-xs">
              <div className="font-semibold text-slate-900">
                {dept.name}
              </div>
              <div className="text-slate-600">
                Lead: <strong className="text-slate-800">{dept.head}</strong>
              </div>
              <div className="text-slate-500 text-[11px] font-mono-numbers truncate">
                {dept.email}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Academic Research Paper & Capstone Documentation Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-sm border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-400/20 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" />
              <span>Capstone Project & Research Publication</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
              Academic Research Paper Files
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              "Development and Implementation of a Web-Based Student Feedback and Resolution Tracking System for Torres Capitol College" — Complete 5-Chapter manuscript evaluated under ISO/IEC 25010 (Grand Mean = 4.88).
            </p>
          </div>

          {onOpenResearchPaper && (
            <button
              type="button"
              onClick={onOpenResearchPaper}
              className="px-4 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-semibold text-xs inline-flex items-center gap-2 transition-all shadow-sm shrink-0 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-indigo-700" />
              <span>Open Paper Hub</span>
            </button>
          )}
        </div>

        {/* Download Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Word Document */}
          <a
            href="/Torres_Capitol_College_Student_Feedback_System_Research_Paper.doc"
            download="Torres_Capitol_College_Student_Feedback_System_Research_Paper.doc"
            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-400/50 hover:bg-white/10 transition-all flex flex-col justify-between gap-3 group text-left"
          >
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold text-xs">
                DOC
              </span>
              <Download className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
            </div>
            <div>
              <div className="font-semibold text-white text-xs sm:text-sm">
                Word Document (.doc)
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Full 5-chapter paper formatted for MS Word & Google Docs
              </div>
            </div>
          </a>

          {/* Markdown File */}
          <a
            href="/Torres_Capitol_College_Student_Feedback_System_Research_Paper.md"
            download="Torres_Capitol_College_Student_Feedback_System_Research_Paper.md"
            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-slate-400/50 hover:bg-white/10 transition-all flex flex-col justify-between gap-3 group text-left"
          >
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-slate-500/20 text-slate-300 flex items-center justify-center font-bold text-xs">
                MD
              </span>
              <Download className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
            </div>
            <div>
              <div className="font-semibold text-white text-xs sm:text-sm">
                Markdown Source (.md)
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Plain-text raw manuscript for repository and Git
              </div>
            </div>
          </a>

          {/* HTML / Print View */}
          <a
            href="/RESEARCH_PAPER.html"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-400/50 hover:bg-white/10 transition-all flex flex-col justify-between gap-3 group text-left"
          >
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs">
                PDF
              </span>
              <Printer className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
            </div>
            <div>
              <div className="font-semibold text-white text-xs sm:text-sm">
                Print & Save as PDF
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Opens print view — press Ctrl+P / Cmd+P to export PDF
              </div>
            </div>
          </a>
        </div>

        <div className="text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10">
          <span>Author: <strong>Joshua Entrina</strong> · Torres Capitol College, Maramag, Bukidnon</span>
          <span>Includes Abstract, Chapters 1-5, ISO 25010 Results, and APA References</span>
        </div>
      </div>

    </div>
  );
};
