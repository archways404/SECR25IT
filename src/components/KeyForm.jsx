// KeyForm.jsx
import { useState } from 'react';
import { sha256 } from 'js-sha256';
import { useNavigate } from 'react-router-dom';

const SOLUTION_HASH = '3333f6bd20648b6166ae0a0b4a0b904d6d143e2b8eff402579e43f45a98c4911';

export default function KeyForm() {
	const [value, setValue] = useState('');
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const onSubmit = (e) => {
		e.preventDefault();
		const ok = sha256(value.trim().toLowerCase()) === SOLUTION_HASH;
		if (ok) {
			navigate('/complete');
		} else {
			setError('Incorrect key — keep decoding!');
		}
	};

	return (
		<form
			onSubmit={onSubmit}
			className="w-full max-w-md space-y-4">
			<input
				type="text"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="Enter secret key"
				className="w-full rounded border px-3 py-2 shadow bg-gray-800 text-green-300 focus:outline-none"
			/>
			{error && <p className="text-red-500 text-sm">{error}</p>}
			<button
				type="submit"
				className="w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-2 rounded">
				Unlock Mission
			</button>
		</form>
	);
}
