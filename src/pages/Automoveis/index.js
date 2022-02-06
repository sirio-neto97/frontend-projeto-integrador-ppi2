import React, { useState, useEffect } from 'react';
import { List } from '../../Components/StyledComponents/StyledPage';
import { useNavigate } from 'react-router-dom';

import { getAllForListing } from '../../services/announcementApi';

import styles from './Index.module.css';

export default function Automoveis() {
	const initialState = {
		announcements: []
	};
	const [state, setState] = useState(initialState);
	const navigate = useNavigate();

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

	const handleView = function(id) {
		return navigate(`/automoveis/${id}`);
	}

	useEffect(() => {
		loadAnnouncements();
	}, []);

	return (
		<>
			<h1>Automóveis</h1>
			<div className={styles.index}>
				<List>
					{state.announcements.length ?
					<li className="header-li">
						<div className="col-2"></div>
						<div className="col-4">Modelo</div>
						<div className="col-2">Ano</div>
						<div className="col-3 d-none d-sm-block">Localização</div>
					</li>
				: <h4>Nenhum veículo encontrado.</h4>}
				{state.announcements.map((announcement) => (
					<li className="list-item" key={announcement.id} onClick={() => handleView(announcement.id)}>
						<img className={`${styles.div_image} col-2`} src={announcement.imagePath} alt=""/>
						<div className="col-5">{announcement.modelo} </div>
						<div className="col-2">{announcement.ano_modelo} </div>
						<div className="col-3 d-none d-sm-block">{announcement.localizacao} </div>
					</li>
				))}
				</List>
			</div>
		</>
	);
}