import { useEffect, useState } from 'react';
import EntranceForm from '../components/EntranceForm';
import KeyForm from '../components/KeyForm';
import Countdown from '../components/Countdown';
import Success from './Success';

export default function Home() {
	const [entranceOK, setEntranceOK] = useState(false);
	const [showHint, setShowHint] = useState(false);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		if (localStorage.getItem('entrance-id') === 'ok') setEntranceOK(true);
	}, []);

	if (!entranceOK)
		return (
			<main className="min-h-screen flex items-center justify-center bg-gray-900 text-green-400 font-mono p-6">
				<EntranceForm onUnlock={() => setEntranceOK(true)} />
			</main>
		);

	if (success) return <Success />;

	return (
		<main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-green-400 font-mono p-6">
			<div className="pb-10">
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
			</div>

			<KeyForm onSuccess={() => setSuccess(true)} />
		</main>
	);
}
