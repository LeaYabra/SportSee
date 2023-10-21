import styles from './app.module.scss';
import Header from './components/Header';
import Banner from './components/Banner';
import Nutrients from './components/Nutrients';
import UserApi from './userApi';
import Activity from './components/Activity';
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
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
         
          </>
        ) : (
          <p>Chargement en cours...</p>
        )}
        <div className={styles.dashboard}>
          <div className={styles.activity}>
            <div className={styles.text}>
            <p className={styles.activityText}>Activité quotidienne</p>
            <div className={styles.dotContainer}>
            <div className={styles.dotBlack}></div>
            <p className={styles.dotText}> Poids(kg)</p>
            <div className={styles.dotRed}></div>
            <p className={styles.dotText}> Calories brûlées (kCal)</p>
            </div>
            </div>
            <Activity/> 
          </div>
          <Nutrients />
        </div>
        
      </div>
    </>
  );

}
export default App;