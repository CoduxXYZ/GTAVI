import { useEffect, useRef, useState } from "react";
import "../css/timeline.css";
import { CATEGORY_INFO, HERE_BODY, ICON_PATHS } from "../data/timeline";
import type { Category, Milestone } from "../data/timeline";
import {
  buildTimeline,
  countByCategory,
  daysLeft,
  formatRelative,
  formatToday,
  formatUnlock,
  getUnlockTime,
} from "../utils/release";

// The moment the game unlocks for this visitor, based on their time zone.
const UNLOCK = getUnlockTime();
const FILTERS: Exclude<Category, "here">[] = [
  "confirmed",
  "leaked",
  "speculation",
  "upcoming",
];
const pad = (n: number) => String(n).padStart(2, "0");

const Icon = ({ category }: { category: Category }) => (
  <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
    <path d={ICON_PATHS[category]} />
  </svg>
);

// Fades a card in the first time it scrolls into view.
const useReveal = () => {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, className: shown ? "ev-card in" : "ev-card" };
};

const HereCard = ({ now }: { now: number }) => {
  const { ref, className } = useReveal();
  const launched = now >= UNLOCK;
  const s = Math.floor(Math.max(0, UNLOCK - now) / 1000);
  const d = daysLeft(now, UNLOCK);
  const parts: [string, string][] = [
    [pad(d), "Days"],
    [pad(Math.floor((s % 86400) / 3600)), "Hours"],
    [pad(Math.floor((s % 3600) / 60)), "Minutes"],
    [pad(s % 60), "Seconds"],
  ];
  return (
    <article ref={ref} className={`${className} here-card`}>
      <span className="pin">
        <Icon category="here" />
        You are here
      </span>
      <p className="here-today">{formatToday(now)}</p>
      <h3>
        {launched
          ? "Launch day is here"
          : `${d} ${d === 1 ? "Day" : "Days"} to Launch`}
      </h3>
      <div className="here-clock" role="timer" aria-label="Time until your unlock">
        {parts.map(([value, label]) => (
          <div key={label}>
            <b>{value}</b>
            <small>{label}</small>
          </div>
        ))}
      </div>
      <p className="ev-body">{HERE_BODY}</p>
      <p className="here-unlock">Unlocks {formatUnlock(UNLOCK)} in your time zone</p>
    </article>
  );
};

interface EventCardProps {
  milestone: Milestone;
  category: Category;
  relative: string;
}

const EventCard = ({ milestone: m, category, relative }: EventCardProps) => {
  const { ref, className } = useReveal();
  return (
    <article ref={ref} className={className}>
      <div className="ev-meta">
        <time>{m.dateLabel}</time>
        <span className={`badge ${category}`}>
          <Icon category={category} />
          {CATEGORY_INFO[category].label}
        </span>
        {relative && <span className="rel">{relative}</span>}
      </div>
      <h3>{m.title}</h3>
      <p className="ev-sub">{m.subtitle}</p>
      <p className="ev-body">{m.body}</p>
      {m.link && (
        <a className="ev-link" href={m.link.url} target="_blank" rel="noopener noreferrer">
          <svg className="ico fill" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
          {m.link.label}
        </a>
      )}
    </article>
  );
};

const Timeline = () => {
  const [now, setNow] = useState<number>(() => Date.now());
  const [hidden, setHidden] = useState<Set<Category>>(() => new Set());
  const listRef = useRef<HTMLOListElement | null>(null);

  // Tick every second so the countdown in the "You are here" card is live.
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const items = buildTimeline(now, UNLOCK, hidden);
  const counts = countByCategory(now, UNLOCK);
  const stateKey = `${new Date(now).toDateString()}-${now >= UNLOCK}-${hidden.size}`;

  // Colour the spine up to the "You are here" marker.
  useEffect(() => {
    const setSpine = () => {
      const list = listRef.current;
      const card = list?.querySelector(".here-card");
      if (!list || !card) return;
      const a = card.getBoundingClientRect();
      const b = list.getBoundingClientRect();
      const pct = ((a.top + a.height / 2 - b.top) / b.height) * 100;
      list.style.setProperty("--prog", `${pct.toFixed(1)}%`);
    };
    setSpine();
    window.addEventListener("resize", setSpine);
    return () => window.removeEventListener("resize", setSpine);
  }, [stateKey]);

  const toggle = (c: Category) =>
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });

  const jumpToToday = () =>
    listRef.current
      ?.querySelector(".here-card")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <section className="timeline-section" id="timeline">
      <div className="section-wrap">
        <div className="sec-head">
          <h2>The road to launch</h2>
          <p>From the first leak to launch day.</p>
        </div>

        <p className="filter-hint">Tap a category to show or hide it.</p>
        <div className="legend" role="group" aria-label="Filter timeline by category">
          {FILTERS.map((c) => {
            const off = hidden.has(c);
            return (
              <button
                key={c}
                type="button"
                className={`lg ${c}${off ? " off" : ""}`}
                aria-pressed={!off}
                onClick={() => toggle(c)}
              >
                <b>
                  <Icon category={c} />
                  {CATEGORY_INFO[c].label}
                  <span className="cnt">{counts[c] ?? 0}</span>
                </b>
                <p>{CATEGORY_INFO[c].description}</p>
              </button>
            );
          })}
          <button type="button" className="lg here" onClick={jumpToToday}>
            <b>
              <Icon category="here" />
              {CATEGORY_INFO.here.label}
            </b>
            <p>{CATEGORY_INFO.here.description} Tap to jump there.</p>
          </button>
        </div>

        <ol className="tl2" ref={listRef} aria-label="Release timeline">
          {items.map((it, i) => {
            if (it.kind === "year") {
              return (
                <li key={`y${it.year}`} className="tl-year">
                  <span>{it.year}</span>
                </li>
              );
            }
            if (it.kind === "divider") {
              return (
                <li key={`d${i}`} className="tl-divider">
                  <span>Still ahead</span>
                </li>
              );
            }
            if (it.kind === "here") {
              return (
                <li key="here" className="ev here cat-here">
                  <HereCard now={now} />
                </li>
              );
            }
            const m = it.milestone!;
            const c = it.category!;
            return (
              <li key={m.id} className={`ev ${it.phase} ${it.side} cat-${c}`}>
                <span className="dot">
                  <Icon category={c} />
                </span>
                <EventCard milestone={m} category={c} relative={formatRelative(it.when, now)} />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Timeline;
