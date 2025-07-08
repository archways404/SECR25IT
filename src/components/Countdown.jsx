import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration'; // ← add
import relativeTime from 'dayjs/plugin/relativeTime'; // ← add

dayjs.extend(duration); // ← extend once, before using
dayjs.extend(relativeTime);

const REVEAL_AT = '2025-09-01T09:00:00+02:00'; // Stockholm

export default function Countdown({ onReveal }) {
	const [remaining, setRemaining] = useState(dayjs(REVEAL_AT).diff(dayjs(), 'second'));

	useEffect(() => {
		if (remaining <= 0) return onReveal();
		const id = setInterval(() => setRemaining(dayjs(REVEAL_AT).diff(dayjs(), 'second')), 1000);
		return () => clearInterval(id);
	}, [remaining]);

	if (remaining <= 0) return null;

	return (
		<p className="text-xs text-gray-400 mt-6">
			Hint drops in {dayjs.duration(remaining, 'seconds').humanize()}
		</p>
	);
}
