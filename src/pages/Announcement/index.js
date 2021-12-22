import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import announcementApi from '../../services/announcementApi';
import { Container, List } from './styles';


export default function Announcement() {
	const { id } = useParams();
	const [announcement, setannouncement] = useState({});

	const loadAnnouncement = async e => {
		const { data } = await announcementApi.get(`/${id}`);
		if (data) {
			setannouncement(data);
		}
	}

	useEffect(() => {
		loadAnnouncement();
	}, []);

	return (
		<Container>
			<h1>{announcement.modelo}</h1>
			<List>
				<li>Marca: {announcement.marca}</li>
				<li>Cor: {announcement.cor}</li>
				<li>Placa: {announcement.placa}</li>
				<li>Localização: {announcement.localizacao}</li>
				<li>Preço FIPE: {announcement.preco_fipe}</li>
				<li>Preço Repasse: {announcement.preco}</li>
			</List>
		</Container>
	);
}