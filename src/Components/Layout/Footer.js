import styles from './Footer.module.css';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<ul className={styles.list}>
				<li className={styles.item}>
					<Link to="/"><FaFacebook /></Link>
				</li>
				<li className={styles.item}>
					<Link to="/"><FaInstagram /></Link>
				</li>
				<li className={styles.item}>
					<Link to="/"><FaWhatsapp /></Link>
				</li>
			</ul>
			<p>
				<span className={styles.copy_right_company}>Sul Car Repasses</span>
				<span className={styles.copy_right}> &copy; 2022</span>
			</p>
		</footer>
	);
}