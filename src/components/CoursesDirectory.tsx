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
  X
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
  const [newTitle, setNewTitle] = useState<string>('Lecturer');
  const [newCredits, setNewCredits] = useState<number>(3);
  const [newEnrolled, setNewEnrolled] = useState<number>(60);

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
    <div className="max-w-6xl mx-auto py-4 sm:py-8 px-4 sm:px-6 space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Torres Capitol College Curriculum Directory</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            TCC Course Catalogue & Evaluations
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Explore active courses across BSIT, Criminology, and BSBA, review satisfaction scores, and submit your evaluation.
          </p>
        </div>

        <button
          id="btn-open-add-course"
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Course</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="input-search-courses"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search course code, subject, instructor..."
            className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[42px]"
          />
        </div>

        <div className="w-full sm:w-64">
          <select
            id="filter-dept-courses"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[42px]"
          >
            <option value="all">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map((course) => {
          const courseFbs = feedbacks.filter((f) => f.courseId === course.id);
          const totalReviews = courseFbs.length;
          const avgScore = totalReviews > 0
            ? +(courseFbs.reduce((acc, f) => acc + f.overallRating, 0) / totalReviews).toFixed(1)
            : 0;
          const recommendYes = courseFbs.filter((f) => f.recommendation === 'yes').length;
          const recommendPct = totalReviews > 0 ? Math.round((recommendYes / totalReviews) * 100) : 0;

          return (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-md text-xs font-extrabold bg-slate-100 text-slate-800">
                    {course.code}
                  </span>
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/60">
                    <span className="text-amber-500 text-xs">★</span>
                    <span className="text-xs font-bold text-amber-800">
                      {avgScore > 0 ? avgScore : 'New'}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 line-clamp-1 mb-1">
                  {course.name}
                </h3>
                <p className="text-xs text-slate-500 mb-3">
                  {course.department} • {course.credits} Credits
                </p>

                {/* Instructor Info */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-4 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Instructor:</span>
                    <span className="font-semibold text-slate-800">{course.instructor}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Rank / Title:</span>
                    <span>{course.instructorTitle}</span>
                  </div>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 gap-2 text-center text-xs py-2 border-t border-slate-100 mb-4">
                  <div>
                    <span className="block font-bold text-slate-800">{totalReviews}</span>
                    <span className="text-[10px] text-slate-400 uppercase font-medium">Evaluations</span>
                  </div>
                  <div>
                    <span className="block font-bold text-emerald-600">{totalReviews > 0 ? `${recommendPct}%` : '—'}</span>
                    <span className="text-[10px] text-slate-400 uppercase font-medium">Recommend</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onSelectCourseToFeedback(course.id)}
                  className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs min-h-[40px]"
                >
                  <span>Evaluate Course</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => onSelectCourseToAnalytics(course.id)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium text-xs border border-slate-200 transition-colors text-center min-h-[38px]"
                >
                  View Course Analytics
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 relative">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Add New Course for Evaluation
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter the course metadata to activate student evaluations.
            </p>

            <form onSubmit={handleCreateCourse} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Course Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., IT 215 or CRIM 102"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Course Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Software Engineering Principles"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department</label>
                  <select
                    value={newDepartment}
                    onChange={(e) => setNewDepartment(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Information Technology">Information Technology (BSIT)</option>
                    <option value="Criminology">Criminology (BSCrim)</option>
                    <option value="Business Administration">Business Administration (BSBA)</option>
                    <option value="Associate in Computer Tech">Associate in Computer Tech (ACT)</option>
                    <option value="Senior High School">Senior High School (TVL / Academic)</option>
                    <option value="General Education">General Education</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Credits</label>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    value={newCredits}
                    onChange={(e) => setNewCredits(parseInt(e.target.value, 10))}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Instructor Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Prof. Jonathan D. Magbanua, MIT"
                  value={newInstructor}
                  onChange={(e) => setNewInstructor(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                >
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
