import Header from './components/Header';
import Banner from './components/Banner';
import Nutrients from './components/Nutrients';
import UserApi from './userApi';
import Activity from './components/Activity';
import AverageSessions from './components/AverageSession';
import styles from './app.module.scss';

function App() {
  const userData = UserApi();

  return (
    <>
      <Header />
      <Banner />
      <div className={styles.home}>
        {userData ? (
          <>
            <h1>
              Bonjour <span className={styles.prenom}>{userData.data.userInfos.firstName} </span>
            </h1>
            <p>Félicitations ! Vous avez dépassé vos objectifs hier 👏</p>
          </>
        ) : (
          <p>Chargement en cours...</p>
        )}
        <div className={styles.dashboard}>
          <div className={styles.activity}>
            <div className={styles.text}>
              <p className={styles.activityText}>Activité quotidienne</p>
              <div className={styles.dotContainer}>
                <span className={styles.dotBlack}></span>
                <p className={styles.dotText}> Poids (kg)</p>
                <span className={styles.dotRed}></span>
                <p className={styles.dotText}> Calories brûlées (kCal)</p>
              </div>
            </div>
            <Activity />
            <AverageSessions />
          </div>
          <Nutrients />
        </div>
      </div>
    </>
  );
}
export default App;
