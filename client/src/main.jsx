// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import App from './App.jsx';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Signup from './pages/Signup';

// ReactDOM.render(
//   <Router>
//     <Routes>
//       <Route path="/" element={<App />}>
//         <Route index element={<Home />} />
//         <Route path="login" element={<Login />} />
//         <Route path="signup" element={<Signup />} />
//       </Route>
//     </Routes>
//   </Router>,
//   document.getElementById('root')
// );

import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <NoMatch />,
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
      }
      // , {
      //   path: '/success',
      //   element: <Success />
      // }, {
      //   path: '/orderHistory',
      //   element: <OrderHistory />
      // }, {
      //   path: '/products/:id',
      //   element: <Detail />
      // }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
