import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getById } from '../../services/announcementApi';
import { Container } from '../../Components/StyledComponents/StyledPage'
import { Row, Col } from 'react-bootstrap';
import { FaWhatsapp } from 'react-icons/fa';
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

	const getParsedSituation = function(situationId) {
		switch (situationId) {
			case 1:
				return 'Disponível';
			case 3:
				return 'Reservado';

			default:
				return 'Vendido';
		}
	}

	useEffect(() => {
		loadAnnouncement();
	}, []);

	return (
		<>
			<h1 className={styles.title}>{announcement.modelo}</h1>
			<Container className="bg-white">
				<h4 className="pb-3">Ficha técnica</h4>
				<Row className="mb-3">
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
				<Row className="mb-3">
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
						<span className={styles.attribute}>Situação: </span>
						<span className={styles.attribute_value}>{getParsedSituation(announcement.situacao)}</span>
					</Col>
				</Row>
				<Row className="border-bottom pb-5">
					<Col sm={3}>
						<span className={styles.attribute}>Preço FIPE: </span>
						<span className={styles.attribute_value}>{announcement.preco_fipe}</span>
					</Col>
					<Col sm={3}>
						<span className={styles.attribute}>Preço Repasse: </span>
						<span className={styles.attribute_value}>{announcement.preco}</span>
					</Col>
				</Row>

				<Row className="mt-3">
					<h4 className="pb-3">Imagens</h4>
					{announcement.images && announcement.images[0] ?
						announcement.images.map((image) => (
							<Col sm={2}>
								<div className={styles.image}>
									<img src={image.path} alt="" />
								</div>
							</Col>
						))
					: <p>Nenhuma imagem registrada..</p>}
				</Row>
				<Row>
					<Col>
						<button onClick={() => navigate(-1)} className="btn btn-danger">Voltar</button>
					</Col>
					<Col>
						<button onClick={() => navigate(-1)} className="btn btn-success"><FaWhatsapp/>  Chame-nos já!</button>
					</Col>
				</Row>
			</Container>
		</>
	);
}