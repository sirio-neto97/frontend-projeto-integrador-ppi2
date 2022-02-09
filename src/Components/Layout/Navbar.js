import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Context/hooks/useAuth';

import Container from './Container';
import styles from './Navbar.module.css';
import logo from '../../img/logo.png';

export default function Navbar() {
	const { signed } = useAuth();
	const list = signed ? <AdminNavbarList /> : <NavbarList />;

	return (
		<nav className={styles.navbar}>
			<Container>
				<Link to="/">
					<img src={logo} alt="Home" className={styles.logo} />
				</Link>
				{ list }
			</Container>
		</nav>
	);
}

function AdminNavbarList() {
	const context = useAuth();

	const logout = async function(e) {
		e.preventDefault();
		await context.Logout();
	}

	return (
		<ul className={styles.list}>
			<li className={styles.item}>
				<Link to="/">Home</Link>
			</li>
			<li className={styles.item}>
				<Link to="/admin/announcements">Anúncios</Link>
			</li>
			<li className={styles.item}>
				<Link to="/admin/company">Dados da empresa</Link>
			</li>
			<li className={styles.item}>
				<Link to="#" onClick={logout}>Logout</Link>
			</li>
		</ul>
	);
}

function NavbarList() {
	return (
		<ul className={styles.list}>
			<li className={styles.item}>
				<Link to="/">Home</Link>
			</li>
			<li className={styles.item}>
				<Link to="/automoveis">Automóveis</Link>
			</li>
			<li className={styles.item}>
				<Link to="/contato">Contato</Link>
			</li>
			<li className={styles.item}>
				<Link to="/empresa">Empresa</Link>
			</li>
		</ul>
	);
}