import { Fragment } from "react";
import "../css/countdownsection.css";
import Countdown from "react-countdown";
import { formatUnlock, getUnlockTime } from "../utils/release";

interface CountdownRendererProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

const pad = (num: number) => String(num).padStart(2, "0");

// Unlock time for this visitor: midnight local time on 19 November 2026
// (US and Canada share one unlock at midnight Eastern). See utils/release.ts.
const unlockTime = getUnlockTime();
const targetDate = new Date(unlockTime);

const units = ["Days", "Hours", "Minutes", "Seconds"] as const;

const renderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: CountdownRendererProps) => {
  if (completed) {
    return <p className="release-day">It’s release day. Welcome to Leonida.</p>;
  }
  const values = [days, hours, minutes, seconds];
  return (
    <div className="countdown-container" role="timer" aria-label="Time until launch">
      {units.map((label, i) => (
        <Fragment key={label}>
          {i > 0 && (
            <span className="countdown-sep" aria-hidden="true">
              :
            </span>
          )}
          <div className="countdown-timer">
            <span className="countdown-number">{pad(values[i])}</span>
            <span className="countdown-label">{label}</span>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

const CountdownSection = () => {
  return (
    <section className="countdown-section">
      <Countdown date={targetDate} renderer={renderer} />
      <p className="countdown-sub">PlayStation 5 · Xbox Series X|S · PC not announced</p>
      <p className="countdown-note">
        <strong>Your unlock: {formatUnlock(unlockTime)}</strong>
        <br />
        Based on regional PlayStation Store listings. Check your store page near
        launch.
      </p>
    </section>
  );
};

export default CountdownSection;
