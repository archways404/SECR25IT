import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const REVEAL_AT = '2025-09-01T09:00:00+02:00';

export default function Countdown({ onReveal }) {
  // helper
  const calc = () => {
    const diff = dayjs(REVEAL_AT).diff(dayjs());
    if (diff <= 0) return null;

    const d = dayjs.duration(diff);
    return {
      totalHours: Math.floor(d.asHours()),   // 168, 27, 07, etc.
      minutes: d.minutes(),
      seconds: d.seconds(),
    };
  };

  const [left, setLeft] = useState(calc);

  useEffect(() => {
    if (!left) return onReveal();            // already expired
    const id = setInterval(() => {
      const next = calc();
      setLeft(next);
      if (!next) {
        clearInterval(id);
        onReveal();
      }
    }, 1_000);
    return () => clearInterval(id);
  }, []);                                    // run once

  if (!left) return null;                    // timer hit 0 → nothing

  const fmt = (n) => String(n).padStart(2, '0');

  return (
    <div className="flex flex-col items-center mt-10 text-center">
      <div className="text-6xl md:text-8xl font-mono text-green-400 px-8 py-5 rounded-lg">
        <span>{left.totalHours}</span>
        <span>:</span>
        <span>{fmt(left.minutes)}</span>
        <span>:</span>
        <span>{fmt(left.seconds)}</span>
      </div>
    </div>
  );
}