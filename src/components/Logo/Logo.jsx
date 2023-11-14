import styles from './Logo.module.css';
import { memo } from 'react';

function Logo({ image }) {


	return <img className={styles.logo} src={image} alt="Логотип журнала" />;
}

export default memo(Logo);