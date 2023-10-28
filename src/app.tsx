import Header from './components/Header';
import Banner from './components/Banner';
import Nutrients from './components/Nutrients';
import UserApi from './userApi';
import Activity from './components/Activity';
import AverageSessions from './components/AverageSession';
import Performance from './components/Performance';
import Score from './components/Score';
import styles from './app.module.scss';

function App() {
  const userData = UserApi();

  return (
    <div className={styles.appContainer}>
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
          <div className={styles.graph}>
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
            </div>
            <div className={styles.graphBas}>
              <div className={styles.averageSession}>
                <p className={styles.textAverage}>Durée moyenne des sessions</p>
                <AverageSessions />
              </div>
              <div className={styles.performance}>
                <Performance />
              </div>
              <div className={styles.score}>
                <Score />
              </div>
            </div>
          </div>
          <Nutrients />
        </div>
      </div>
    </div>
  );
}
export default App;
