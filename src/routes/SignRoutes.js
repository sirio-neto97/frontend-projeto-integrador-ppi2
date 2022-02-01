import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Admin/Announcements/login';

export default function SignRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/admin" element={<Login />}/>
			</Routes>
		</BrowserRouter>
	);
}