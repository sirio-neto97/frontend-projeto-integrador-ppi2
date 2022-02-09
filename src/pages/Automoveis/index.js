import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { List } from '../../Components/StyledComponents/StyledPage';
import { useNavigate } from 'react-router-dom';

import { getAllForListing } from '../../services/announcementApi';

import styles from './Index.module.css';

export default function Automoveis() {
	const initialState = {
		announcements: []
	};
	const [state, setState] = useState(initialState);
	const [filter, setFilter] = useState({});
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

	const handleFilter = function(e) {
		e.preventDefault();
	}

	const handleFilterChange = function() {

	}

	useEffect(() => {
		loadAnnouncements();
	}, []);

	return (
		<>
			<h1>Automóveis</h1>
			<div className={styles.index}>
				<Row>
					<Col sm={2} className={styles.filter}>
						<h4>Filtros</h4>
						<Form onSubmit={handleFilter}>
							<Form.Group className="mb-3">
								<Form.Label htmlFor="modelo">Modelo</Form.Label>
								<Form.Control type="modelo" name="modelo" id="modelo" value={filter.modelo} onChange={handleFilterChange}/>
							</Form.Group>
							<Form.Group className="mb-5">
								<Form.Label htmlFor="marca">Marca</Form.Label>
								<Form.Control type="marca" name="marca" id="marca" value={filter.marca} onChange={handleFilterChange}/>
							</Form.Group>
							<Form.Group className="mb-2 text-center">
								<a href="#">Limpar Filtros</a>
							</Form.Group>
							<Form.Group className="mb-3">
								<button className="btn btn-dark">Filtrar</button>
							</Form.Group>
						</Form>
					</Col>

					<Col sm={10}>
						<div className="border-bottom">
						{state.announcements.length ?
							<h4>{state.announcements.length} automóveis obtidos</h4>
							:	<h4>Nenhum veículo encontrado.</h4>}
						</div>
						<List>
							{state.announcements.map((announcement) => (
								<li className="list-item" key={announcement.id} onClick={() => handleView(announcement.id)}>
									<img className={`${styles.div_image} col-2`} src={announcement.imagePath} alt=""/>
									<div className="col-5">{announcement.modelo} </div>
									<div className="col-2">Ano: {announcement.ano_modelo} </div>
									<div className="col-3 d-none d-sm-block">Localização: {announcement.localizacao}</div>
								</li>
							))}
						</List>
					</Col>
				</Row>
			</div>
		</>
	);
}