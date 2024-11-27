import { Link, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

const Header = () => {
    const location = useLocation();

    return (
        <header className={styles.header}>
            <Link
                to="/"
                className={location.pathname === '/' ? styles.linkActive : styles.link}
            >
                Queue
            </Link>
            <Link
                to="/archive"
                className={location.pathname === '/archive' ? styles.linkActive : styles.link}
            >
                Archive
            </Link>
        </header>
    );
};
export default Header