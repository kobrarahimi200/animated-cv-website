import type { BookLayout } from '@/types/portfolio';
import { portfolio } from '@/content/portfolio';

export const mascotLines = {
  greeting: [
    'Hi, I am your guide. Turn the pages to explore.',
    'Welcome! Kobra’s story is best read page by page.',
  ],
  click: [
    'Hello again! Try the arrow keys to turn pages.',
    'Thanks for stopping by. Tip: the menu at the top jumps to any chapter.',
    'Tip: the menu at the top jumps to any chapter.',
  ],
  pages: {
    cover: ['Open the book whenever you are ready.'],
    contents: ['Pick any chapter from the contents.'],
    about: [`${portfolio.profile.name} works across frontend and backend.`],
    'experience-featured': ['Three projects at Itemis AG, from modernization to partner APIs.'],
    'experience-more': ['Earlier roles at Nuuk, DPS Engineering and Flying Pixel.'],
    'experience-earlier': ['A few earlier roles in IT and web administration.'],
    skills: ['Frontend, backend, DevOps and the tools I use every day.'],
    education: ['An MSc in IT Engineering and a thesis on hate speech detection.'],
    contact: ['Email, LinkedIn and GitHub are all listed here.'],
    'back-cover': ['Thanks for reading. The CV is one click away.'],
  } satisfies Record<BookLayout, string[]>,
} as const;

/** Pick a random line that differs from the last one, to keep the mascot lively. */
export function pickLine(lines: readonly string[], avoid?: string): string {
  const pool = lines.length > 1 && avoid ? lines.filter((line) => line !== avoid) : lines;
  return pool[Math.floor(Math.random() * pool.length)] ?? lines[0] ?? '';
}
