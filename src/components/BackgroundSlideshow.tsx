import { useEffect, useState } from "react";
import "../css/slideshow.css";
import { slides } from "../data/slides";

// How long each picture is held, and how long the crossfade takes (ms).
// Keep FADE in sync with --fade in slideshow.css.
const HOLD = 9000;
const FADE = 4200;

interface SlideState {
  current: number;
  previous: number | null;
}

const BackgroundSlideshow = () => {
  const [state, setState] = useState<SlideState>({ current: 0, previous: null });

  // Advance on a timer; pause while the tab is hidden.
  useEffect(() => {
    let id: number | undefined;
    const start = () => {
      id = window.setInterval(() => {
        setState((s) => ({
          current: (s.current + 1) % slides.length,
          previous: s.current,
        }));
      }, HOLD);
    };
    const onVisibility = () => {
      window.clearInterval(id);
      if (!document.hidden) start();
    };
    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Once the new picture has fully faded in, retire the old one.
  useEffect(() => {
    if (state.previous === null) return;
    const t = window.setTimeout(
      () => setState((s) => ({ ...s, previous: null })),
      FADE + 400
    );
    return () => window.clearTimeout(t);
  }, [state.current, state.previous]);

  return (
    <>
      <div className="slideshow" aria-hidden="true">
        {slides.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            decoding="async"
            className={
              i === state.current
                ? "slide active"
                : i === state.previous
                ? "slide leaving"
                : "slide"
            }
          />
        ))}
      </div>
      <div className="slideshow-scrim" aria-hidden="true" />
    </>
  );
};

export default BackgroundSlideshow;
