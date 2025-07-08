import { useState } from 'react';
import { hash } from '../utils/hash';
import { useNavigate } from 'react-router-dom';

export default function KeyForm() {
	const [input, setInput] = useState('');
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const SOLUTION_HASH = '3333f6bd20648b6166ae0a0b4a0b904d6d143e2b8eff402579e43f45a98c4911';

	const handleSubmit = (e) => {
		e.preventDefault();
		if (hash(input) === SOLUTION_HASH) {
			navigate('/complete'); // or setSuccess(true) if SPA only
		} else {
			setError('Incorrect key — keep decoding!');
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-4 max-w-md">
			<input
				value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder="Enter secret key"
				className="w-full rounded border px-3 py-2 shadow"
			/>
			{error && <p className="text-red-500 text-sm">{error}</p>}
			<button
				type="submit"
				className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700">
				Unlock
			</button>
		</form>
	);
}
