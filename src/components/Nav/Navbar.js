import styles from './Navbar.module.css';

function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Notes App</div>
    </header>
  );
}

export default Navbar;
