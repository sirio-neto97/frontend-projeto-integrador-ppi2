import styles from './Container.module.css';

export default function Container(props) {
	const custom = props.customClass ?? '';

	return (
		<div className={`${styles.container} ${styles[custom]}`}>
			{props.children}
		</div>
	);
}