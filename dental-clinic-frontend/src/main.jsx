import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initKeycloak } from './auth/keycloak'

const root = ReactDOM.createRoot(document.getElementById('root'));

initKeycloak(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
