import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Contato.module.css';
import { getContactData } from '../../services/companyApi';

export default function Contato() {
	const [contactData, setContactData] = useState({});

	const loadContactData = async function() {
		await getContactData()
		.then(function(res) {
			setContactData(res);
		});
	}

	useEffect(() => {
		loadContactData();
	}, []);

	return (
		<>
			<h1>Contato</h1>
			<div className={styles.contato}>
				{contactData.whatsapp || contactData.facebook || contactData.instagram ?
				<div className={styles.items}>
					<h4>Redes sociais:</h4>
					{contactData.whatsapp ?
						<p><span className={styles.attribute}>WhatsApp:</span><span className={styles.attribute_value}> {contactData.whatsapp}</span></p>
					: ''}
					{contactData.facebook ?
						<p><span className={styles.attribute}>Facebook:</span><span className={styles.attribute_value}> {contactData.facebook}</span></p>
					: ''}
					{contactData.instagram ?
						<p><span className={styles.attribute}>Instagram:</span><span className={styles.attribute_value}> {contactData.instagram}</span></p>
					: ''}
				</div>
				: ''}

				{contactData.email ?
				<div className={styles.items}>
					<h4>E-mail</h4>
					<p><span className={styles.attribute_value}>{contactData.email}</span></p>
				</div>
				: ''}
			</div>
		</>
	);
}