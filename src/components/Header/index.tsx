import styles from './header.module.scss';
import logo from '../../assets/logo.png';

function Header (){
  return (
    <header>
      {
        <div className={styles.head}>
        <img src={logo} className={styles.logo} alt="logo" />
        <p className={styles.headerText}> Accueil </p>
        <p className={styles.headerText}> Profil </p>
        <p className={styles.headerText}> Réglage </p>
        <p className={styles.headerText}> Communauté </p>
        </div>
      }
    </header>
  );
}

export default Header;
