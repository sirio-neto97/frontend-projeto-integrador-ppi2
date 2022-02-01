import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Announcements from '../pages/Admin/Announcements/index';
import EditAnnouncement from '../pages/Admin/Announcements/edit';
import CreateAnnouncement from '../pages/Admin/Announcements/create';
import Main from '../pages/Main';
import Announcement from '../pages/Announcement';

export default function OtherRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" exact element={<Main />} />
				<Route path="/announcement/:id" element={<Announcement />} />

				<Route path="/admin" element= {<Announcements />}/>
				<Route path="/admin/announcements/add" element= {<CreateAnnouncement />}/>
				<Route path="/admin/announcements/edit/:id" element= {<EditAnnouncement />}/>
			</Routes>
		</BrowserRouter>
	);
}