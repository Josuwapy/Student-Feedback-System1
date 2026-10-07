import { Course, FeedbackSubmission } from '../types';
import { COURSES, INITIAL_FEEDBACKS } from '../data/initialData';

const STORAGE_KEYS = {
  COURSES: 'tcc_sfs_courses_v3',
  FEEDBACKS: 'tcc_sfs_feedbacks_v3',
};

export function loadCourses(): Course[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.COURSES);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load courses from localStorage', e);
  }
  return COURSES;
}

export function saveCourses(courses: Course[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
  } catch (e) {
    console.error('Failed to save courses to localStorage', e);
  }
}

export function loadFeedbacks(): FeedbackSubmission[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.FEEDBACKS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load feedbacks from localStorage', e);
  }
  return INITIAL_FEEDBACKS;
}

export function saveFeedbacks(feedbacks: FeedbackSubmission[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(feedbacks));
  } catch (e) {
    console.error('Failed to save feedbacks to localStorage', e);
  }
}

export function resetToDemoData(): { courses: Course[]; feedbacks: FeedbackSubmission[] } {
  try {
    localStorage.removeItem(STORAGE_KEYS.COURSES);
    localStorage.removeItem(STORAGE_KEYS.FEEDBACKS);
  } catch (e) {
    console.error('Failed to clear storage', e);
  }
  return { courses: COURSES, feedbacks: INITIAL_FEEDBACKS };
}
