import ReactDOM from 'react-dom/client'
import './styles/index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './infrastructure/router';
import { SeasonContextProvider } from './components/SeasonContextProvider';
import { UserInfoContextProvider } from './components/UserInfoContextProvider';
import { SemesterContextProvider } from './components/practice/SemesterContextProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <UserInfoContextProvider>
      <SeasonContextProvider>
          <SemesterContextProvider>
            <RouterProvider router={router} />
          </SemesterContextProvider>
      </SeasonContextProvider>
    </UserInfoContextProvider>
  </>,
)
