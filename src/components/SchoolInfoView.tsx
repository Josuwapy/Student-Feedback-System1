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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-in fade-in duration-200">
      
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-blue-950 to-slate-950 text-white p-6 sm:p-10 shadow-xl border border-indigo-800/40">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Institution Profile & Resources</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Torres Capitol College, Inc.
          </h1>

          <p className="text-sm sm:text-base text-indigo-200/90 leading-relaxed">
            Formerly Philippine Countryville College, TCC is a leading educational institution in Southern Bukidnon, committed to providing accessible, high-quality instruction in Information Technology, Criminology, Business Administration, Basic Education, and TESDA skills training.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs sm:text-sm text-indigo-100">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Sayre Highway, Panadtalan, Maramag, Bukidnon 8714</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>philippinecountryvillecollege@gmail.com</span>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-3">
            <a
              href="https://philcountryville.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white text-indigo-950 hover:bg-indigo-50 font-bold text-xs inline-flex items-center gap-2 transition-all shadow-md"
            >
              <Globe className="w-4 h-4 text-indigo-600" />
              <span>Visit philcountryville.com</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <button
              type="button"
              onClick={onNavigateToFeedback}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs inline-flex items-center gap-2 transition-all shadow-md"
            >
              <span>Submit Student Voice / Report</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Decorative corner glow */}
        <div className="absolute -right-12 -bottom-12 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-12 top-6 opacity-10 hidden md:block">
          <GraduationCap className="w-64 h-64 text-white" />
        </div>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Institutional Vision</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900">Leading Center of Learning in Southern Bukidnon</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            "Divine providence as its guiding principle, the institution envisions to be the leading non-sectarian and community-oriented educational institution in Southern Bukidnon, dedicating itself to the service of the community, country and God, with adherence to academic freedom, competitive instruction, scholarships, goodwill, and desirable Christian values."
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>Institutional Mission</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900">Accessible & Empowering Education</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Committed to providing quality and affordable education, thereby enhancing the ability of its graduates to improve their social and economic well-being; transforming students into competent, diligent, and morally upright professionals through dedicated teaching staff and responsible technical resources.
          </p>
        </div>
      </div>

      {/* Degree Programs & Academics */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Academic Programs</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Higher Education & Curricula</h2>
          </div>
          <span className="text-xs text-slate-500">CHED & DepEd Recognized</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between hover:border-indigo-300 transition-all">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                IT
              </div>
              <h3 className="text-sm font-bold text-slate-900">BS in Information Technology (BSIT)</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Programming, Web Systems & Technologies, Networking, Database Management, and Capstone Systems Development.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-indigo-600">4-Year Degree</span>
              <span className="text-slate-400">Maramag Campus</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between hover:border-indigo-300 transition-all">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                CRIM
              </div>
              <h3 className="text-sm font-bold text-slate-900">BS in Criminology (BSCrim)</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Law enforcement administration, criminalistics & forensics, criminal jurisprudence, defense tactics, and correctional science.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">4-Year Degree</span>
              <span className="text-slate-400">Board Exam Track</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between hover:border-indigo-300 transition-all">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                BA
              </div>
              <h3 className="text-sm font-bold text-slate-900">BS in Business Administration (BSBA)</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Financial management, marketing strategies, human resource development, and local entrepreneurship.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-amber-700">4-Year Degree</span>
              <span className="text-slate-400">Corporate Track</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between hover:border-indigo-300 transition-all">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                ACT
              </div>
              <h3 className="text-sm font-bold text-slate-900">Associate in Computer Tech (ACT) & TESDA</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                2-year computer technology diploma, technical vocational livelihood training, and TESDA competency assessments.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-700">2-Year Diploma</span>
              <span className="text-slate-400">TESDA NC II / III</span>
            </div>
          </div>
        </div>
      </div>

      {/* College Administration, Services & Facilities */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Campus Units & Personnel</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Administrative Offices & Responsible Officers</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            These are the units and staff responsible for triaging and resolving concerns submitted through this feedback system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CAMPUS_DEPARTMENTS.map((dept) => (
            <div 
              key={dept.id} 
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 mb-1.5">
                    {dept.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{dept.name}</h3>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                {dept.description}
              </p>

              <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Head / Officer:</span>
                  <span className="font-semibold text-slate-800">{dept.head}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Official Email:</span>
                  <span className="font-mono text-[11px] text-indigo-600">{dept.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Courses Open for Feedback */}
      <div className="bg-slate-100 rounded-3xl p-6 sm:p-8 space-y-4 border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Active Course Subjects</span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Curriculum Open for Student Feedback</h2>
          </div>
          <button
            type="button"
            onClick={onNavigateToFeedback}
            className="text-xs font-bold text-indigo-700 hover:text-indigo-900 underline"
          >
            Submit an Evaluation Now →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {COURSES.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                    {course.code}
                  </span>
                  <span className="text-[11px] text-slate-400">{course.credits} Credits</span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">{course.name}</h3>
                <p className="text-[11px] text-slate-500 mt-1">Instructor: {course.instructor}</p>
                <p className="text-[10px] text-slate-400">{course.instructorTitle}</p>
              </div>

              <button
                type="button"
                onClick={() => onNavigateToCourse(course.id)}
                className="w-full py-1.5 px-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1"
              >
                <span>Evaluate Instructor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
