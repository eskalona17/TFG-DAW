import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import { SocketContextProvider } from "./context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <SocketContextProvider> */}
      <App />
    {/* </SocketContextProvider> */}
  </React.StrictMode>,
)
