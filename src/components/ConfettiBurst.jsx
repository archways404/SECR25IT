// Confetti.jsx
import React from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

export default function ConfettiBurst() {
	const [width, height] = useWindowSize();
	return (
		<Confetti
			width={width}
			height={height}
			recycle={false}
			numberOfPieces={400}
		/>
	);
}
