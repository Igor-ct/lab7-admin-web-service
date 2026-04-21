import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { InventoryProvider } from './store/InventoryContext.jsx'
import { FavoritesProvider } from './store/FavoritesContext.jsx' 
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InventoryProvider>
      <FavoritesProvider>
        <App/>
      </FavoritesProvider>
    </InventoryProvider>
  </StrictMode>,
)
