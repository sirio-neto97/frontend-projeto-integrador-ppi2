import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getById } from '../../services/announcementApi';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './View.module.css';


export default function Announcement() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [announcement, setAnnouncement] = useState({});

	const loadAnnouncement = async e => {
		const data = await getById(id);
		if (data) {
			setAnnouncement(data);
		}
	}

	useEffect(() => {
		loadAnnouncement();
	}, []);

	return (
		<>
			<h1 className={styles.title}>{announcement.modelo}</h1>

			<Container className="bg-white">
				{/* Dados automovel */}
				<Row>
					<Col>
						<span className={styles.attribute}>Placa: </span>
						<span className={styles.attribute_value}>{announcement.placa}</span>
					</Col>
					<Col>
						<span className={styles.attribute}>Marca: </span>
						<span className={styles.attribute_value}>{announcement.marca}</span>
					</Col>
					<Col>
						<span className={styles.attribute}>Cor: </span>
						<span className={styles.attribute_value}>{announcement.cor}</span>
					</Col>
					<Col>
						<span className={styles.attribute}>Portas: </span>
						<span className={styles.attribute_value}>{announcement.nro_portas}</span>
					</Col>
					<Col>
						<span className={styles.attribute}>Km: </span>
						<span className={styles.attribute_value}>{announcement.quilometragem}</span>
					</Col>
				</Row>
				<Row>
					<Col>
						<span className={styles.attribute}>Ano Modelo: </span>
						<span className={styles.attribute_value}>{announcement.ano_modelo}</span>
					</Col>
					<Col>
						<span className={styles.attribute}>Ano Fabricação: </span>
						<span className={styles.attribute_value}>{announcement.ano_fabricacao}</span>
					</Col>
					<Col>
						<span className={styles.attribute}>Localização: </span>
						<span className={styles.attribute_value}>{announcement.localizacao}</span>
					</Col>
					<Col>
						<span className={styles.attribute}>Preço FIPE: </span>
						<span className={styles.attribute_value}>{announcement.preco_fipe}</span>
					</Col>
					<Col>
						<span className={styles.attribute}>Preço Repasse: </span>
						<span className={styles.attribute_value}>{announcement.preco}</span>
					</Col>
					<Col>
						<span className={styles.attribute}>Situação: </span>
						<span className={styles.attribute_value}>{announcement.situacao}</span>
					</Col>
				</Row>

				{/* Imagens automovel */}
				<Row>
					<Col>
					{/*  */}
					</Col>
				</Row>
				<button onClick={() => navigate(-1)} className="btn btn-danger">Voltar</button>
			</Container>

		</>
	);
}