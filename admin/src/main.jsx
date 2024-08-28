import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import AdminProvider from './pages/Context/AdminContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminProvider>
      <App />
    </AdminProvider>
  </StrictMode>,
);
