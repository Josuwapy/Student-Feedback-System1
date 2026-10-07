import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Send, 
  Shield, 
  Sparkles, 
  ThumbsUp, 
  AlertCircle, 
  User, 
  HelpCircle,
  GraduationCap,
  BookOpen,
  Clock,
  CheckCircle,
  MessageSquare,
  ArrowRight,
  Building2,
  Wifi,
  Users,
  AlertTriangle,
  Lightbulb,
  Award,
  FileSpreadsheet,
  MapPin,
  Copy,
  Check,
  Star,
  Printer,
  RotateCcw
} from 'lucide-react';
import { Course, EvaluationCriteria, FeedbackSubmission, FeedbackCategory, FeedbackNature, TicketPriority } from '../types';
import { EVALUATION_CRITERIA, FEEDBACK_TAGS, CAMPUS_DEPARTMENTS } from '../data/initialData';
import { StarRating } from './StarRating';
import studentCollabImg from '../assets/images/student_study_collaboration_1791375662629.jpg';

interface StudentFeedbackFormProps {
  courses: Course[];
  selectedCourseId?: string;
  onSelectCourse?: (id: string) => void;
  onSubmitFeedback: (feedback: Omit<FeedbackSubmission, 'id' | 'timestamp' | 'helpfulCount' | 'status'>) => void;
  onNavigateToAnalytics: () => void;
  onNavigateToReviews: () => void;
  onNavigateToTrack?: (ticketId: string) => void;
}

const CRITERIA_ICONS: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="w-5 h-5 text-indigo-600" />,
  BookOpen: <BookOpen className="w-5 h-5 text-blue-600" />,
  Clock: <Clock className="w-5 h-5 text-amber-600" />,
  CheckCircle: <CheckCircle className="w-5 h-5 text-emerald-600" />,
  MessageSquare: <MessageSquare className="w-5 h-5 text-purple-600" />
};

