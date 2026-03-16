import { useEffect, useState } from 'react';
import { getUser } from '../utils'
import Navbar from './Navbar';
import Footer from './Footer';
import '../style.css'

const Account = () => {
    const userId = localStorage.getItem("userId")
    const getResarvations = async(userId)=>{
        let userInfo = getUser(userId)
        console.log(userInfo)
    };
    getResarvations(userId);
    return(
        <>
        <Navbar></Navbar>
        <div className="account-container">
            <div className='account-header'></div>
            <div className='account-resarvations'>
                {}
            </div>
        </div>
        <Footer></Footer>
        </>
    )
}

export default Account;