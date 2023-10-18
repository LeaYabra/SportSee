import styles from './bannerLeft.module.scss';
import icon1 from '../../assets/icon1.svg';
import icon2 from '../../assets/icon2.svg';
import icon3 from '../../assets/icon3.svg';
import icon4 from '../../assets/icon4.svg';
function BannerLeft (){
  return (
    <div className={styles.banner}>
      {
        <div className={styles.icons}>
            <img src={icon1} alt="icon1" className={styles.iconLeft}></img>
            <img src={icon2} alt="icon2" className={styles.iconLeft}></img>
            <img src={icon3} alt="icon3" className={styles.iconLeft}></img>
            <img src={icon4} alt="icon4" className={styles.iconLeft}></img>
            <p className={styles.text}>Copiryght, SportSee 2020</p>
        </div>
      }
    </div>
  );
}

export default BannerLeft;
