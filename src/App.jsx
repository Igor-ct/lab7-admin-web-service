import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Dashboard from './pages/admin/Dashboard/Dashboard';
import AdminInventory from './pages/admin/AdminInventory/AdminInventory';
import AdminInventoryCreate from './pages/admin/AdminInventoryCreate/AdminInventoryCreate';
import AdminInventoryDetails from './pages/admin/AdminInventoryDetails/AdminInventoryDetails';
import AdminInventoryEdit from './pages/admin/AdminInventoryEdit/AdminInventoryEdit';
import NotFound from './pages/admin/NotFound/NotFound';
import AdminLayout from './components/admin/layout/AdminLayout';
import ClientLayout from './components/client/layout/ClientLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<ClientLayout />}>
        
        
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          
          <Route path="inventory">
            <Route index element={<AdminInventory />} />
            <Route path="create" element={<AdminInventoryCreate />} />
            <Route path=":id" element={<AdminInventoryDetails />} />
            <Route path="edit/:id" element={<AdminInventoryEdit />} />
          </Route>
        </Route>
           
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;