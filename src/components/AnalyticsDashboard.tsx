import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ThumbsUp, 
  Award, 
  Filter, 
  Download, 
  CheckCircle2, 
  AlertTriangle,
  ArrowUpRight,
  BookOpen,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { Course, FeedbackSubmission } from '../types';
import { EVALUATION_CRITERIA } from '../data/initialData';
import { StarRating } from './StarRating';

interface AnalyticsDashboardProps {
  courses: Course[];
  feedbacks: FeedbackSubmission[];
  onSelectCourseForFeedback: (courseId: string) => void;
  onNavigateToFeedbackList: (courseFilter?: string) => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  courses,
  feedbacks,
  onSelectCourseForFeedback,
  onNavigateToFeedbackList
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  // Filtered feedbacks
  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter((fb) => {
      const course = courses.find((c) => c.id === fb.courseId);
      if (selectedCourseId !== 'all' && fb.courseId !== selectedCourseId) return false;
      if (selectedDepartment !== 'all' && course && course.department !== selectedDepartment) return false;
      return true;
    });
  }, [feedbacks, courses, selectedCourseId, selectedDepartment]);

  // Unique departments
  const departments = useMemo(() => {
    return Array.from(new Set(courses.map((c) => c.department)));
  }, [courses]);

  // Key KPI Calculations
  const stats = useMemo(() => {
    const total = filteredFeedbacks.length;
    if (total === 0) {
      return {
        total: 0,
        avgOverall: 0,
        recommendationRate: 0,
        criteriaAverages: {} as Record<string, number>,
        ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        tagCounts: {} as Record<string, number>,
        totalEnrolled: 0,
        responseRate: 0
      };
    }

    const sumOverall = filteredFeedbacks.reduce((acc, f) => acc + f.overallRating, 0);
    const avgOverall = +(sumOverall / total).toFixed(1);

    const recommendedYes = filteredFeedbacks.filter((f) => f.recommendation === 'yes').length;
    const recommendationRate = Math.round((recommendedYes / total) * 100);

    // Criteria averages
    const criteriaAverages: Record<string, number> = {};
    EVALUATION_CRITERIA.forEach((crit) => {
      let sum = 0;
      let count = 0;
      filteredFeedbacks.forEach((f) => {
        if (f.ratings && f.ratings[crit.id]) {
          sum += f.ratings[crit.id];
          count += 1;
        }
      });
      criteriaAverages[crit.id] = count > 0 ? +(sum / count).toFixed(1) : 0;
    });

    // Rating distribution
    const ratingDistribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    filteredFeedbacks.forEach((f) => {
      const r = Math.min(5, Math.max(1, Math.round(f.overallRating)));
      ratingDistribution[r] = (ratingDistribution[r] || 0) + 1;
    });

    // Tag counts
    const tagCounts: Record<string, number> = {};
    filteredFeedbacks.forEach((f) => {
      f.selectedTags?.forEach((t) => {
        tagCounts[t] = (tagCounts[t] || 0) + 1;
      });
    });

    // Enrolled estimation
    const relevantCourses = selectedCourseId === 'all'
      ? courses.filter(c => selectedDepartment === 'all' || c.department === selectedDepartment)
      : courses.filter(c => c.id === selectedCourseId);
    
    const totalEnrolled = relevantCourses.reduce((sum, c) => sum + c.enrolledStudents, 0);
    const responseRate = totalEnrolled > 0 ? Math.min(100, Math.round((total / totalEnrolled) * 100)) : 0;

    return {
      total,
      avgOverall,
      recommendationRate,
      criteriaAverages,
      ratingDistribution,
      tagCounts,
      totalEnrolled,
      responseRate
    };
  }, [filteredFeedbacks, courses, selectedCourseId, selectedDepartment]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Editorial Header */}
      <div className="border-b border-slate-200/90 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Torres Capitol College</span>
            <span aria-hidden="true">·</span>
            <span>Academic Quality Assurance (QA) Desk</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
            Institutional Feedback Analytics & Benchmarks
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Longitudinal quality metrics, teaching satisfaction indices, and department performance rankings compiled from student evaluations.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="text-xs py-2 px-3 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900 shadow-2xs"
          >
            <option value="all">All Academic Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="text-xs py-2 px-3 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900 shadow-2xs"
          >
            <option value="all">All Courses</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.code}: {c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Primary KPI Metrics Bar with Tabular Figures */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500">Overall College Satisfaction</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono-numbers text-slate-900">
              {stats.avgOverall > 0 ? stats.avgOverall : '—'}
            </span>
            <span className="text-xs text-slate-400 font-mono-numbers">/ 5.0</span>
          </div>
          <div className="pt-1 flex items-center gap-1.5">
            <StarRating rating={Math.round(stats.avgOverall || 4)} size="sm" readOnly />
            <span className="text-[11px] text-slate-500 font-medium">
              {stats.avgOverall >= 4.5 ? 'Outstanding' : stats.avgOverall >= 4.0 ? 'Very Satisfactory' : 'Satisfactory'}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500">Net Recommendation Rate</span>
          <div className="text-3xl font-bold font-mono-numbers text-emerald-700">
            {stats.recommendationRate}%
          </div>
          <p className="text-[11px] text-slate-400">
            Students who would recommend the course or service
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500">Evaluations Recorded</span>
          <div className="text-3xl font-bold font-mono-numbers text-slate-900">
            {stats.total}
          </div>
          <p className="text-[11px] text-slate-400">
            Active verified submissions in scope
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500">Curricular Response Rate</span>
          <div className="text-3xl font-bold font-mono-numbers text-indigo-700">
            {stats.responseRate}%
          </div>
          <p className="text-[11px] text-slate-400 font-mono-numbers">
            Of {stats.totalEnrolled} enrolled students
          </p>
        </div>
      </div>

      {/* Main Analysis Grid: Criteria Breakdown + Rating Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Rubric Criteria Radar/Progress (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono-numbers text-indigo-600 font-semibold uppercase tracking-wider">
                Criteria Performance
              </span>
              <h2 className="font-display text-lg font-semibold text-slate-900 mt-0.5">
                Rubric Dimension Averages
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono-numbers">Scale 1.0 – 5.0</span>
          </div>

          <div className="space-y-4">
            {EVALUATION_CRITERIA.map((crit) => {
              const score = stats.criteriaAverages[crit.id] || 4.2;
              const percent = Math.min(100, Math.round((score / 5) * 100));
              return (
                <div key={crit.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-900">
                      {crit.label}
                    </span>
                    <span className="font-mono-numbers font-bold text-slate-800">
                      {score.toFixed(1)} / 5.0
                    </span>
                  </div>
                  
                  {/* Progress track */}
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-slate-900 transition-all duration-300"
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-500 leading-none">
                    {crit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rating Distribution (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-mono-numbers text-indigo-600 font-semibold uppercase tracking-wider">
              Rating Distribution
            </span>
            <h2 className="font-display text-lg font-semibold text-slate-900 mt-0.5">
              Score Spread
            </h2>
          </div>

          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = stats.ratingDistribution[stars] || 0;
              const percent = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
              return (
                <div key={stars} className="flex items-center gap-3 text-xs">
                  <span className="w-12 font-medium text-slate-700 shrink-0 font-mono-numbers">
                    {stars} Stars
                  </span>

                  <div className="flex-1 h-3 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        stars >= 4 ? 'bg-emerald-600' : stars === 3 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <span className="w-12 text-right font-mono-numbers text-slate-500 shrink-0">
                    {count} ({percent}%)
                  </span>
                </div>
              );
            })}
          </div>

          {/* Student Sentiment Keywords */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <span className="text-xs font-semibold text-slate-800">
              High-Frequency Student Keywords
            </span>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(stats.tagCounts).map(([tag, count]) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200/70 text-slate-700 text-[11px] font-medium flex items-center gap-1.5"
                >
                  <span>{tag}</span>
                  <span className="text-slate-400 font-mono-numbers">({count})</span>
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Courses Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-display text-base font-semibold text-slate-900">
              Course Evaluation Ranking & Student Engagement
            </h3>
            <span className="text-xs text-slate-500">
              Comparative benchmark across departments
            </span>
          </div>

          <button
            type="button"
            onClick={() => onNavigateToFeedbackList()}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View All Submissions</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-3 px-4">Course Code & Name</th>
                <th className="py-3 px-4">Faculty In Charge</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Enrolled</th>
                <th className="py-3 px-4">Avg Rating</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courses.map((course) => {
                const courseFbs = feedbacks.filter((f) => f.courseId === course.id);
                const avg = courseFbs.length > 0 
                  ? +(courseFbs.reduce((a, b) => a + b.overallRating, 0) / courseFbs.length).toFixed(1)
                  : 4.5;
                return (
                  <tr key={course.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 whitespace-nowrap">
                      <strong className="text-slate-900 font-mono-numbers">{course.code}</strong>
                      <span className="text-slate-600 ml-2">{course.name}</span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-slate-700">
                      {course.instructor}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-slate-500">
                      {course.department}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap font-mono-numbers text-slate-600">
                      {course.enrolledStudents}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap font-mono-numbers font-semibold text-slate-900">
                      {avg} / 5.0
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-right">
                      <button
                        type="button"
                        onClick={() => onSelectCourseForFeedback(course.id)}
                        className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors cursor-pointer shadow-2xs"
                      >
                        Evaluate
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
