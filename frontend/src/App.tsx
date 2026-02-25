import './style.css'
import Calendar from './components/Calendar';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Login></Login>
      <Calendar></Calendar>
      <Footer></Footer>
    </>
  )
}

export default App