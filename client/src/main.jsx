import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Assignments from './pages/Assignments';
import StudentWork from './pages/StudentWork';
import EssayDetails from './pages/EssayDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, 
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/assignments',
        element: <Assignments />
      },
      {
        path: '/studentwork/:assignmentID',
        element: <StudentWork />
      },
      {
        path: '/essaydetails/:essayID',
        element: <EssayDetails />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)


