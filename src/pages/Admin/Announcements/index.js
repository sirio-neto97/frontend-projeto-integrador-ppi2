import React, { useState, useEffect } from 'react';
import { Title, List, Actions } from '../../../Components/StyledComponents/StyledPage';
import { BsTrash } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import * as announcementApi from '../../../services/announcementApi';

export default function Announcements() {
	const initialState = {
		announcements: [],
		buttons: {
			deleteMass: {
				className: 'btn btn-danger disabled'
			}
		}
	};
	const [state, setState] = useState(initialState);

	const loadAnnouncements = async e => {
		await announcementApi.getAllForListing()
		.then(function(res) {
			if (res) {
				setState({
					...state,
					announcements: res
				});
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

		setState({
			...state,
			announcements: announcements
		})

		alert(response.message);
	}

	useEffect(() => {
		loadAnnouncements();
	}, []);

	return (
		<>
			<Title>Cadastro de automóveis</Title>
			<div className="d-flex justify-content-between">
				<Link to={`/admin/announcements/add`} className="btn btn-success">Cadastrar Automóvel</Link>
				<Link to={`/admin/announcements/deleteMass`} className={state.buttons.deleteMass.className} title='Excluir selecionados'><BsTrash></BsTrash></Link>
			</div>
			<List>
				<li className="header-li">
					<div className="col-1">
						<input type="checkbox" name="select-all" id="select-all"/>
					</div>
					<div className="col-4">Modelo</div>
					<div className="col-1">Ano</div>
					<div className="col-2">Localização</div>
					<div className="col-1">Ações</div>
				</li>
				{state.announcements.map((announcement) => (
					<li className="list-item" key={announcement.id}>
						<div className="col-1">
							<input type="checkbox" value={announcement.id} />
						</div>
						<div className="col-4">{announcement.modelo} </div>
						<div className="col-1">{announcement.ano_modelo} </div>
						<div className="col-2">{announcement.localizacao} </div>
						<Actions className="col-1">
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