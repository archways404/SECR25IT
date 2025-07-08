import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const REVEAL_AT = '2025-09-01T09:00:00+02:00'; // ISO string (Stockholm tz)

export default function Countdown({ onReveal }) {
	const [remaining, setRemaining] = useState(dayjs(REVEAL_AT).diff(dayjs(), 'second'));

	useEffect(() => {
		if (remaining <= 0) return onReveal();
		const t = setInterval(() => setRemaining(dayjs(REVEAL_AT).diff(dayjs(), 'second')), 1000);
		return () => clearInterval(t);
	}, [remaining]);

	if (remaining <= 0) return null;

	return (
		<p className="text-sm text-gray-500">
			Hint drops in {dayjs.duration(remaining, 'seconds').humanize()}
		</p>
	);
}
