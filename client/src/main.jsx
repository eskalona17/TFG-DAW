import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import App from '@/App.jsx';
import React from 'react';
import '@/index.css';

Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
