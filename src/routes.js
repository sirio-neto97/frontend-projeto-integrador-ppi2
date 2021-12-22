import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Announcement from './pages/Announcement';

export default function AppRoutes() {
	return (
		<Router>
			<Routes>
				<Route path="/" exact element={<Main />} />
				<Route path="/announcement/:id" element={<Announcement />} />
			</Routes>
		</Router>
	);
}