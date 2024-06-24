import ReactDOM from 'react-dom/client'
import './styles/index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './infrastructure/router';
import { SeasonContextProvider } from './components/SeasonContextProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
      <SeasonContextProvider>
        <RouterProvider router={router} />
      </SeasonContextProvider>
  </>,
)
