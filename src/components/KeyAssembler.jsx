import { useEffect, useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sha256 } from 'js-sha256';

/* ---------- helpers ---------- */
const normalize = (s) => s.trim().toLowerCase().replace(/\*+/g, 'u');

const HASH_KEY = (i) => `seg-${i}`; // stores the SHA-256 hash
const PLAIN_KEY = (i) => `seg-${i}-plain`; // stores normalized text for UI only

/* ---------- expected (hashed) ---------- */

const EXPECTED_HASHES = [
	'ab1436a5a6e3f6037355137e7831eb7b2533b5fd572eac81957fac0bd52e9b69',
	'56ccc4dcfc96534b06fc0c08a301be24f13b491484d5d984953cc0dba9bbb89a',
	'792529ac23b791b9a8fafe4a17f0b827fa2cf75c90de516fbb1191e843d477f7',
	'123be5a1c6bd953921ecf961f2808e7491f7bffaabd5be46f65155cf27e25aba',
	'3333f6bd20648b6166ae0a0b4a0b904d6d143e2b8eff402579e43f45a98c4911',
	'e7f6c011776e8db7cd330b54174fd76f7d0216b612387a5ffcfb81e6f0919683',
];

/* ---------- component ---------- */
export function KeyAssembler() {
	const navigate = useNavigate();

	/* gatekeeper */
	useEffect(() => {
		if (localStorage.getItem('entrance-id') !== 'ok') navigate('/');
	}, [navigate]);

	/* state hydrated from localStorage */
	const [parts, setParts] = useState(() =>
		EXPECTED_HASHES.map((h, i) =>
			localStorage.getItem(HASH_KEY(i)) === h ? localStorage.getItem(PLAIN_KEY(i)) || '' : ''
		)
	);

	const [status, setStatus] = useState(() =>
		EXPECTED_HASHES.map((h, i) => localStorage.getItem(HASH_KEY(i)) === h)
	);

	const solved = status.every(Boolean); // all six correct
	const secret = localStorage.getItem(PLAIN_KEY(4)) || parts[4];
	/* handlers */
	const handle = (i, v) =>
		setParts((p) => {
			const next = [...p];
			next[i] = v;
			return next;
		});

	const check = () => {
		const results = parts.map((val, i) => {
			const hashed = sha256(normalize(val));
			return hashed === EXPECTED_HASHES[i];
		});

		setStatus(results);

		results.forEach((ok, i) => {
			if (ok) {
				localStorage.setItem(HASH_KEY(i), EXPECTED_HASHES[i]); // secure
				localStorage.setItem(PLAIN_KEY(i), normalize(parts[i])); // UI refill
			}
		});
	};

	const inputWidth = (i) => {
		switch (i) {
			case 0:
				return 'w-24';
			case 1:
				return 'w-24';
			case 2:
				return 'w-58';
			case 3:
				return 'w-48';
			case 4:
				return 'w-40';
			case 5:
				return 'w-16';
			default:
				return 'w-40';
		}
	};

	const border = (i) =>
		status[i] == null ? 'border-gray-600' : status[i] ? 'border-green-500' : 'border-red-500';

	/* ---------- UI ---------- */
	return (
		<main className="min-h-screen relative flex flex-col items-center justify-center bg-gray-900 text-green-400 font-mono p-6">
			<Link
				to="/"
				className="absolute top-28 left-28 underline text-sm">
				↩ Back to keypad
			</Link>

			{/* hint buttons stacked top-to-bottom */}
			<div className="flex flex-col gap-3 mt-2 w-20px max-w-xs">
				{Array.from({ length: 6 }).map((_, i) => (
					<Link
						key={i}
						to={`/k/${i + 1}`}
						className={`px-4 py-2 rounded text-center ${
							status[i]
								? 'bg-gray-700 cursor-not-allowed opacity-50'
								: 'bg-gray-800 hover:bg-green-700 text-white'
						}`}>
						K{i + 1} Hint
					</Link>
				))}
			</div>

			<div className="mt-12">
				<h1 className="text-2xl mb-6">Assemble the Key</h1>

				{/* solved banner (never in source until solved) */}
				{solved && (
					<div className="mt-10 mb-10 text-4xl font-bold text-yellow-400 animate-pulse">
						KEY: {secret}
					</div>
				)}
			</div>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					check();
				}}
				className="space-y-6">
				<div className="flex flex-wrap items-center gap-2 text-lg">
					{parts.map((val, i) => (
						<Fragment key={i}>
							<input
								value={val}
								onChange={(e) => handle(i, e.target.value)}
								placeholder={`K${i + 1}`}
								className={`${inputWidth(i)} rounded border px-2 py-1 bg-gray-800 ${border(i)}`}
							/>
							{i === 0 && <span> - </span>}
							{i === 1 && <span>, </span>}
							{i === 5 && <span>.</span>}
						</Fragment>
					))}
				</div>

				<button className="w-full bg-green-700 hover:bg-green-600 text-white py-2 rounded">
					Check
				</button>
			</form>
		</main>
	);
}
