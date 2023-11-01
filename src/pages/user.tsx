import Header from '../components/Header';
import Banner from '../components/Banner';
import Nutrients from '../components/Nutrients';
import UserApi from '../services/userApi';
import Activity from '../components/Activity';
import AverageSessions from '../components/AverageSession';
import Performance from '../components/Performance';
import Score from '../components/Score';
import styles from './user.module.scss';

function User() {
  const userData = UserApi();

  if (userData === null) {
    // Afficher un message d'erreur si les données ne sont pas disponibles
    return (  
    <div className={styles.appContainer}>
      <Header />
      <Banner />
      <div className={styles.home}>
        <h1 className={styles.titleError}>Oupssss 😕😕</h1> 
        <p className={styles.textError}>Une erreur s'est produite lors de la récupération des données. Veuillez vérifier l'URL ou réessayer ultérieurement.</p>
      </div>
    </div> 
  ) }

  return (
    <div className={styles.appContainer}>
      <Header />
      <Banner />
      <div className={styles.home}>
        <h1>
          Bonjour <span className={styles.prenom}>{userData.data.userInfos.firstName} </span>
        </h1>
        <p>Félicitations ! Vous avez dépassé vos objectifs hier 👏</p>
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
export default User;
