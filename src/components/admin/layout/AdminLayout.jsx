import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import MainWorkspace from './MainWorkspace/MainWorkspace';
import styles from './AdminLayout.module.css'; 

function AdminLayout() {
  return (
    <div className={styles.adminLayout}>
      <Header />
      <div className={styles.mainContainer}>
        <Sidebar />
        <MainWorkspace>
            <Outlet />
        </MainWorkspace>
      </div>
    </div>
  );
}

export default AdminLayout;