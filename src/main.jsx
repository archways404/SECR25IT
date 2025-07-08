import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './glob.css';
import Home from './pages/Home';
import Success from './pages/Success';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/complete"
					element={<Success />}
				/>
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
