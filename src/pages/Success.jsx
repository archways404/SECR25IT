import ConfettiBurst from '../components/ConfettiBurst';

export default function Success() {
	return (
		<main className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 text-gray-800 p-6">
			<ConfettiBurst />
			<h1 className="text-3xl font-bold mb-4 text-center">Mission Accomplished!</h1>
			<p className="text-lg mb-8 text-center max-w-md">
				You cracked the key. Bring this screen to Philip (or look under the keyboard #3) to claim
				your golden, possibly crispy, reward 🍟.
			</p>
		</main>
	);
}
