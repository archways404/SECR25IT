// Home.jsx
import KeyForm from '../components/KeyForm';
import Countdown from '../components/Countdown';
import { useState } from 'react';

export default function Home() {
	const [showHint, setShowHint] = useState(false);

	return (
		<main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-green-400 font-mono p-6">
			<h1 className="text-2xl mb-8 text-center">IM Force Terminal — Enter Secret Key</h1>
			<KeyForm />
			{showHint ? (
				<p className="mt-4 text-xs text-gray-400 text-center">
					Stuck? First operative to visit{' '}
					<a
						className="underline"
						href="https://classified.example">
						classified.example
					</a>{' '}
					may find an alternative route.
				</p>
			) : (
				<Countdown onReveal={() => setShowHint(true)} />
			)}
		</main>
	);
}
