import React, { useState, useEffect } from 'react';
import { List } from '../../Components/StyledComponents/StyledPage';
import { Link } from 'react-router-dom';

import { getAllForListing } from '../../services/announcementApi';

export default function Main() {
	const initialState = {
		announcements: []
	};
	const [state, setState] = useState(initialState);

	const loadAnnouncements = async e => {
		await getAllForListing()
		.then(function(res) {
			if (res) {
				setState({announcements: res});
			}
		})
		.catch(function(error) {
			console.log(error);
		});
	}

	useEffect(() => {
		loadAnnouncements();
	}, []);

	return (
		<>
			<h1>Veículos</h1>
			<List>
				{state.announcements.map((announcement) => (
					<li key={announcement.id}>
						<span>{announcement.modelo} </span>
						<Link to={`/announcement/${announcement.id}`}>Detalhes</Link>
					</li>
				))}
			</List>
		</>
	);
}