export const StudentFeedbackForm: React.FC<StudentFeedbackFormProps> = ({
  courses,
  selectedCourseId: propCourseId,
  onSubmitFeedback,
  onNavigateToAnalytics,
  onNavigateToReviews,
  onNavigateToTrack
}) => {
  // Category and Nature Selection
  const [category, setCategory] = useState<FeedbackCategory>('services');
  const [feedbackNature, setFeedbackNature] = useState<FeedbackNature>('concern');
  const [priority, setPriority] = useState<TicketPriority>('medium');

  // Academic Course specific
  const [courseId, setCourseId] = useState<string>(propCourseId || courses[0]?.id || '');
  
  // Non-Academic Target Entity and Location
  const [department, setDepartment] = useState<string>('Office of the College Registrar');
  const [targetEntity, setTargetEntity] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  // Identification
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const [studentName, setStudentName] = useState<string>('');
  const [studentEmail, setStudentEmail] = useState<string>('');
  const [studentId, setStudentId] = useState<string>('');
  const [term] = useState<string>('1st Semester 2024-2025');

  // Ratings
  const [ratings, setRatings] = useState<Record<string, number>>({
    teaching_quality: 5,
    course_content: 4,
    workload_pace: 4,
    fairness_assessment: 4,
    instructor_support: 5
  });
  const [overallRating, setOverallRating] = useState<number>(4);
  const [recommendation, setRecommendation] = useState<'yes' | 'maybe' | 'no'>('yes');
  const [attendanceRate, setAttendanceRate] = useState<'always' | 'regular' | 'occasional'>('always');
  const [difficulty, setDifficulty] = useState<'easy' | 'moderate' | 'challenging' | 'very_difficult'>('moderate');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Helpful Staff', 'Digital Modernization']);

  // Feedback Content
  const [strengths, setStrengths] = useState<string>('');
  const [areasForImprovement, setAreasForImprovement] = useState<string>('');
  const [additionalComments, setAdditionalComments] = useState<string>('');

  // Submission State
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submittedTicketNumber, setSubmittedTicketNumber] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedCourse = courses.find((c) => c.id === courseId);

  const handleRatingChange = (criteriaId: string, val: number) => {
    const updated = { ...ratings, [criteriaId]: val };
    setRatings(updated);
    const values = Object.values(updated) as number[];
    const avg = Math.round(values.reduce((a: number, b: number) => a + b, 0) / values.length);
    setOverallRating(avg);
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (category === 'academics' && !courseId) {
      setErrorMessage('Please select a course to evaluate.');
      return;
    }

    if (!title.trim() && !strengths.trim() && !areasForImprovement.trim()) {
      setErrorMessage('Please provide a subject title and describe your feedback or concern.');
      return;
    }

    if (!isAnonymous && (!studentName.trim() || !studentEmail.trim())) {
      setErrorMessage('Please provide your name and institutional email or switch to Anonymous mode.');
      return;
    }

    // Generate random realistic ticket code
    const generatedTicketNumber = `TCC-2024-${Math.floor(1000 + Math.random() * 9000)}`;

    const resolvedDepartment = category === 'academics' 
      ? 'Office of Academic Affairs & Deans' 
      : department;

    const payload = {
      ticketNumber: generatedTicketNumber,
      category,
      feedbackNature,
      title: title.trim() || (category === 'academics' ? `${selectedCourse?.code} Evaluation` : `${department} Feedback`),
      department: resolvedDepartment,
      targetEntity: category === 'academics' ? `${selectedCourse?.code} - ${selectedCourse?.name}` : (targetEntity.trim() || department),
      location: location.trim() || (category === 'academics' ? 'Academic Building' : 'Campus Ground'),
      priority,
      courseId: category === 'academics' ? courseId : '',
      isAnonymous,
      studentName: isAnonymous ? undefined : studentName.trim(),
      studentEmail: isAnonymous ? undefined : studentEmail.trim(),
      studentId: isAnonymous ? undefined : studentId.trim(),
      term,
      ratings,
      overallRating,
      recommendation,
      strengths: strengths.trim() || 'No specific commendations noted.',
      areasForImprovement: areasForImprovement.trim() || title.trim() || 'Feedback submitted for institutional review.',
      additionalComments: additionalComments.trim() || undefined,
      selectedTags,
      attendanceRate,
      difficulty,
      assignedTo: undefined
    };

    onSubmitFeedback(payload);
    setSubmittedTicketNumber(generatedTicketNumber);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setTitle('');
    setStrengths('');
    setAreasForImprovement('');
    setAdditionalComments('');
    setTargetEntity('');
    setLocation('');
    setSubmittedTicketNumber('');
  };

  const handleCopyTicketCode = () => {
    if (submittedTicketNumber) {
      navigator.clipboard.writeText(submittedTicketNumber);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6 animate-in fade-in duration-200">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto text-emerald-600 border border-emerald-100">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              Registration Complete
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 mt-1">
              Feedback Successfully Dispatched
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto mt-2 leading-relaxed">
              Your submission has been cataloged in the institutional quality registry. Assigned faculty deans and office heads will investigate and take remediation action.
            </p>
          </div>

          {/* Ticket Number Badge */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 max-w-md mx-auto space-y-2 text-center shadow-md">
            <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
              Official Tracking Code
            </div>
            <div className="text-3xl font-mono-numbers font-bold text-white tracking-wider flex items-center justify-center gap-2">
              <span>{submittedTicketNumber}</span>
              <button
                type="button"
                onClick={handleCopyTicketCode}
                title="Copy tracking code"
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-300" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Save or screenshot this ticket number to follow resolution milestones and read official responses.
            </p>
          </div>

          {/* Summary Details */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/70 text-left max-w-md mx-auto space-y-2.5 text-xs">
            <div className="flex justify-between items-center text-slate-600">
              <span>Domain:</span>
              <span className="font-semibold text-slate-900 capitalize">{category}</span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span>Feedback Nature:</span>
              <span className="font-semibold text-slate-900 capitalize">{feedbackNature}</span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span>Target Entity:</span>
              <span className="font-medium text-slate-900 truncate max-w-[200px]">
                {category === 'academics' ? selectedCourse?.code : department}
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span>Privacy Mode:</span>
              <span className="font-medium text-slate-900">
                {isAnonymous ? 'Protected Anonymous' : `Identified (${studentName})`}
              </span>
            </div>
          </div>

          {/* Action Navigation Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
            {onNavigateToTrack && (
              <button
                id="btn-track-this-ticket"
                type="button"
                onClick={() => onNavigateToTrack(submittedTicketNumber)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Clock className="w-4 h-4" />
                <span>Track Resolution Milestones</span>
              </button>
            )}

            <button
              type="button"
              onClick={handlePrintReceipt}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Print Confirmation</span>
            </button>

            <button
              type="button"
              onClick={handleResetForm}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>Submit Another</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Editorial Header with College Photography */}
      <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs">
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-900">
          <img
            src={studentCollabImg}
            alt="Students collaborating at Torres Capitol College"
            loading="eager"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== '/images/student_study_collaboration.jpg') {
                target.src = '/images/student_study_collaboration.jpg';
              }
            }}
            className="w-full h-full object-cover object-center brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:bottom-6 text-white space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider">
              <span>Torres Capitol College (TCC)</span>
              <span aria-hidden="true">·</span>
              <span>Maramag, Bukidnon</span>
            </div>
            <h1 className="font-display text-xl sm:text-3xl font-semibold tracking-tight text-white">
              Student Voice & Institutional Quality Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl line-clamp-2">
              Your feedback directly steers academic improvements, lab modernization, campus facilities, and institutional excellence.
            </p>
          </div>
        </div>

        {/* Protection Assurance Strip */}
        <div className="px-4 py-3 sm:px-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-2 text-slate-700 font-medium">
            <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Protected under TCC Student Privacy Charter</span>
          </div>
          <div className="flex items-center gap-3 text-slate-500">
            <span>Official Tracking Ticket Assigned</span>
            <span aria-hidden="true">·</span>
            <span>24h–72h Administrative SLA</span>
          </div>
        </div>
      </div>

      {/* Main Feedback Submission Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Error Callout */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: Domain / Scope Selection */}
        <section className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-mono-numbers font-semibold text-indigo-600 uppercase tracking-wider">
                01. Scope & Domain
              </span>
              <h2 className="text-base sm:text-lg font-semibold text-slate-900 mt-0.5">
                What would you like to evaluate or report?
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              {
                id: 'services',
                label: 'Student Services',
                sub: 'Registrar, Cashier, Clinic, Library',
                icon: <Building2 className="w-4 h-4 text-indigo-600" />
              },
              {
                id: 'facilities',
                label: 'Campus Facilities',
                sub: 'Computer Labs, Wi-Fi, Restrooms, Aircon',
                icon: <Wifi className="w-4 h-4 text-blue-600" />
              },
              {
                id: 'academics',
                label: 'Academic Courses',
                sub: 'Instructor, Syllabus, Lab Modules, Grading',
                icon: <GraduationCap className="w-4 h-4 text-emerald-600" />
              },
              {
                id: 'activities',
                label: 'Student Affairs',
                sub: 'SSG, Intramurals, Clubs, Guidance',
                icon: <Users className="w-4 h-4 text-purple-600" />
              }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id as FeedbackCategory)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[90px] ${
                  category === item.id
                    ? 'border-indigo-600 bg-indigo-50/50 text-indigo-950 shadow-2xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="p-1.5 rounded-lg bg-white border border-slate-200/60 shadow-2xs">
                    {item.icon}
                  </div>
                  {category === item.id && (
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  )}
                </div>
                <div>
                  <div className="font-semibold text-xs sm:text-sm text-slate-900 mt-2">
                    {item.label}
                  </div>
                  <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {item.sub}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Conditional Target Selector: Academic Course Picker vs Department Picker */}
          {category === 'academics' ? (
            <div className="pt-2 border-t border-slate-100">
              <label htmlFor="course-select-input" className="block text-xs font-semibold text-slate-800 mb-1.5">
                Select Course & Faculty to Evaluate <span className="text-rose-500">*</span>
              </label>
              <select
                id="course-select-input"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="w-full text-xs py-2.5 px-3 rounded-lg border border-slate-200 bg-white text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 shadow-2xs"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code}: {c.name} — {c.instructor} ({c.department})
                  </option>
                ))}
              </select>
              {selectedCourse && (
                <div className="mt-2 text-xs text-slate-500 flex flex-wrap items-center gap-3">
                  <span>Instructor: <strong className="text-slate-800">{selectedCourse.instructor}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>Units: <strong className="text-slate-800 font-mono-numbers">{selectedCourse.credits}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>Enrolled: <strong className="text-slate-800 font-mono-numbers">{selectedCourse.enrolledStudents}</strong></span>
                </div>
              )}
            </div>
          ) : (
            <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="department-select-input" className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Target Department / Office <span className="text-rose-500">*</span>
                </label>
                <select
                  id="department-select-input"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full text-xs py-2.5 px-3 rounded-lg border border-slate-200 bg-white text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 shadow-2xs"
                >
                  {CAMPUS_DEPARTMENTS.map((dept) => (
                    <option key={dept.id} value={dept.name}>
                      {dept.name} ({dept.head})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="target-entity-input" className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Specific Facility / Service Counter (Optional)
                </label>
                <input
                  id="target-entity-input"
                  type="text"
                  value={targetEntity}
                  onChange={(e) => setTargetEntity(e.target.value)}
                  placeholder="e.g. Window 2, Comp Lab 3, 2nd Floor Men's Restroom"
                  className="w-full text-xs py-2.5 px-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 shadow-2xs"
                />
              </div>
            </div>
          )}
        </section>

        {/* STEP 2: Nature & Urgency */}
        <section className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-mono-numbers font-semibold text-indigo-600 uppercase tracking-wider">
                02. Nature & Priority
              </span>
              <h2 className="text-base sm:text-lg font-semibold text-slate-900 mt-0.5">
                Classify your submission
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: 'concern', label: 'Issue / Concern', icon: <AlertTriangle className="w-4 h-4 text-rose-600" />, desc: 'Report a malfunction or issue needing action' },
              { id: 'recommendation', label: 'Suggestion', icon: <Lightbulb className="w-4 h-4 text-amber-600" />, desc: 'Propose an idea for collegiate enhancement' },
              { id: 'commendation', label: 'Commendation', icon: <Award className="w-4 h-4 text-emerald-600" />, desc: 'Appreciation for exemplary staff or teaching' },
              { id: 'evaluation', label: 'Evaluation Rating', icon: <Star className="w-4 h-4 text-amber-500 fill-amber-400" />, desc: 'Comprehensive rubric scoring' }
            ].map((item) => (
              <button
                key={item.id}
                id={`nature-select-${item.id}`}
                type="button"
                onClick={() => setFeedbackNature(item.id as FeedbackNature)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[85px] ${
                  feedbackNature === item.id
                    ? 'border-indigo-600 bg-indigo-50/50 text-indigo-950 shadow-2xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-1 rounded-md bg-white border border-slate-200/60 shadow-2xs">
                    {item.icon}
                  </div>
                  {feedbackNature === item.id && (
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  )}
                </div>
                <div>
                  <div className="font-semibold text-xs sm:text-sm text-slate-900 mt-2">
                    {item.label}
                  </div>
                  <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {item.desc}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Priority selector with clear SLA description */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-800 mb-1.5">
              Urgency / Resolution SLA Priority
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'low', label: 'Low', time: '3–5 school days', desc: 'General observation' },
                { id: 'medium', label: 'Normal / Medium', time: '48–72 hours', desc: 'Standard turnaround' },
                { id: 'high', label: 'High Priority', time: '24–48 hours', desc: 'Affects learning or class' },
                { id: 'urgent', label: 'Urgent Action', time: 'Within 24 hours', desc: 'Immediate safety or breakdown' }
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPriority(p.id as TicketPriority)}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                    priority === p.id
                      ? 'border-slate-900 bg-slate-900 text-white shadow-2xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs">{p.label}</span>
                    <span className={`text-[10px] font-mono-numbers ${priority === p.id ? 'text-slate-300' : 'text-slate-500'}`}>
                      {p.time}
                    </span>
                  </div>
                  <div className={`text-[10px] mt-0.5 ${priority === p.id ? 'text-slate-300' : 'text-slate-400'}`}>
                    {p.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* STEP 3: Collegiate Evaluation Rubric */}
        <section className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-mono-numbers font-semibold text-indigo-600 uppercase tracking-wider">
                03. Evaluation Rubric
              </span>
              <h2 className="text-base sm:text-lg font-semibold text-slate-900 mt-0.5">
                Standard Criteria Assessment (1 to 5 Stars)
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500">Overall Rating</span>
              <div className="text-lg font-bold font-mono-numbers text-slate-900">
                {overallRating}.0 / 5.0
              </div>
            </div>
          </div>

          <div className="space-y-4 divide-y divide-slate-100">
            {EVALUATION_CRITERIA.map((crit) => {
              const currentScore = ratings[crit.id] || 4;
              return (
                <div key={crit.id} className="pt-4 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5 max-w-md">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs sm:text-sm text-slate-900">
                        {crit.label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {crit.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <StarRating
                      idPrefix={`rubric-${crit.id}`}
                      rating={currentScore}
                      size="md"
                      onChange={(val) => handleRatingChange(crit.id, val)}
                    />
                    <span className="text-xs font-mono-numbers font-semibold text-slate-700 w-6 text-right">
                      {currentScore}.0
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Recommendation Question */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-semibold text-slate-800">
              Would you recommend this course / department to fellow students?
            </span>
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200/80 text-xs">
              {(['yes', 'maybe', 'no'] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setRecommendation(opt)}
                  className={`px-3 py-1 rounded-md font-medium capitalize transition-colors cursor-pointer ${
                    recommendation === opt
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* STEP 4: Narrative Details & Context */}
        <section className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-mono-numbers font-semibold text-indigo-600 uppercase tracking-wider">
              04. Narrative & Specifics
            </span>
            <h2 className="text-base sm:text-lg font-semibold text-slate-900 mt-0.5">
              Describe your experience or concern
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="input-feedback-title" className="block text-xs font-semibold text-slate-800 mb-1.5">
                Subject Title / Core Issue <span className="text-rose-500">*</span>
              </label>
              <input
                id="input-feedback-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Unstable Wi-Fi during IT Lab session, or Commendation for engaging programming lectures"
                className="w-full text-xs py-2.5 px-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 shadow-2xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="input-feedback-strengths" className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Positive Highlights / Commendations
                </label>
                <textarea
                  id="input-feedback-strengths"
                  rows={3}
                  value={strengths}
                  onChange={(e) => setStrengths(e.target.value)}
                  placeholder="What worked well? Friendly assistance, clear step-by-step demos, prompt exam results..."
                  className="w-full text-xs py-2.5 px-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 shadow-2xs resize-none"
                />
              </div>

              <div>
                <label htmlFor="input-feedback-areas" className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Areas for Action / Remediation <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="input-feedback-areas"
                  rows={3}
                  value={areasForImprovement}
                  onChange={(e) => setAreasForImprovement(e.target.value)}
                  placeholder="What needs improvement? Room temperature, queue waiting times, lab computer software updates..."
                  className="w-full text-xs py-2.5 px-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 shadow-2xs resize-none"
                />
              </div>
            </div>

            {/* Quick Keyword Tags (Functional Buttons) */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                Tag Relevant Aspects
              </label>
              <div className="flex flex-wrap gap-1.5">
                {FEEDBACK_TAGS.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* STEP 5: Student Privacy & Identification */}
        <section className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-mono-numbers font-semibold text-indigo-600 uppercase tracking-wider">
              05. Privacy & Identity
            </span>
            <h2 className="text-base sm:text-lg font-semibold text-slate-900 mt-0.5">
              Choose your anonymity level
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setIsAnonymous(true)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                isAnonymous
                  ? 'border-emerald-600 bg-emerald-50/40 text-emerald-950 shadow-2xs'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-xs sm:text-sm text-slate-900">
                  🔒 Anonymous Submission
                </span>
                {isAnonymous && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Your name, email, and student ID are never saved or shared with evaluated instructors.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setIsAnonymous(false)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                !isAnonymous
                  ? 'border-indigo-600 bg-indigo-50/40 text-indigo-950 shadow-2xs'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-xs sm:text-sm text-slate-900">
                  👤 Identified Submission
                </span>
                {!isAnonymous && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Include your details so administrators can contact you for follow-up verification.
              </p>
            </button>
          </div>

          {/* If identified, input fields */}
          {!isAnonymous && (
            <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label htmlFor="input-student-name" className="block text-xs font-semibold text-slate-800 mb-1">
                  Student Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="input-student-name"
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Maria Santos"
                  className="w-full text-xs py-2 px-3 rounded-lg border border-slate-200 bg-white text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 shadow-2xs"
                />
              </div>

              <div>
                <label htmlFor="input-student-email" className="block text-xs font-semibold text-slate-800 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  id="input-student-email"
                  type="email"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  placeholder="e.g. maria.santos@philcountryville.com"
                  className="w-full text-xs py-2 px-3 rounded-lg border border-slate-200 bg-white text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 shadow-2xs"
                />
              </div>

              <div>
                <label htmlFor="input-student-id" className="block text-xs font-semibold text-slate-800 mb-1">
                  Student ID Number
                </label>
                <input
                  id="input-student-id"
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="e.g. 2024-IT-0192"
                  className="w-full text-xs py-2 px-3 rounded-lg border border-slate-200 bg-white text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 shadow-2xs"
                />
              </div>
            </div>
          )}
        </section>

        {/* Submit Action Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            By submitting, you affirm this report is genuine in accordance with the TCC Student Handbook.
          </div>

          <button
            id="btn-submit-feedback"
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Submit Feedback & Generate Ticket</span>
          </button>
        </div>

      </form>
    </div>
  );
};
