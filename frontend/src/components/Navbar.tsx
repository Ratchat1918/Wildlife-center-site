import '../style.css'
import { Link } from 'react-router-dom';
const Navbar = () =>{
    return(
        <nav className="navbar-container">
            <ul>
                <Link className='navbar-link' to='/'><li>Home</li></Link>
                <Link className='navbar-link' to='/login'><li>Log in</li></Link>
            </ul>
        </nav>
    )
}
export default Navbar;