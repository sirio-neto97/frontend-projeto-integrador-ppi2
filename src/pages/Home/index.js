import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import background from '../../img/home.jpeg';

export default function Home() {
	return (
		<div className={styles.home}>
			<div className={styles.container} style={{
				backgroundImage: `url(${background})`,
			}}>
			</div>
			<div className={`${styles.redirect} btn btn-warning`}>
				<Link to="/automoveis">Ver automóveis</Link>
			</div>
		</div>
	);
}