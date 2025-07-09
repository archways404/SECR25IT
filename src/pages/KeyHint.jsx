import { Link, useParams } from 'react-router-dom';

const HINTS = {
	1: 'K1 is hidden in the onboarding email archive.',
	2: 'K2 is taped under the break-room coffee grinder.',
	3: 'K3 is printed on the back of the meeting-room whiteboard.',
	4: 'K4 is in commit message #42 on the repo.',
	5: 'K5 is the label on server rack B-3.',
	6: 'K6 is… well, check keyboard #3. 😉',
};

export default function KeyHint() {
	const { id } = useParams();
	const hint = HINTS[id] || 'Unknown key';

	return (
		<main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-green-400 font-mono p-6">
			<p className="mb-8 max-w-sm text-center">{hint}</p>
			<Link
				to="/assemble"
				className="underline">
				↩ Back to assembler
			</Link>
		</main>
	);
}
