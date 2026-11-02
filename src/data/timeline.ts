export type Category =
  | "confirmed"
  | "leaked"
  | "speculation"
  | "upcoming"
  | "here";

export interface Milestone {
  id: number;
  /** Heading for the year marker on the spine. */
  year: string;
  dateLabel: string;
  /** Used to place the "You are here" marker. null = no firm date. */
  sortDate: number | null;
  category: Exclude<Category, "here">;
  title: string;
  subtitle: string;
  body: string;
  isLaunch?: boolean;
  link?: { label: string; url: string };
}

export const CATEGORY_INFO: Record<Category, { label: string; description: string }> = {
  confirmed: {
    label: "Confirmed",
    description: "Officially announced or confirmed by Rockstar Games.",
  },
  leaked: {
    label: "Leaked",
    description: "Information or footage that surfaced through leaks.",
  },
  speculation: {
    label: "Speculation",
    description: "Unconfirmed information, rumours or industry expectations.",
  },
  upcoming: {
    label: "Upcoming",
    description: "Future events that have not yet occurred.",
  },
  here: {
    label: "You Are Here",
    description: "Where today sits on the road to launch. It moves on its own.",
  },
};

// One SVG path per category icon (24x24 viewBox, stroked).
export const ICON_PATHS: Record<Category, string> = {
  confirmed: "M5 12.5l4.5 4.5L19 7.5",
  leaked: "M12 4l9.5 16h-19z M12 10v4.5 M12 17.2v.1",
  speculation: "M9.2 9.2a2.9 2.9 0 1 1 4.3 2.5c-.9.5-1.5 1.1-1.5 2.1 M12 17.3v.1",
  upcoming: "M12 4a8 8 0 1 0 0 16a8 8 0 1 0 0-16z M12 8v4l3 2",
  here: "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z M12 7.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5z",
};

export const HERE_BODY =
  "We are approaching the final stretch before the release of Grand Theft Auto VI. Anticipation continues to build as players await further announcements, marketing campaigns and additional information ahead of launch.";

const YT = "https://www.youtube.com/watch?v=";

// Keep these in date order. A "confirmed" milestone that is still in the
// future is shown automatically as "Upcoming" until its date passes.
export const MILESTONES: Milestone[] = [
  {
    id: 1,
    year: "2022",
    dateLabel: "SEP 2022",
    sortDate: Date.UTC(2022, 8, 1),
    category: "leaked",
    title: "Development Footage Leak",
    subtitle: "90-clip footage leaked",
    body: "Approximately 90 in-development video clips surfaced online, providing the public with its first substantial look at the next Grand Theft Auto. Rockstar Games confirmed the unauthorised network intrusion the following day.",
  },
  {
    id: 2,
    year: "2023",
    dateLabel: "DEC 2023",
    sortDate: Date.UTC(2023, 11, 1),
    category: "confirmed",
    title: "Official Trailer 1",
    subtitle: "The first official reveal",
    body: "Rockstar Games released the first official GTA VI trailer, introducing Lucia, revisiting Vice City and showcasing the fictional state of Leonida. The trailer became a major internet sensation, breaking viewing records within its first 24 hours.",
    link: { label: "Watch Trailer 1", url: YT + "QdBZY2fkU-0" },
  },
  {
    id: 3,
    year: "2025",
    dateLabel: "MAY 2025",
    sortDate: Date.UTC(2025, 4, 1),
    category: "confirmed",
    title: "Official Trailer 2",
    subtitle: "Jason Duval officially revealed",
    body: "The second trailer introduced Jason Duval as Lucia’s partner, provided a deeper look into Vice City and showcased several supporting characters. The Bonnie and Clyde-inspired relationship between the two protagonists became a central focus.",
    link: { label: "Watch Trailer 2", url: YT + "VQRLujxTm3c" },
  },
  {
    id: 8,
    year: "2025",
    dateLabel: "NOV 6, 2025",
    sortDate: Date.UTC(2025, 10, 6),
    category: "confirmed",
    title: "Release Date Moved",
    subtitle: "Launch delayed to November 19, 2026",
    body: "Rockstar Games moved the launch from May 26, 2026 to November 19, 2026, saying it needed more time to deliver the quality players expect.",
  },
  {
    id: 4,
    year: "2026",
    dateLabel: "JUN 25, 2026",
    sortDate: Date.UTC(2026, 5, 25),
    category: "confirmed",
    title: "Pre-orders",
    subtitle: "Pre-orders become available",
    body: "Pre-orders for Grand Theft Auto VI opened, with editions, pricing and associated bonuses revealed to players.",
  },
  {
    id: 5,
    year: "2026",
    dateLabel: "AUG 27, 2026",
    sortDate: Date.UTC(2026, 7, 27),
    category: "confirmed",
    title: "Extended Look",
    subtitle: "Extended Look premieres",
    body: "A 26-minute, 48-second Extended Look premiered on Netflix before becoming available on YouTube later that evening. The presentation explored gameplay systems, wanted mechanics, robberies, character interactions and the open world.",
    link: { label: "Watch the Extended Look", url: YT + "tJbzMqJGH4k" },
  },
  {
    id: 9,
    year: "2026",
    dateLabel: "OCT 15, 2026",
    sortDate: Date.UTC(2026, 9, 15),
    category: "confirmed",
    title: "Launch Trailer",
    subtitle: "One last look before release",
    body: "Rockstar Games released the Launch Trailer five weeks before release, showing more of Vice City and the action to come.",
    link: { label: "Watch the Launch Trailer", url: YT + "rz1B4B2yBZY" },
  },
  {
    id: 10,
    year: "2026",
    dateLabel: "NOV 12, 2026",
    sortDate: Date.UTC(2026, 10, 12),
    category: "confirmed",
    title: "Pre-load Begins",
    subtitle: "Digital pre-loading opens",
    body: "Digital pre-loading is set to begin one week before launch, so pre-ordered copies are ready to play the moment they unlock.",
  },
  {
    id: 6,
    year: "2026",
    dateLabel: "NOV 19, 2026",
    sortDate: Date.UTC(2026, 10, 19),
    category: "confirmed",
    isLaunch: true,
    title: "GTA VI Official Launch",
    subtitle: "Grand Theft Auto VI arrives",
    body: "Grand Theft Auto VI is scheduled to launch worldwide on PlayStation 5 and Xbox Series X|S. Unlock times vary by region.",
  },
  {
    id: 7,
    year: "2027–2028",
    dateLabel: "2027–2028",
    sortDate: null,
    category: "speculation",
    title: "Potential PC Release",
    subtitle: "PC release window",
    body: "A PC version is widely anticipated based on Rockstar Games’ previous release patterns. However, no official PC release date or window has been confirmed.",
  },
];
