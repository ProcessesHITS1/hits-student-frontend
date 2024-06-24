import { Companies } from "../components/companies/Companies"
import { Root } from "../components/Root";
import { Login } from "../components/Login"
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Profile } from "../components/profile/Profile";
import { Routes } from "./routes";
import { Progress } from "../components/progress/Progress";
import { NavbarContainer } from "../components/common/Navbar/NavbarContainer";
import { Chats } from "../components/chats/Chats";
import { Practice } from "../components/practice/Practice";

export const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route path={Routes.Login} element={<Login />} />
      <Route element={<NavbarContainer />}>
        <Route path={Routes.Profile} element={<Profile />} />
        <Route path={Routes.Companies} element={<Companies />}/>
        <Route path={Routes.Chats} element={<Chats />} />
        <Route path={Routes.Practice} element={<Practice />}/>
        <Route path={Routes.Progress}>
          <Route path=":requestId" element={<Progress />}/>
        </Route>
      </Route>
    </Route>
  ));