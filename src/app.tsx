import styles from './app.module.scss';
import Header from './components/Header';
import Banner from './components/Banner';

function App (){
  return (
    <>
    <Header />
    <Banner />
      {
        <div className= {styles.home}>
        <h1>Bonjour <span className= {styles.prenom}>Thomas</span></h1>
        <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        </div>
      }
    </>
  );
}

export default App;