import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import Sidebar from './components/layout/Sidebar/Sidebar';
import MainWorkspace from './components/layout/MainWorkspace/MainWorkspace';
import styles from './App.module.css';

import Dashboard from './pages/Dashboard/Dashboard';
import AdminInventory from './pages/AdminInventory/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate/AdminInventoryCreate';
import AdminInventoryDetails from './pages/AdminInventoryDetails/AdminInventoryDetails';
import AdminInventoryEdit from './pages/AdminInventoryEdit/AdminInventoryEdit';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.adminLayout}>
        <Header />
        <div className={styles.mainContainer}>
          <Sidebar />
          <MainWorkspace>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inventory" element={<AdminInventory />} />
              <Route path="/inventory/create" element={<AdminInventoryCreate />} />
              <Route path="/inventory/:id" element={<AdminInventoryDetails />} />
              <Route path="/inventory/edit/:id" element={<AdminInventoryEdit />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainWorkspace>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;