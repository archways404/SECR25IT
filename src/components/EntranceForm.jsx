// components/EntranceForm.jsx
import { useState } from 'react';
import { sha256 } from 'js-sha256';

const ENTRANCE_HASH = '6ac589242aae46142599b6995aa32ca6f18fab3a669fe996aac2ae14ee3955fa';

export default function EntranceForm({ onUnlock }) {
	const [code, setCode] = useState('');
	const [error, setError] = useState(null);

	const submit = (e) => {
		e.preventDefault();
		if (sha256(code.trim()) === ENTRANCE_HASH) {
			localStorage.setItem('entrance-id', 'ok');
			onUnlock();
		} else {
			setError('Wrong code, no access — try again');
		}
	};

	return (
		<form
			onSubmit={submit}
			className="space-y-4 max-w-xs text-center">
			<input
				autoFocus
				value={code}
				onChange={(e) => setCode(e.target.value)}
				placeholder="Access code"
				className="w-full rounded border px-3 py-2 bg-gray-800 text-green-300"
			/>
			{error && <p className="text-red-500 text-sm">{error}</p>}
			<button className="w-full bg-green-700 hover:bg-green-600 text-white py-2 rounded">
				Enter
			</button>
		</form>
	);
}
