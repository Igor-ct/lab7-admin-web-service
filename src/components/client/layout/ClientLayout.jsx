import { Outlet } from 'react-router-dom';
import Header from './Header/Header';           
import Filters from './Filters/Filters';        
import MainContent from './MainContent/MainContent';
import Footer from './Footer/Footer';          
import styles from './ClientLayout.module.css';

export default function ClientLayout() {
  return (
    <div className={styles.clientWrapper}>
      <Header />
      
      <div className={styles.middleSection}>
        <aside className={styles.filtersArea}>
          <Filters />
        </aside>
        
        <MainContent>
          <Outlet /> 
        </MainContent>
      </div>

      <Footer />
    </div>
  );
}