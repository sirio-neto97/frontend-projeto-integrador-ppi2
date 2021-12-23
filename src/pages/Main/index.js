import React, { useState } from 'react';
import { Container, Form, SubmitButton, List } from './styles';
import { Link } from 'react-router-dom';

import announcementApi from '../../services/announcementApi';

export default function Main() {
	const initialState = {
		announcements: []
	};
	const [state, setState] = useState(initialState);

	const handleSubmit = async e => {
		e.preventDefault();
		const { data } = await announcementApi.get();

		if (data) {
			setState({
				announcements: data
			});
		}
	}

	return (
		<Container>
			<h1>Cadastro de automóveis</h1>

			<Form onSubmit={handleSubmit}>
				<SubmitButton>Listar</SubmitButton>
			</Form>

			<List>
				{state.announcements.map((announcement) => (
					<li key={announcement.id}>
						<span>{announcement.modelo} </span>
						<Link to={`/announcement/${announcement.id}`}>Detalhes</Link>
					</li>
				))}
			</List>
		</Container>
	);
}