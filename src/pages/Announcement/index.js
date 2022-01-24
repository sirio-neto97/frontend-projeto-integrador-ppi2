import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getById } from '../../services/announcementApi';
import { List } from '../../Components/StyledComponents/StyledPage';


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
			<h1>{announcement.modelo}</h1>
			<List>
				<li><span className="attribute-title">Marca:</span> {announcement.marca}</li>
				<li><span className="attribute-title">Cor:</span> {announcement.cor}</li>
				<li><span className="attribute-title">Portas:</span> {announcement.nro_portas}</li>
				<li><span className="attribute-title">Placa:</span> {announcement.placa}</li>
				<li><span className="attribute-title">Km:</span> {announcement.quilometragem}</li>
				<li><span className="attribute-title">Ano Modelo:</span> {announcement.ano_modelo}</li>
				<li><span className="attribute-title">Ano Fabricação:</span> {announcement.ano_fabricacao}</li>
				<li><span className="attribute-title">Localização:</span> {announcement.localizacao}</li>
				<li><span className="attribute-title">Preço FIPE:</span> {announcement.preco_fipe}</li>
				<li><span className="attribute-title">Preço Repasse:</span> {announcement.preco}</li>
				<li><span className="attribute-title">Situação:</span> {announcement.situacao}</li>
			</List>
			<button onClick={() => navigate(-1)} className="btn btn-danger">Voltar</button>
		</>
	);
}