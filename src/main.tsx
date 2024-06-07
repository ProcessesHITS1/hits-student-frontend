import ReactDOM from 'react-dom/client'
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './infrastructure/router';
import { Initializer } from './components/Initializer';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Initializer />
    <RouterProvider router={router} />
  </>,
)
