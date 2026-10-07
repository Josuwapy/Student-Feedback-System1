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
      if (!course) return false;

      const matchesCourse = selectedCourseId === 'all' || fb.courseId === selectedCourseId;
      const matchesDept = selectedDepartment === 'all' || course.department === selectedDepartment;

      return matchesCourse && matchesDept;
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
        if (f.ratings[crit.id]) {
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

  // Export as CSV
  const handleExportCSV = () => {
    if (filteredFeedbacks.length === 0) return;
    const headers = ['Feedback ID', 'Course Code', 'Course Name', 'Timestamp', 'Overall Rating', 'Recommendation', 'Strengths', 'Improvements', 'Tags', 'Status'];
    const rows = filteredFeedbacks.map((fb) => {
      const course = courses.find((c) => c.id === fb.courseId);
      return [
        fb.id,
        course?.code || '',
        `"${course?.name || ''}"`,
        fb.timestamp,
        fb.overallRating,
        fb.recommendation,
        `"${(fb.strengths || '').replace(/"/g, '""')}"`,
        `"${(fb.areasForImprovement || '').replace(/"/g, '""')}"`,
        `"${fb.selectedTags.join(', ')}"`,
        fb.status
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `tcc_student_feedback_analytics_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const topTags = (Object.entries(stats.tagCounts) as [string, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto py-4 sm:py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Torres Capitol College Quality Assurance</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            TCC Faculty & Course Evaluation Analytics
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Aggregated metrics across course criteria, student satisfaction, and qualitative student feedback.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Department Filter */}
          <div className="w-full sm:w-auto">
            <select
              id="filter-department"
              value={selectedDepartment}
              onChange={(e) => {
                setSelectedDepartment(e.target.value);
                setSelectedCourseId('all');
              }}
              className="w-full sm:w-auto text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[42px]"
            >
              <option value="all">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Course Filter */}
          <div className="w-full sm:w-auto">
            <select
              id="filter-course"
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full sm:w-auto text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[42px]"
            >
              <option value="all">All Courses</option>
              {courses
                .filter((c) => selectedDepartment === 'all' || c.department === selectedDepartment)
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code}: {c.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Export button */}
          <button
            id="btn-export-analytics"
            type="button"
            onClick={handleExportCSV}
            title="Download CSV Report"
            className="text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors min-h-[42px]"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Rating */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              Overall Score
            </span>
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Award className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">
                {stats.avgOverall > 0 ? stats.avgOverall : '—'}
              </span>
              <span className="text-xs text-slate-500 font-medium">/ 5.0</span>
            </div>
            <div className="mt-2">
              <StarRating value={Math.round(stats.avgOverall)} readOnly={true} size="sm" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Benchmark: 4.0</span>
            <span className={stats.avgOverall >= 4.0 ? 'text-emerald-600 font-semibold' : 'text-amber-600 font-semibold'}>
              {stats.avgOverall >= 4.0 ? 'Above Target' : 'Review Needed'}
            </span>
          </div>
        </div>

        {/* Total Responses */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              Total Submissions
            </span>
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">
                {stats.total}
              </span>
              <span className="text-xs text-slate-500 font-medium">reviews</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              From ~{stats.totalEnrolled} enrolled students
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Response Turnout</span>
            <span className="font-semibold text-slate-700">{stats.responseRate}%</span>
          </div>
        </div>

        {/* Recommendation Rate */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              Recommendation
            </span>
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <ThumbsUp className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">
                {stats.recommendationRate}%
              </span>
              <span className="text-xs text-emerald-600 font-semibold">Positive</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Would recommend to fellow peers
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Institutional goal</span>
            <span className="font-semibold text-slate-700">&gt; 75%</span>
          </div>
        </div>

        {/* Top Strengths Tag */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              Leading Attribute
            </span>
            <span className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Sparkles className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 line-clamp-1">
              {topTags[0]?.[0] || 'Clear Explanations'}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Mentioned in {topTags[0]?.[1] || 0} student submissions
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Feedback Status</span>
            <span className="font-semibold text-emerald-600">Active</span>
          </div>
        </div>
      </div>

      {/* Visual Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Criteria Breakdown - 2 cols on desktop */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Evaluation Criteria Breakdown
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Average ratings across standardized institutional dimensions (1.0 - 5.0)
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
              5 Core Dimensions
            </span>
          </div>

          <div className="space-y-4">
            {EVALUATION_CRITERIA.map((crit) => {
              const score = stats.criteriaAverages[crit.id] || 0;
              const percentage = Math.round((score / 5) * 100);
              
              let barColor = 'bg-emerald-500';
              let badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
              if (score < 3.5) {
                barColor = 'bg-amber-500';
                badgeColor = 'bg-amber-50 text-amber-700 border-amber-200';
              }
              if (score < 3.0) {
                barColor = 'bg-rose-500';
                badgeColor = 'bg-rose-50 text-rose-700 border-rose-200';
              }

              return (
                <div key={crit.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="font-semibold text-slate-800">
                      {crit.label}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${badgeColor}`}>
                        {score > 0 ? score : 'N/A'} / 5.0
                      </span>
                    </div>
                  </div>

                  {/* Visual progress bar */}
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>1.0 Unsatisfactory</span>
                    <span>3.0 Expected</span>
                    <span>5.0 Outstanding</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Star Rating Distribution Histogram */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Rating Distribution
              </h3>
              <span className="text-xs text-slate-500">
                {stats.total} total
              </span>
            </div>

            <div className="space-y-2.5">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = stats.ratingDistribution[stars] || 0;
                const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                return (
                  <div key={stars} className="flex items-center gap-2 text-xs">
                    <div className="w-12 font-medium text-slate-600 flex items-center gap-1">
                      <span>{stars}</span>
                      <span className="text-amber-400">★</span>
                    </div>
                    <div className="flex-1 bg-slate-100 h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-400 h-full rounded-full transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="w-14 text-right text-slate-500 font-mono text-[11px]">
                      {count} ({pct}%)
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top tags cloud */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Most Frequent Highlights
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {topTags.map(([tag, count]) => (
                <span
                  key={tag}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium flex items-center gap-1"
                >
                  <span>{tag}</span>
                  <span className="text-indigo-600 font-bold font-mono">+{count}</span>
                </span>
              ))}
              {topTags.length === 0 && (
                <span className="text-xs text-slate-400">No tag data available</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Course Evaluation Leaderboard & Quick Action */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Department Courses Performance Summary
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparative rating scores, submission counts, and review status by course.
            </p>
          </div>
          <button
            id="btn-view-all-submissions"
            type="button"
            onClick={() => onNavigateToFeedbackList(selectedCourseId !== 'all' ? selectedCourseId : undefined)}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Detailed Reviews</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Responsive Table / Card list */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Course</th>
                <th className="py-3 px-4">Instructor</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4 text-center">Avg Rating</th>
                <th className="py-3 px-4 text-center">Responses</th>
                <th className="py-3 px-4 text-center">Recommendation</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courses
                .filter((c) => selectedDepartment === 'all' || c.department === selectedDepartment)
                .map((course) => {
                  const courseFbs = feedbacks.filter((f) => f.courseId === course.id);
                  const totalFb = courseFbs.length;
                  const avg = totalFb > 0
                    ? +(courseFbs.reduce((acc, f) => acc + f.overallRating, 0) / totalFb).toFixed(1)
                    : 0;
                  const recYes = courseFbs.filter((f) => f.recommendation === 'yes').length;
                  const recPct = totalFb > 0 ? Math.round((recYes / totalFb) * 100) : 0;

                  return (
                    <tr key={course.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{course.code}</div>
                        <div className="text-slate-500 text-[11px] line-clamp-1">{course.name}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-700 font-medium">
                        {course.instructor}
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {course.department}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {totalFb > 0 ? (
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-bold ${
                            avg >= 4.0 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            ★ {avg}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center font-medium text-slate-700">
                        {totalFb}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {totalFb > 0 ? (
                          <span className="font-semibold text-slate-700">{recPct}%</span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => onSelectCourseForFeedback(course.id)}
                            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
                          >
                            Give Feedback
                          </button>
                          <button
                            type="button"
                            onClick={() => onNavigateToFeedbackList(course.id)}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                          >
                            View
                          </button>
                        </div>
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
