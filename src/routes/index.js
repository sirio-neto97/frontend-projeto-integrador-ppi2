import React from 'react';
import PrivateRoute from './PrivateRoute';
import { Routes, Route } from 'react-router-dom';

import Announcements from '../pages/Admin/Announcements/index';
import Home from '../pages/Home';
import Automoveis from '../pages/Automoveis';
import AutomovelView from '../pages/Automoveis/view';
import Contato from '../pages/Contato';
import NotFound from '../pages/NotFound';

import Login from '../pages/Admin/Login';
import Company from '../pages/Admin/Company';
import EditAnnouncement from '../pages/Admin/Announcements/edit';
import CreateAnnouncement from '../pages/Admin/Announcements/create';

export default function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/automoveis" element={<Automoveis />} />
			<Route path="/automoveis/:id" element={<AutomovelView />} />
			<Route path="/contato" element={<Contato />} />

			<Route path="/login" element={<Login />}/>

			<Route path="/admin" element={<PrivateRoute/>}>
				<Route exact path="/admin" element={<Announcements />}/>
				<Route exact path="/admin/announcements" element={<Announcements />}/>
				<Route exact path="/admin/announcements/add" element={<CreateAnnouncement />}/>
				<Route exact path="/admin/announcements/edit/:id" element={<EditAnnouncement />}/>
				<Route exact path="/admin/company" element={<Company />}/>
			</Route>

			<Route path="*" element={<NotFound />}/>
		</Routes>
	);
}