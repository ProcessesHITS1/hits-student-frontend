import { Companies } from "../components/companies/Companies"
import { Root } from "../components/Root";
import { Login } from "../components/Login"
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { SideNavbar } from "../components/common/Navbar/SideNavbar";
import { Profile } from "../components/profile/Profile";
import { Routes } from "./routes";
import { Progress } from "../components/progress/Progress";

export const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route path={Routes.Login} element={<Login />} />
      <Route element={<SideNavbar />}>
        <Route path={Routes.Profile} element={<Profile />} />
        <Route path={Routes.Companies} element={<Companies />}/>
        <Route path={Routes.Progress}>
          <Route path=":requestId" element={<Progress />}/>
        </Route>
      </Route>
    </Route>
  ));