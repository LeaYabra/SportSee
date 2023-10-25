import styles from './nutrients.module.scss';
import calories from '../../assets/calories.svg';
import glucides from '../../assets/glucides.svg';
import lipides from '../../assets/lipides.svg';
import proteines from '../../assets/proteines.svg';
import userApi from '../../userApi';

interface UserData {
  data: {
    keyData: {
      calorieCount: number;
      proteinCount: number;
      carbohydrateCount: number;
      lipidCount: number;
    };
  };
}

function Nutrients() {
  const userData: UserData = userApi();

  return (
    <div className={styles.nutrients}>
      <div className={styles.nutrient}>
        <img src={calories} alt="calories"></img>
        <div className={styles.text}>
          <p className={styles.unit}>{userData.data.keyData.calorieCount}kCal</p>
          <p className={styles.nutriText}>Calories </p>
        </div>
      </div>
      <div className={styles.nutrient}>
        <img src={proteines} alt="proteines"></img>
        <div className={styles.text}>
          <p className={styles.unit}> {userData.data.keyData.proteinCount}g</p>
          <p className={styles.nutriText}>Proteines </p>
        </div>
      </div>
      <div className={styles.nutrient}>
        <img src={glucides} alt="glucides"></img>
        <div className={styles.text}>
          <p className={styles.unit}> {userData.data.keyData.carbohydrateCount}g</p>
          <p className={styles.nutriText}>Glucides </p>
        </div>
      </div>
      <div className={styles.nutrient}>
        <img src={lipides} alt="lipides"></img>
        <div className={styles.text}>
          <p className={styles.unit}> {userData.data.keyData.lipidCount}g</p>
          <p className={styles.nutriText}>Lipides </p>
        </div>
      </div>
    </div>
  );
}

export default Nutrients;
