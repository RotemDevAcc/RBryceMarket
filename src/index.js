import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Login from './features/login/Login';
import Super from './features/supermarket/Super';
import DarkMode from './features/settings/DarkMode';
import Layout from './Layout';
import Contact from './Contact';
import { ToastContainer } from 'react-toastify';
import Profile from './Profile';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer position="top-center" theme='dark' />
        <DarkMode/>
        <Routes>
        <Route
            path="/*"
            element={<Layout />}
          >
            <Route index element={<App />} />
            <Route path="super" element={<Super />} />
            <Route path="login" element={<Login />} />
            <Route path="contact" element={<Contact />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
