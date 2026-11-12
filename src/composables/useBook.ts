import { computed, ref } from 'vue';
import { bookPages } from '@/content/bookPages';
import { portfolio } from '@/content/portfolio';
import {
  canGoNext,
  canGoPrev,
  clampFace,
  faceForSpread,
  faceIndexById,
  spreadCount,
  spreadForFace,
} from '@/book/bookState';
import type { ChapterId, Chapter, BookPageDef } from '@/types/portfolio';
import { usePageSound } from '@/composables/usePageSound';

/**
 * Shared navigation state for the single book on the page.
 * Module-level so the header menu, table of contents and book all control the same face.
 */
const pageIds = bookPages.map((page) => page.id);
const faceCount = bookPages.length;
const face = ref(0);

const currentPage = computed<BookPageDef>(() => bookPages[face.value] ?? bookPages[0]!);
const spread = computed(() => spreadForFace(face.value));
const totalSpreads = spreadCount(faceCount);
const currentChapter = computed<Chapter | null>(
  () => portfolio.chapters.find((chapter) => chapter.id === currentPage.value.chapterId) ?? null,
);

/** First face index of each chapter, used by the table of contents. */
function firstFaceOfChapter(chapterId: ChapterId): number {
  return bookPages.findIndex((page) => page.chapterId === chapterId);
}

export function useBook() {
  const { playPageTurn } = usePageSound();

  function goToFace(target: number) {
    face.value = clampFace(target, faceCount);
  }

  function goToPage(id: string) {
    const index = faceIndexById(pageIds, id);
    if (index >= 0) goToFace(index);
  }

  function goToChapter(chapterId: ChapterId) {
    const index = firstFaceOfChapter(chapterId);
    if (index >= 0) goToFace(index);
  }

  /** Moves to a face as a page turn, playing the page sound only if the face actually changed. */
  function turnTo(target: number) {
    const before = face.value;
    goToFace(target);
    if (face.value !== before) playPageTurn();
  }

  /** Desktop turns a whole spread (two faces); mobile turns one face at a time. */
  function forward(desktop: boolean) {
    if (!canGoNext(face.value, faceCount)) return;
    turnTo(desktop ? faceForSpread(spread.value + 1, faceCount) : face.value + 1);
  }

  function backward(desktop: boolean) {
    if (!canGoPrev(face.value)) return;
    turnTo(desktop ? faceForSpread(spread.value - 1, faceCount) : face.value - 1);
  }

  return {
    face,
    faceCount,
    spread,
    totalSpreads,
    currentPage,
    currentChapter,
    canNext: computed(() => canGoNext(face.value, faceCount)),
    canPrev: computed(() => canGoPrev(face.value)),
    goToFace,
    goToPage,
    goToChapter,
    forward,
    backward,
    firstFaceOfChapter,
  };
}
