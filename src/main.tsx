import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import { Login } from './components/Login'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { SideNavbar } from './components/SideNavbar';
import { Profile } from './components/Profile';
import { Companies } from './components/Companies';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/'>
    <Route path="login" element={<Login />} />
    <Route element={<SideNavbar />}>
      <Route path="profile" element={<Profile />}/>
      <Route path="companies" element={<Companies />}/>
    </Route>
  </Route>
));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
