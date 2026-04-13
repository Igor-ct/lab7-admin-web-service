import Header from './components/Layout/Header/Header';
import Sidebar from './components/Layout/Sidebar/Sidebar';
import MainWorkspace from './components/Layout/MainWorkspace/MainWorkspace';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.adminLayout}>
      <Header />
      <div className={styles.mainContainer}>
        <Sidebar />
        <MainWorkspace />
      </div>
    </div>
  );
}

export default App;