import CryptoJS from 'crypto-js';
import ConfettiBurst from '../components/ConfettiBurst';

export default function Success() {
	const pwd = localStorage.getItem('seg-4-plain');
	const CIPHERTEXT =
		'U2FsdGVkX1+Rlb1amlVzbkKPU+ZUhFtEm3qe4Bl+A2cmNvMOoNPlo13jCCg0+/nzNjfhtif+KGOiNrx8mGKhf44RNAuBoWOY+YPF3hd3DMqs+360FIWdeGCQRDsaZ7+00ceE3f9WxKH44iG4wffNUA==';

	let pdfLink = null;
	if (pwd) {
		try {
			const bytes = CryptoJS.AES.decrypt(CIPHERTEXT, pwd);
			const url = bytes.toString(CryptoJS.enc.Utf8);
			if (url.startsWith('http')) pdfLink = url;
		} catch (e) {
			/* bad password => ignore */
		}
	}

	return (
		<main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-green-400 p-6">
			<ConfettiBurst />
			<h1 className="text-3xl font-bold mb-6 text-center">Mission Accomplished!</h1>
			<p className="text-lg mb-8 text-white max-w-xl leading-relaxed">
				Goddamn — whether you pieced together every clue or just waited patiently for that countdown
				timer to hit zero, this is for you. A well-deserved gift for the effort you put in!
				<br />
				<br />
				Some say there's no better taste than victory... but they clearly haven't had McDonald's. 😉
				Just kidding.
				<br />
				<br />
				Thanks again — seriously.
				<br />
				<span className="block mt-4 font-semibold">Philip S.</span>
			</p>

			{pdfLink && (
				<a
					href={pdfLink}
					target="_blank"
					rel="noopener noreferrer"
					className="bg-green-700 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded">
					🎁 Download gift
				</a>
			)}
		</main>
	);
}
