import './style.css'
import Calendar from './components/Calendar';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './components/About';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Regestration from './components/Regestretion';

const router = createBrowserRouter([
  {path: '/', element: <App />},
  {path:'/tickets', element:<Calendar/>},
  {path: '/login', element: <Login />},
  {path: '/regestration', element: <Regestration />}
])

function App() {
  return (
    <>
      <Navbar></Navbar>
      <About></About>
      <Footer></Footer>
    </>
  )
}

export default function AppWrapper() {
  return <RouterProvider router={router} />;
}