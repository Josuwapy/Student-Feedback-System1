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
  Briefcase
} from 'lucide-react';
import { CAMPUS_DEPARTMENTS, COURSES } from '../data/initialData';

interface SchoolInfoViewProps {
  onNavigateToFeedback: () => void;
  onNavigateToCourse: (courseId: string) => void;
}

export const SchoolInfoView: React.FC<SchoolInfoViewProps> = ({
  onNavigateToFeedback,
  onNavigateToCourse
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Editorial Campus Banner with High-Fidelity Photograph */}
      <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs">
        <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-900">
          <img
            src="/src/assets/images/tcc_campus_quad_1791375651163.jpg"
            alt="Torres Capitol College Campus Academic Hall and Quadrangle"
            referrerPolicy="no-referrer"
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

    </div>
  );
};
