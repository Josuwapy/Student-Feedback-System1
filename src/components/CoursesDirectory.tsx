import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Plus, 
  Users, 
  GraduationCap, 
  Award, 
  ArrowRight,
  Sparkles,
  CheckCircle2,
  X,
  Star,
  BarChart3
} from 'lucide-react';
import { Course, FeedbackSubmission } from '../types';
import { StarRating } from './StarRating';

interface CoursesDirectoryProps {
  courses: Course[];
  feedbacks: FeedbackSubmission[];
  onSelectCourseToFeedback: (courseId: string) => void;
  onSelectCourseToAnalytics: (courseId: string) => void;
  onAddNewCourse: (newCourse: Omit<Course, 'id'>) => void;
}

export const CoursesDirectory: React.FC<CoursesDirectoryProps> = ({
  courses,
  feedbacks,
  onSelectCourseToFeedback,
  onSelectCourseToAnalytics,
  onAddNewCourse
}) => {
  const [search, setSearch] = useState<string>('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // New course modal state
  const [newCode, setNewCode] = useState<string>('');
  const [newName, setNewName] = useState<string>('');
  const [newDepartment, setNewDepartment] = useState<string>('Information Technology');
  const [newInstructor, setNewInstructor] = useState<string>('');
  const [newTitle, setNewTitle] = useState<string>('Assistant Professor');
  const [newCredits, setNewCredits] = useState<number>(3);
  const [newEnrolled, setNewEnrolled] = useState<number>(55);

  const departments = useMemo(() => {
    return Array.from(new Set(courses.map((c) => c.department)));
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchDept = departmentFilter === 'all' || c.department === departmentFilter;
      const matchQuery =
        !search.trim() ||
        c.code.toLowerCase().includes(search.toLowerCase()) ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.instructor.toLowerCase().includes(search.toLowerCase()) ||
        c.department.toLowerCase().includes(search.toLowerCase());

      return matchDept && matchQuery;
    });
  }, [courses, departmentFilter, search]);

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim() || !newName.trim() || !newInstructor.trim()) return;

    onAddNewCourse({
      code: newCode.trim().toUpperCase(),
      name: newName.trim(),
      department: newDepartment,
      instructor: newInstructor.trim(),
      instructorTitle: newTitle.trim(),
      term: '1st Semester 2024-2025',
      credits: Number(newCredits) || 3,
      enrolledStudents: Number(newEnrolled) || 50,
      color: 'indigo'
    });

    setIsModalOpen(false);
    setNewCode('');
    setNewName('');
    setNewInstructor('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Editorial Header */}
      <div className="border-b border-slate-200/90 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Torres Capitol College</span>
            <span aria-hidden="true">·</span>
            <span>Academic Curriculum Directory</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
            Curriculum Catalogue & Faculty Evaluations
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Search active degree courses across Information Technology, Criminology, and Business Administration. Evaluate your current semester courses.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs inline-flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Register Course</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Department Filter Tabs (Functional buttons) */}
          <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200/70 text-xs w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setDepartmentFilter('all')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                departmentFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Departments
            </button>
            {departments.map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => setDepartmentFilter(dept)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                  departmentFilter === dept
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search code, title, or instructor..."
              className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>

        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((course) => {
          const courseFeedbacks = feedbacks.filter((f) => f.courseId === course.id);
          const avgRating = courseFeedbacks.length > 0
            ? +(courseFeedbacks.reduce((a, b) => a + b.overallRating, 0) / courseFeedbacks.length).toFixed(1)
            : 4.5;
          const evaluationCount = courseFeedbacks.length;

          return (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 flex flex-col justify-between hover:border-slate-300 transition-all space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-mono-numbers font-bold text-slate-900 text-sm">
                    {course.code}
                  </span>
                  <span className="font-mono-numbers text-slate-500">
                    {course.credits} Units
                  </span>
                </div>

                <h2 className="font-display text-base font-semibold text-slate-900 line-clamp-1">
                  {course.name}
                </h2>

                <div className="text-xs text-slate-600">
                  Faculty: <strong className="text-slate-900">{course.instructor}</strong>
                  <div className="text-[11px] text-slate-500">{course.instructorTitle}</div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>Department:</span>
                  <span className="text-slate-800 font-medium">{course.department}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Enrolled Students:</span>
                  <span className="font-mono-numbers text-slate-800 font-semibold">{course.enrolledStudents}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Student Satisfaction:</span>
                  <div className="flex items-center gap-1.5">
                    <StarRating rating={Math.round(avgRating)} size="sm" readOnly />
                    <span className="font-mono-numbers font-bold text-slate-900">{avgRating}</span>
                    <span className="text-[11px] text-slate-400 font-mono-numbers">({evaluationCount})</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelectCourseToFeedback(course.id)}
                  className="flex-1 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <span>Evaluate Course</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => onSelectCourseToAnalytics(course.id)}
                  title="View Analytics for this course"
                  className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
                >
                  <BarChart3 className="w-4 h-4 text-slate-500" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Register New Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl max-w-lg w-full p-6 space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-mono-numbers text-indigo-600 font-semibold uppercase tracking-wider">
                  Academic Registry
                </span>
                <h3 className="font-display text-lg font-semibold text-slate-900 mt-0.5">
                  Register New Course
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    Course Code <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    placeholder="e.g. IT 301"
                    className="w-full py-2 px-3 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    Department
                  </label>
                  <select
                    value={newDepartment}
                    onChange={(e) => setNewDepartment(e.target.value)}
                    className="w-full py-2 px-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  >
                    <option value="Information Technology">Information Technology</option>
                    <option value="Criminology">Criminology</option>
                    <option value="Business Administration">Business Administration</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Full Course Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Cloud Computing & Distributed Systems"
                  className="w-full py-2 px-3 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    Faculty Instructor <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newInstructor}
                    onChange={(e) => setNewInstructor(e.target.value)}
                    placeholder="e.g. Prof. Danica Flores"
                    className="w-full py-2 px-3 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    Academic Title
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Associate Professor"
                    className="w-full py-2 px-3 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    Credit Units
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    value={newCredits}
                    onChange={(e) => setNewCredits(Number(e.target.value))}
                    className="w-full py-2 px-3 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    Enrolled Students
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={newEnrolled}
                    onChange={(e) => setNewEnrolled(Number(e.target.value))}
                    className="w-full py-2 px-3 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold cursor-pointer shadow-2xs"
                >
                  Add Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
