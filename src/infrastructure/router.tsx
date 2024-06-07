import { Companies } from "../components/Companies"
import { Login } from "../components/Login"
import { Profile } from "../components/Profile"
import { SideNavbar } from "../components/SideNavbar"
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

export const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/'>
      <Route path="login" element={<Login />} />
      <Route element={<SideNavbar />}>
        <Route path="profile" element={<Profile />} />
        <Route path="companies" element={<Companies />}/>
      </Route>
    </Route>
  ));