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
        <Activity/> 
        <Nutrients />
        
      </div>
    </>
  );

}
export default App;