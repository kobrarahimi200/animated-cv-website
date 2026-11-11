/**
 * Pure layout math for the career timeline. No DOM or Vue imports, so it can be unit tested.
 * Months are indexed as year * 12 + (month - 1), which keeps every calculation in integers.
 */

export interface TimelineInput {
  id: string;
  label: string;
  /** Start month, YYYY-MM */
  from: string;
  /** End month, YYYY-MM, inclusive */
  to: string;
}

export interface TimelineBar {
  id: string;
  label: string;
  leftPct: number;
  widthPct: number;
}

export interface TimelineTick {
  year: number;
  leftPct: number;
}

export interface TimelineLayout {
  bars: TimelineBar[];
  ticks: TimelineTick[];
}

export function monthIndex(yearMonth: string): number {
  const [year = 0, month = 1] = yearMonth.split('-').map(Number);
  return year * 12 + (month - 1);
}

/** Positions bars and year ticks as percentages of the timeline span, rounded out to whole years. */
export function layoutTimeline(items: TimelineInput[], tickEveryYears = 2): TimelineLayout {
  if (items.length === 0) return { bars: [], ticks: [] };

  const earliest = Math.min(...items.map((item) => monthIndex(item.from)));
  const latestExclusive = Math.max(...items.map((item) => monthIndex(item.to) + 1));
  const startMonth = Math.floor(earliest / 12) * 12;
  const endMonth = Math.ceil(latestExclusive / 12) * 12;
  const span = endMonth - startMonth;

  const pct = (month: number) => ((month - startMonth) / span) * 100;

  const bars = items.map((item) => {
    const start = pct(monthIndex(item.from));
    const end = pct(monthIndex(item.to) + 1);
    return { id: item.id, label: item.label, leftPct: start, widthPct: end - start };
  });

  const ticks: TimelineTick[] = [];
  for (let year = startMonth / 12; year < endMonth / 12; year += tickEveryYears) {
    ticks.push({ year, leftPct: pct(year * 12) });
  }

  return { bars, ticks };
}
