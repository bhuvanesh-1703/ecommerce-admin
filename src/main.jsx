import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Users from './components/users.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<App />}></Route>
  //       <Route path="/users" element={<Users />}></Route>
  //     </Routes>
  //   </BrowserRouter>
  // </StrictMode>
  <StrictMode>
    <App />
  </StrictMode>
);
