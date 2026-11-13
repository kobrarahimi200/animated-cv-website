import type { PortfolioContent } from '@/types/portfolio';

/**
 * All portfolio copy lives here, separate from UI components.
 * Every fact comes from the supplied CV; nothing is invented.
 */
export const portfolio: PortfolioContent = {
  profile: {
    name: 'Kobra Rahimi',
    title: 'Frontend and Backend Developer',
    location: 'Hamburg, Germany',
    intro:
      'I am a software developer with experience in frontend and backend development. I build enterprise applications with modern web technologies and work closely with agile teams.',
    focus: ['Frontend & backend', 'Enterprise applications', 'Agile teams'],
    contacts: [
      {
        label: 'Email',
        value: 'kobrarahimi200@gmail.com',
        href: 'mailto:kobrarahimi200@gmail.com',
        kind: 'email',
      },
      {
        label: 'LinkedIn',
        value: 'linkedin.com/in/kobrarahimi',
        href: 'https://linkedin.com/in/kobrarahimi',
        kind: 'linkedin',
      },
      {
        label: 'GitHub',
        value: 'github.com/Kobrarahimi',
        href: 'https://github.com/Kobrarahimi',
        kind: 'github',
      },
    ],
  },

  chapters: [
    {
      id: 'about',
      numeral: 'I',
      title: 'About',
      summary: 'Who I am and what I work on',
    },
    {
      id: 'experience',
      numeral: 'II',
      title: 'Experience',
      summary: 'Projects and roles, most recent first',
    },
    {
      id: 'skills',
      numeral: 'III',
      title: 'Skills',
      summary: 'Technologies and tools I use',
    },
    {
      id: 'education',
      numeral: 'IV',
      title: 'Education',
      summary: 'Degrees, thesis and languages',
    },
    {
      id: 'contact',
      numeral: 'V',
      title: 'Contact',
      summary: 'Get in touch',
    },
  ],

  experience: [
    {
      id: 'itemis',
      role: 'Software Developer',
      company: 'Itemis AG',
      period: 'June 2022 – August 2026',
      from: '2022-06',
      to: '2026-08',
      location: 'Hamburg',
      summary: 'Enterprise web platforms across frontend and backend, delivered in agile teams.',
      featured: true,
      projects: [
        {
          name: 'parcIT',
          description:
            'Modernization of a legacy Smalltalk client-server system into a scalable web application.',
        },
        {
          name: 'DB Vertrieb',
          description:
            'Multi-channel sales platform with microservices, travel information and partner APIs.',
        },
        {
          name: 'PKV',
          description:
            'Web platform for hospice service applications, built with Vue, TypeScript, Java and Spring Boot.',
        },
      ],
      stack: ['CI/CD', 'TDD', 'Docker', 'Kubernetes', 'Agile teamwork'],
    },
    {
      id: 'nuuk',
      role: 'Software Developer',
      company: 'Nuuk GmbH',
      period: 'June 2021 – August 2021',
      from: '2021-06',
      to: '2021-08',
      summary: 'Frontend and backend development.',
      stack: ['Java', 'React'],
    },
    {
      id: 'dps',
      role: 'Student Software Developer',
      company: 'DPS Engineering',
      period: 'May 2019 – March 2021',
      from: '2019-05',
      to: '2021-03',
      summary: 'Web applications.',
      stack: ['Java', 'Spring Boot', 'JavaScript', 'C#'],
    },
    {
      id: 'flying-pixel',
      role: 'Student Software Developer',
      company: 'Flying Pixel',
      period: 'October 2018 – April 2019',
      from: '2018-10',
      to: '2019-04',
      summary: 'Responsive applications.',
      stack: ['Angular', 'JavaScript', 'Sass'],
    },
  ],

  earlierRoles: [
    { role: 'IT Instructor' },
    { role: 'Website Administrator' },
    { role: 'Software Programmer' },
    { role: 'IT Administrator' },
  ],

  skills: [
    {
      label: 'Frontend',
      icon: 'code',
      items: ['Vue', 'Nuxt', 'Angular', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
    },
    {
      label: 'Backend',
      icon: 'server',
      items: ['Java', 'Spring Boot', 'Spring MVC', 'C#'],
    },
    {
      label: 'APIs & Data',
      icon: 'database',
      items: ['GraphQL', 'SQL', 'MySQL'],
    },
    {
      label: 'DevOps',
      icon: 'cloud',
      items: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Azure'],
    },
    {
      label: 'Tools',
      icon: 'tool',
      items: ['Git', 'Jira', 'Claude Code', 'Gemini', 'ChatGPT'],
    },
  ],

  education: [
    {
      degree: 'MSc IT Engineering',
      institution: 'Fachhochschule Wedel',
      year: '2021',
      note: 'Master’s thesis: Machine learning approaches for hate speech detection.',
    },
    {
      degree: 'BSc Computer Software Engineering',
      institution: 'Quchan University of Advanced Technology',
      year: '2013',
    },
  ],

  projects: [
    {
      id: 'star-wars-explorer',
      date: '09 / 2026',
      category: 'Vue · TypeScript',
      title: 'Star Wars Explorer',
      subtitle: 'Searchable, filterable character and film explorer',
      description:
        'A Vue.js app built for the FIS-Gruppe Vue.js code challenge, using the public read-only SWAPI API.',
      highlights: [
        'Search, gender filter and sorting for characters, with the state kept in the URL so views can be shared.',
        'Character and film detail pages with resolved relationships between people and films.',
        'Client-side create, edit and delete, persisted in localStorage while the API stays read-only.',
        'Favorites, dark mode and an undo toast for deleted characters.',
      ],
      tags: ['Vue 3.5', 'TypeScript', 'Pinia', 'Vue Router', 'Tailwind CSS', 'Vitest'],
      repoUrl: 'https://github.com/kobrarahimi200/star-war-explorer',
      icon: 'globe',
      visual: {
        kind: 'flow',
        steps: ['Search & filter', 'URL query state', 'Pinia store', 'Resolved relations'],
      },
    },
    {
      id: 'mylo-coding-harness',
      date: '10 / 2026',
      category: 'Electron · TypeScript · AI agents',
      title: 'Mylo Coding Harness',
      subtitle: 'Local-first desktop workspace for AI coding agents',
      description:
        'An open-source desktop app for running AI coding agents inside real local projects, with a review-first workflow.',
      highlights: [
        'Plans are reviewed and approved before execution; commands and code changes are approved one by one.',
        'Proposed edits appear as an editable Monaco diff before they are applied.',
        'Validation runs the project’s test, lint and typecheck commands, and failures are fed back to the agent.',
        'Built-in terminal, in-app browser and workspace file explorer.',
      ],
      tags: ['Electron', 'React', 'TypeScript', 'Rust', 'Tailwind CSS'],
      repoUrl: 'https://github.com/kobrarahimi200/Mylo-Coding-Harness',
      icon: 'tool',
      visual: {
        kind: 'image',
        src: `${import.meta.env.BASE_URL}projects/mylo-coding-harness.png`,
        alt: 'Mylo Coding Harness desktop interface showing the plan and diff review workflow',
        width: 1525,
        height: 1031,
      },
    },
    {
      id: 'mylo-math-tutor',
      date: '10 / 2026',
      category: 'Python · LangGraph · React',
      title: 'Mylo Math Tutor',
      subtitle: 'AI mathematics tutor with verified solutions and visuals',
      description:
        'A math tutor with a Python LangGraph core, a FastAPI adapter and a React/TypeScript learning workspace.',
      highlights: [
        'LangGraph routes each question to explanation, solving or clarification.',
        'SymPy solves and checks equations and indefinite integrals.',
        'Validated visualization specs render as function plots, geometry and step-by-step views.',
        'Saved conversations in SQLite, plus a terminal interface that uses the same graph.',
      ],
      tags: ['Python', 'LangGraph', 'FastAPI', 'SymPy', 'React', 'TypeScript'],
      repoUrl: 'https://github.com/kobrarahimi200/mylo-math-tutor',
      icon: 'graduation',
      visual: {
        kind: 'flow',
        steps: ['Analyze', 'Explain / Solve', 'SymPy check', 'Visualize'],
      },
    },
  ],
  languages: [
    { language: 'Persian', level: 'Native' },
    { language: 'English', level: 'Fluent' },
    { language: 'German', level: 'C1' },
  ],
};
