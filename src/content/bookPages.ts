import type { BookPageDef } from '@/types/portfolio';

/**
 * Ordered printed faces of the book. Index 0 is the front cover; the last
 * index is the back cover. Leaves pair faces as (0,1), (2,3), ... so the
 * page count is always even.
 */
export const bookPages: BookPageDef[] = [
  { id: 'cover', layout: 'cover', chapterId: null, label: 'Cover' },
  { id: 'contents', layout: 'contents', chapterId: null, label: 'Contents' },
  { id: 'about', layout: 'about', chapterId: 'about', label: 'About' },
  { id: 'experience-featured', layout: 'experience-featured', chapterId: 'experience', label: 'Experience' },
  { id: 'experience-more', layout: 'experience-more', chapterId: 'experience', label: 'Experience' },
  { id: 'experience-earlier', layout: 'experience-earlier', chapterId: 'experience', label: 'Experience' },
  { id: 'skills', layout: 'skills', chapterId: 'skills', label: 'Skills' },
  { id: 'education', layout: 'education', chapterId: 'education', label: 'Education' },
  { id: 'contact', layout: 'contact', chapterId: 'contact', label: 'Contact' },
  { id: 'back-cover', layout: 'back-cover', chapterId: null, label: 'Back cover' },
];
