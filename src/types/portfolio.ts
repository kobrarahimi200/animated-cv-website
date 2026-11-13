export type ChapterId = 'about' | 'experience' | 'skills' | 'education' | 'contact';

export interface Chapter {
  id: ChapterId;
  /** Roman numeral label shown in the table of contents */
  numeral: string;
  title: string;
  summary: string;
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
  kind: 'email' | 'linkedin' | 'github';
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  intro: string;
  focus: string[];
  contacts: ContactLink[];
}

export interface ProjectItem {
  name: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  /** Start month, YYYY-MM, used by the career timeline */
  from: string;
  /** End month, YYYY-MM, used by the career timeline */
  to: string;
  location?: string;
  summary?: string;
  projects?: ProjectItem[];
  stack?: string[];
  /** Marks the entries shown as the featured, full-detail experience */
  featured?: boolean;
}

export interface EarlierRole {
  role: string;
  organization?: string;
}

export type IconName =
  | 'code'
  | 'server'
  | 'layers'
  | 'cloud'
  | 'users'
  | 'mail'
  | 'linkedin'
  | 'github'
  | 'globe'
  | 'database'
  | 'graduation'
  | 'briefcase'
  | 'tool';

export interface SkillGroup {
  label: string;
  icon: IconName;
  items: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  note?: string;
}

export interface LanguageItem {
  language: string;
  level: string;
}

export type BookLayout =
  | 'cover'
  | 'contents'
  | 'about'
  | 'experience-featured'
  | 'experience-more'
  | 'experience-earlier'
  | 'skills'
  | 'education'
  | 'contact'
  | 'back-cover';

/** One printed page of the book. `chapterId` is null for cover/contents/back cover. */
export interface BookPageDef {
  id: string;
  layout: BookLayout;
  chapterId: ChapterId | null;
  /** Short label used in the navigation UI */
  label: string;
}

export interface MascotLine {
  text: string;
}

export type MascotTrigger = 'page' | 'greeting' | 'click' | 'idle';

export type ProjectVisual =
  | { kind: 'flow'; steps: string[] }
  | { kind: 'image'; src: string; alt: string; width: number; height: number };

export interface ShowcaseProject {
  id: string;
  /** Display date, e.g. "07 / 2026" */
  date: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  tags: string[];
  repoUrl: string;
  icon: IconName;
  visual: ProjectVisual;
}

export interface PortfolioContent {
  profile: Profile;
  chapters: Chapter[];
  projects: ShowcaseProject[];
  experience: ExperienceItem[];
  earlierRoles: EarlierRole[];
  skills: SkillGroup[];
  education: EducationItem[];
  languages: LanguageItem[];
}
