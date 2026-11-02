import { MILESTONES } from "../data/timeline";
import type { Category, Milestone } from "../data/timeline";

/* ------------------------------------------------------------------ *
 * Unlock time
 * Reported (from regional PlayStation Store listings): GTA VI unlocks at
 * midnight local time on 19 November 2026 in most regions. The US and
 * Canada share one nationwide unlock at midnight Eastern (05:00 UTC).
 * ------------------------------------------------------------------ */

export const US_CA_UNLOCK_UTC = Date.UTC(2026, 10, 19, 5, 0, 0);

const NA_EXACT = new Set([
  // United States
  "America/New_York", "America/Detroit", "America/Chicago", "America/Denver",
  "America/Boise", "America/Phoenix", "America/Los_Angeles", "America/Anchorage",
  "America/Juneau", "America/Sitka", "America/Nome", "America/Yakutat",
  "America/Metlakatla", "America/Adak", "Pacific/Honolulu",
  // Canada
  "America/Toronto", "America/Montreal", "America/Vancouver", "America/Edmonton",
  "America/Winnipeg", "America/Regina", "America/Halifax", "America/St_Johns",
  "America/Moncton", "America/Glace_Bay", "America/Goose_Bay", "America/Whitehorse",
  "America/Dawson", "America/Dawson_Creek", "America/Fort_Nelson",
  "America/Yellowknife", "America/Inuvik", "America/Iqaluit",
  "America/Rankin_Inlet", "America/Resolute", "America/Cambridge_Bay",
  "America/Swift_Current", "America/Creston", "America/Atikokan",
  "America/Blanc-Sablon", "America/Pangnirtung", "America/Thunder_Bay",
  "America/Nipigon", "America/Rainy_River",
]);
const NA_PREFIXES = [
  "America/Indiana/", "America/Kentucky/", "America/North_Dakota/", "US/", "Canada/",
];

export const detectTimeZone = (): string => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
};

export const isUsOrCanada = (tz: string): boolean =>
  NA_EXACT.has(tz) || NA_PREFIXES.some((p) => tz.startsWith(p));

/** The moment the game unlocks for this visitor (ms since epoch). */
export const getUnlockTime = (tz: string = detectTimeZone()): number =>
  isUsOrCanada(tz)
    ? US_CA_UNLOCK_UTC
    : new Date(2026, 10, 19, 0, 0, 0).getTime(); // midnight in the visitor's own time zone

/* ------------------------------ formatting ------------------------------ */

export const formatUnlock = (ts: number): string =>
  new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(ts);

export const formatToday = (now: number): string =>
  new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);

export const formatShortDate = (now: number): string =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
    .format(now)
    .toUpperCase();

export const daysLeft = (now: number, unlock: number): number =>
  Math.max(0, Math.floor((unlock - now) / 86400000));

/* ------------------------------- timeline ------------------------------- */

export interface TimelineItem {
  kind: "event" | "here" | "divider" | "year";
  milestone?: Milestone;
  category?: Category;
  phase?: "past" | "future";
  side?: "left" | "right";
  /** When the milestone happens (ms). null when there is no firm date. */
  when?: number | null;
  year?: string;
}

const classify = (m: Milestone, now: number, unlock: number) => {
  const when = m.isLaunch ? unlock : m.sortDate;
  const isPast = when !== null && when <= now;
  // A confirmed milestone that hasn't happened yet is "Upcoming".
  const category: Category =
    m.category === "confirmed" && !isPast ? "upcoming" : m.category;
  return { when, isPast, category };
};

/** How many milestones sit in each category right now (for the filter chips). */
export const countByCategory = (
  now: number,
  unlock: number
): Partial<Record<Category, number>> => {
  const counts: Partial<Record<Category, number>> = {};
  for (const m of MILESTONES) {
    const { category } = classify(m, now, unlock);
    counts[category] = (counts[category] ?? 0) + 1;
  }
  return counts;
};

/** "3 months ago", "in 17 days"... */
export const formatRelative = (when: number | null | undefined, now: number): string => {
  if (when === null || when === undefined) return "";
  const days = Math.round((when - now) / 86400000);
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
  if (Math.abs(days) < 45) return rtf.format(days, "day");
  if (Math.abs(days) < 330) return rtf.format(Math.round(days / 30.44), "month");
  return rtf.format(Math.round(days / 365.25), "year");
};

/**
 * Orders the milestones around today's date, adds year markers and drops the
 * "You Are Here" marker where it belongs. Categories in `hidden` are filtered
 * out. Re-run whenever the date, launch state or filters change.
 */
export const buildTimeline = (
  now: number,
  unlock: number,
  hidden: ReadonlySet<Category> = new Set<Category>()
): TimelineItem[] => {
  const past: TimelineItem[] = [];
  const future: TimelineItem[] = [];

  for (const m of MILESTONES) {
    const { when, isPast, category } = classify(m, now, unlock);
    if (hidden.has(category)) continue;
    (isPast ? past : future).push({
      kind: "event",
      milestone: m,
      category,
      phase: isPast ? "past" : "future",
      when,
    });
  }

  const items: TimelineItem[] = [];
  let lastYear = "";
  const add = (list: TimelineItem[]) => {
    for (const it of list) {
      const y = it.milestone!.year;
      if (y !== lastYear) {
        items.push({ kind: "year", year: y });
        lastYear = y;
      }
      items.push(it);
    }
  };

  add(past);
  items.push({ kind: "here" });
  if (future.length > 0) items.push({ kind: "divider" });
  add(future);

  let n = 0;
  for (const it of items) {
    if (it.kind === "event") it.side = n++ % 2 === 0 ? "left" : "right";
  }
  return items;
};
