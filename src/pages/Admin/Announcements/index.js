import React, { useState, useEffect } from 'react';
import { Title, List, Actions } from '../../../Components/StyledComponents/StyledPage';
import { Link } from 'react-router-dom';

import * as announcementApi from '../../../services/announcementApi';

export default function Announcements() {
	const initialState = {
		announcements: []
	};
	const [state, setState] = useState(initialState);

	const loadAnnouncements = async e => {
		await announcementApi.getAllForListing()
		.then(function(res) {
			if (res) {
				setState({announcements: res});
			}
		})
		.catch(function(error) {
			console.log(error);
		});
	}

	const handleDelete = async function(id) {
		const response = await announcementApi.remove(id);
		const announcements = state.announcements.filter(function(ad) {
			return ad.id !== id;
		});

		setState({announcements: announcements})

		alert(response.message);
	}

	useEffect(() => {
		loadAnnouncements();
	}, []);

	return (
		<>
			<Title>Cadastro de automóveis</Title>
			<Link to={`/admin/announcements/add`} className="btn success-btn">Cadastrar Automóvel</Link>
			<List>
				{state.announcements.map((announcement) => (
					<li key={announcement.id}>
						<span>{announcement.modelo} </span>
						<Actions>
							<button onClick={() => handleDelete(announcement.id)}>Excluir</button>
							<Link to={`/admin/announcements/edit/${announcement.id}`}>Editar</Link>
							<Link to={`/announcement/${announcement.id}`}>Detalhes</Link>
						</Actions>
					</li>
				))}
			</List>
		</>
	);
}