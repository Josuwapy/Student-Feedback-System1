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
  Star
} from 'lucide-react';
import { Course, EvaluationCriteria, FeedbackSubmission, FeedbackCategory, FeedbackNature, TicketPriority } from '../types';
import { EVALUATION_CRITERIA, FEEDBACK_TAGS, CAMPUS_DEPARTMENTS } from '../data/initialData';
import { StarRating } from './StarRating';

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
      setErrorMessage('Please provide your name and university email or switch to Anonymous mode.');
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
      strengths: strengths.trim() || 'No specific strengths highlighted.',
      areasForImprovement: areasForImprovement.trim() || title.trim() || 'General feedback submitted.',
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

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 animate-in fade-in duration-200">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Submitted Successfully
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">
              Thank You for Your Feedback!
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto mt-1">
              Your submission has been logged and dispatched to the university monitoring system for administrative review and quality assurance.
            </p>
          </div>

          {/* Ticket Number Badge */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 max-w-md mx-auto space-y-2 text-center">
            <div className="text-xs text-indigo-300 font-medium uppercase tracking-wider">
              Your Tracking Ticket Number
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-wider flex items-center justify-center gap-2">
              <span>{submittedTicketNumber}</span>
              <button
                type="button"
                onClick={handleCopyTicketCode}
                title="Copy tracking code"
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-300" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Keep this code handy to track investigation stages and read official administrator responses.
            </p>
          </div>

          {/* Summary Details */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/70 text-left max-w-md mx-auto space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Category:</span>
              <span className="font-bold text-slate-800 capitalize">{category}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Feedback Type:</span>
              <span className="font-bold text-slate-800 capitalize">{feedbackNature}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Target / Department:</span>
              <span className="font-medium text-slate-800 truncate max-w-[200px]">
                {category === 'academics' ? selectedCourse?.code : department}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Privacy:</span>
              <span className="font-medium text-slate-800">
                {isAnonymous ? '🔒 Anonymous Submission' : `Identified (${studentName})`}
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
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <Clock className="w-4 h-4" />
                <span>Track Ticket Status Now</span>
              </button>
            )}

            <button
              id="btn-submit-another"
              type="button"
              onClick={handleResetForm}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
            >
              Submit Another Feedback
            </button>

            <button
              id="btn-browse-submissions-after-submit"
              type="button"
              onClick={onNavigateToReviews}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
            >
              Browse Submissions
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-800 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-indigo-100 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Torres Capitol College • Student Voice & Quality Assurance</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Submit Your Feedback & Concerns
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed">
            Voice your opinions, report campus issues, and submit constructive recommendations regarding TCC school services, facilities, student activities, or academic courses at our Maramag campus.
          </p>
        </div>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-xl flex items-center gap-2 text-xs font-medium">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Feedback Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Step 1: Select Category */}
        <section className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Step 1</span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              What area are you providing feedback on?
            </h3>
            <p className="text-xs text-slate-500">
              Select the appropriate domain so your feedback is routed to the right administrative department.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: 'services', label: 'School Services', icon: <Building2 className="w-4 h-4" />, desc: 'Registrar, Cashier, Clinic, Library' },
              { id: 'facilities', label: 'Campus Facilities', icon: <Wifi className="w-4 h-4" />, desc: 'Wi-Fi, Labs, Classrooms, Restrooms' },
              { id: 'activities', label: 'Student Activities', icon: <Users className="w-4 h-4" />, desc: 'Clubs, Intramurals, Events, Council' },
              { id: 'academics', label: 'Academics & Teaching', icon: <GraduationCap className="w-4 h-4" />, desc: 'Courses, Professors, Lectures, Exams' }
            ].map((cat) => {
              const isSelected = category === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`cat-select-${cat.id}`}
                  type="button"
                  onClick={() => setCategory(cat.id as FeedbackCategory)}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[90px] cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50/80 border-indigo-600 shadow-xs ring-2 ring-indigo-600/20 text-indigo-950'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={isSelected ? 'text-indigo-600' : 'text-slate-500'}>
                      {cat.icon}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold">{cat.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{cat.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Step 2: Feedback Nature & Priority */}
        <section className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Step 2</span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              Nature of Submission & Urgency
            </h3>
            <p className="text-xs text-slate-500">
              Categorize the nature of your report and indicate urgency level for administrative response time.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'concern', label: 'Issue / Concern', icon: <AlertTriangle className="w-4 h-4 text-rose-600" />, desc: 'Report a problem needing action' },
              { id: 'recommendation', label: 'Recommendation', icon: <Lightbulb className="w-4 h-4 text-amber-600" />, desc: 'Suggest an improvement idea' },
              { id: 'commendation', label: 'Commendation', icon: <Award className="w-4 h-4 text-emerald-600" />, desc: 'Praise good staff or service' },
              { id: 'evaluation', label: 'Evaluation Rating', icon: <Star className="w-4 h-4 text-amber-500 fill-amber-400" />, desc: 'Rubric ratings and grades' }
            ].map((nature) => {
              const isSelected = feedbackNature === nature.id;
              return (
                <button
                  key={nature.id}
                  id={`nature-select-${nature.id}`}
                  type="button"
                  onClick={() => setFeedbackNature(nature.id as FeedbackNature)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[85px] cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50 border-indigo-600 ring-2 ring-indigo-600/20 text-indigo-950 font-semibold'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>{nature.icon}</div>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold">{nature.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{nature.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Priority selector */}
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-800">
                Priority / Urgency Level:
              </label>
              <span className="text-[11px] text-slate-500 block">How quickly does this concern require attention?</span>
            </div>

            <div className="flex items-center gap-1.5">
              {(['low', 'medium', 'high', 'urgent'] as TicketPriority[]).map((p) => {
                const isSelected = priority === p;
                return (
                  <button
                    key={p}
                    id={`priority-${p}`}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                      isSelected
                        ? p === 'urgent'
                          ? 'bg-rose-600 text-white shadow-xs'
                          : p === 'high'
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Step 3: Target Details & Location */}
        <section className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Step 3</span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              Target Entity & Campus Location
            </h3>
            <p className="text-xs text-slate-500">
              Specify the exact course, office, service desk, or facility involved.
            </p>
          </div>

          {category === 'academics' ? (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Select Course & Faculty Member *
              </label>
              <select
                id="select-course-dropdown"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[44px]"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code} — {c.name} ({c.instructor})
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Responsible Campus Department / Unit *
                </label>
                <select
                  id="select-department-dropdown"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[44px]"
                >
                  {CAMPUS_DEPARTMENTS.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} ({d.category.toUpperCase()})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Specific Service / Window / Facility Name
                </label>
                <input
                  id="input-target-entity"
                  type="text"
                  value={targetEntity}
                  onChange={(e) => setTargetEntity(e.target.value)}
                  placeholder="e.g., Cashier Window 2, Wi-Fi AP-302, Clinic Bay"
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[44px]"
                />
              </div>
            </div>
          )}

          {/* Subject / Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Feedback Subject / Summary Title *
            </label>
            <input
              id="input-feedback-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Excessive cashier queue during midterms, or Wi-Fi disconnection on 3rd floor library..."
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[44px]"
            />
          </div>

          {/* Specific Location */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Building, Floor, or Room Number
            </label>
            <input
              id="input-location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Administration Building 1st Floor Lobby, or Science & Tech Room 204..."
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[44px]"
            />
          </div>
        </section>

        {/* Step 4: Rating Rubric (Detailed for Academics, or Overall Satisfaction for Services/Facilities) */}
        <section className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Step 4</span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              Performance Rating & Key Impression Tags
            </h3>
            <p className="text-xs text-slate-500">
              Rate your experience on a 1 to 5 scale to help calculate institutional satisfaction indexes.
            </p>
          </div>

          {category === 'academics' ? (
            <div className="space-y-4">
              {EVALUATION_CRITERIA.map((criteria) => (
                <div key={criteria.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-50/70 border border-slate-100 gap-2">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-slate-900">{criteria.label}</div>
                    <div className="text-[11px] text-slate-500">{criteria.description}</div>
                  </div>
                  <StarRating
                    id={`rating-${criteria.id}`}
                    rating={ratings[criteria.id] || 4}
                    onChange={(val) => handleRatingChange(criteria.id, val)}
                    size="md"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-slate-900">Overall Service / Facility Satisfaction</div>
                <div className="text-[11px] text-slate-500">How satisfied were you with the quality, promptness, and attitude?</div>
              </div>
              <StarRating
                id="rating-overall-service"
                rating={overallRating}
                onChange={setOverallRating}
                size="lg"
              />
            </div>
          )}

          {/* Experience Tags */}
          <div className="pt-2">
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Select Relevant Experience Tags:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                ...FEEDBACK_TAGS,
                'Queuing Bottleneck',
                'Helpful Staff',
                'Wi-Fi & Internet',
                'Clean Facilities',
                'Air Conditioning',
                'Digital Modernization',
                'Prompt Resolution'
              ].map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-xs transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white font-medium shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Step 5: Qualitative Details & Recommendations */}
        <section className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Step 5</span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              Detailed Feedback & Proposed Solutions
            </h3>
            <p className="text-xs text-slate-500">
              Provide specific observations, describe what went wrong or well, and offer constructive recommendations.
            </p>
          </div>

          <div>
            <label htmlFor="input-areas-improvement" className="block text-xs font-semibold text-slate-800 mb-1">
              Issues Encountered / Areas for Improvement *
            </label>
            <textarea
              id="input-areas-improvement"
              rows={3}
              required
              value={areasForImprovement}
              onChange={(e) => setAreasForImprovement(e.target.value)}
              placeholder="Describe the issue, delay, defect, or situation clearly (e.g., Only 1 teller open on tuition deadline day; Wi-Fi drops continually on 3rd floor quiet area)..."
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y"
            />
          </div>

          <div>
            <label htmlFor="input-strengths" className="block text-xs font-semibold text-slate-800 mb-1">
              Commendations / What Worked Well (Optional)
            </label>
            <textarea
              id="input-strengths"
              rows={2}
              value={strengths}
              onChange={(e) => setStrengths(e.target.value)}
              placeholder="Highlight helpful personnel, polite demeanor, or effective aspects of the service/activity..."
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y"
            />
          </div>

          <div>
            <label htmlFor="input-recommendation" className="block text-xs font-semibold text-slate-800 mb-1">
              Proposed Solution / Student Recommendation (Optional)
            </label>
            <textarea
              id="input-recommendation"
              rows={2}
              value={additionalComments}
              onChange={(e) => setAdditionalComments(e.target.value)}
              placeholder="What concrete action or policy change do you propose to resolve this problem permanently? (e.g., Introduce digital queue numbers, extend library hours during finals week)..."
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y"
            />
          </div>
        </section>

        {/* Step 6: Anonymity & Identification */}
        <section className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Submission Privacy & Protection
                </h4>
                <p className="text-xs text-slate-500">
                  You can submit 100% anonymously, or provide your student details so administrators can contact you for follow-up.
                </p>
              </div>
            </div>

            <button
              id="btn-toggle-anonymous"
              type="button"
              onClick={() => setIsAnonymous(!isAnonymous)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all min-h-[42px] flex items-center gap-1.5 shrink-0 ${
                isAnonymous
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-xs'
                  : 'bg-slate-100 text-slate-700 border-slate-300'
              }`}
            >
              {isAnonymous ? '🔒 100% Anonymous Mode' : '👤 Identified Submission'}
            </button>
          </div>

          {!isAnonymous && (
            <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  id="input-student-name"
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g., Joshua Entrina"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[40px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Student / College Email *
                </label>
                <input
                  id="input-student-email"
                  type="email"
                  required
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  placeholder="e.g., jentrina@philcountryville.com"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[40px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  TCC Student ID Number
                </label>
                <input
                  id="input-student-id"
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="e.g., TCC-2022-0418"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[40px]"
                />
              </div>
            </div>
          )}

          {isAnonymous && (
            <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Your identity is strictly protected. Anonymous submissions receive an encrypted ticket code for tracking.</span>
            </div>
          )}
        </section>

        {/* Submit Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            By submitting, you affirm that this feedback is accurate and constructive.
          </div>

          <button
            id="btn-submit-feedback"
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-indigo-200 flex items-center justify-center gap-2 min-h-[48px] touch-manipulation cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Submit Feedback & Generate Ticket</span>
          </button>
        </div>

      </form>
    </div>
  );
};
