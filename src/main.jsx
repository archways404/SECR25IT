import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './glob.css';
import Home from './pages/Home';
import { KeyAssembler } from './components/KeyAssembler';
import KeyHint from './pages/KeyHint';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/assemble"
					element={<KeyAssembler />}
				/>
				<Route
					path="/k/:id"
					element={<KeyHint />}
				/>{' '}
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
