import { useEffect, useState } from 'react';
import '../style.css'
import { Link } from 'react-router-dom';
const Navbar = () =>{
    const [loggedIn, setLoggedIn] = useState(false);
    const [name, setName] = useState("")
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            setLoggedIn(true);
            let newName = localStorage.getItem("first_name")
            setName(String(newName));
        } else {
            setLoggedIn(false);
        }},[])
    return(
        <nav className="navbar-container">
            <ul>
                <Link className='navbar-link' to='/'><li>Home</li></Link>
                {loggedIn ? (
                    <Link className='navbar-link' to='/account'>My account</Link>
                ) : (
                    <Link className='navbar-link' to='/login'>Log in</Link>
                )}
                
            </ul>
        </nav>
    )
}
export default Navbar;