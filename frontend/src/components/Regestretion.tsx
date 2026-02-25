import '../style.css'
import Navbar from './Navbar'
import Footer from './Footer'
import { useState, useEffect } from "react"
import { register } from '../utils'
import { useNavigate } from 'react-router-dom'

const Regestration = () =>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const navigate = useNavigate();
    const validateEmail = (email:String) => {
        if(String(email)
            .toLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ){
            return true
        }else{
            return false
        }
        };
    const passwordSymbols =(password:String) =>{
        const specialSymbols = ["@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "!", "?", "<", ">", "/", "\\", "|", "~", "`"];
        let hasSpecialSymbol: boolean = specialSymbols.some(symbol => password.includes(symbol));
        return hasSpecialSymbol
    }
    const passwordNumbers =(password:String) =>{
        const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        let hasNumber:boolean = numbers.some(number => password.includes(number));
        return hasNumber
    }

    useEffect(()=>{
        const emailValid:boolean = validateEmail(email)
        const submitBtn = document.getElementById("regestrationSubmit") as HTMLInputElement;
        if (!submitBtn) return;
        const emailError = document.getElementById("emailError") as HTMLDivElement;
        const passwordError = document.getElementById("passwordError") as HTMLDivElement;
        let passwordHasNumbers:boolean = passwordNumbers(password);
        let passwordHasSymbols:boolean = passwordSymbols(password);

        if(emailValid && passwordHasSymbols && passwordHasNumbers && password===confirmPassword){
            submitBtn.className="regestration-submit-active";
            emailError.innerText = ""
            passwordError.innerText = ""
        }
        if(emailValid==false){
            submitBtn.className="regestration-submit";
            if(email.length>0){
                emailError.innerText = "Enter valid email"
            }
        }
        if(passwordHasNumbers==false){
            submitBtn.className="regestration-submit";
            if(password.length>0){
                passwordError.innerText = "Password must contain at least one number"
            }
        }
        if(passwordHasSymbols==false){
            submitBtn.className="regestration-submit";
            if(password.length>0){
                passwordError.innerText = "Password must contain at least one special symbol"
            }
        }
        if(password.length<10){
            submitBtn.className="regestration-submit";
            if(password.length>0){
                passwordError.innerText = "Password must be at least 10 characters long"
            }
        }else if(password.length>20){
            submitBtn.className="regestration-submit";
            if(password.length>0){
                passwordError.innerText = "Password must be no more than 20 characters long"
            }
        }
        
        if(confirmPassword.length>0 && password!==confirmPassword){
            submitBtn.className="regestration-submit";
            const confirmPasswordError = document.getElementById("confirmPasswordError") as HTMLDivElement;
            confirmPasswordError.innerText = "Passwords must match"
        }else if(confirmPassword.length>0 && password===confirmPassword){
            const confirmPasswordError = document.getElementById("confirmPasswordError") as HTMLDivElement;
            confirmPasswordError.innerText = ""
        }
        if(firstName.length<2){
            submitBtn.className="regestration-submit";
            if(firstName.length>0){
                const firstNameError = document.getElementById("firstNameError") as HTMLDivElement;
                firstNameError.innerText = "First name must be at least 2 characters long"
            }
        }else if(firstName.length>20){
            submitBtn.className="regestration-submit";
            if(firstName.length>0){
                const firstNameError = document.getElementById("firstNameError") as HTMLDivElement;
                firstNameError.innerText = "First name must be no more than 20 characters long"
            }
        }
        if(lastName.length<2){
            submitBtn.className="regestration-submit";
            if(lastName.length>0){
                const lastNameError = document.getElementById("lastNameError") as HTMLDivElement;
                lastNameError.innerText = "Last name must be at least 2 characters long"
            }
        }else if(lastName.length>20){
            submitBtn.className="regestration-submit";
            if(lastName.length>0){
                const lastNameError = document.getElementById("lastNameError") as HTMLDivElement;
                lastNameError.innerText = "Last name must be no more than 20 characters long"
            }
        }
    },[email, password, confirmPassword, firstName, lastName])
    const registerAccount = async (event:any)=>{
        event.preventDefault()
        let response = await register(email, password, firstName, lastName)
        console.log("Registration response: ", response)
        if(response?.data=="failed to fetch users, error: duplicate email (Error Code: 400)"){
            const emailError = document.getElementById("emailError") as HTMLDivElement;
            emailError.innerText = "An account with this email already exists"
        }else if(response?.data=="failed to fetch users, error: invalid email (Error Code: 400)"){
            const emailError = document.getElementById("emailError") as HTMLDivElement;
            emailError.innerText = "Invalid email address"
        }else if(response?.data=="failed to fetch users, error: invalid password (Error Code: 400)"){
            const passwordError = document.getElementById("passwordError") as HTMLDivElement;
            passwordError.innerText = "Invalid password"
        }else if(response?.data=="failed to fetch users, error: invalid first name (Error Code: 400)"){
            const firstNameError = document.getElementById("firstNameError") as HTMLDivElement;
            firstNameError.innerText = "Invalid first name"
        }else if(response?.data=="failed to fetch users, error: invalid last name (Error Code: 400)"){
            const lastNameError = document.getElementById("lastNameError") as HTMLDivElement;
            lastNameError.innerText = "Invalid last name"
        }else{
            navigate("/login")
        }
    }
    return(
        <>
        <Navbar></Navbar>
        <div className='regestration-container'>
            <form className='regestration-form' onSubmit={registerAccount}>
                <label className='regestration-label' htmlFor="firstNameInput">First name</label>
                <input id='firstNameInput' className='regestration-input' type="text" value={firstName} onChange={(event)=>setFirstName(event.target.value)}></input>
                <div id='firstNameError'></div>
                <label className='regestration-label' htmlFor="lastNameInput">Last name</label>
                <input id='lastNameInput' className='regestration-input' type="text" value={lastName} onChange={(event)=>setLastName(event.target.value)}></input>
                <div id='lastNameError'></div>
                <label className='regestration-label' htmlFor="emailInput">Email</label>
                <input id='emailInput' className='regestration-input' type="text" value={email} onChange={(event)=>setEmail(event.target.value)}></input>
                <div id='emailError'></div>
                <label className='regestration-label' htmlFor="passwordInput">Password</label>
                <input id='passwordInput' className='regestration-input' type="text" value={password} onChange={(event)=>setPassword(event.target.value)}></input>
                <div id='passwordError'></div>
                <label className='regestration-label' htmlFor="confirmPasswordInput">Confirm password</label>
                <input id='confirmPasswordInput' className='regestration-input' type="text" value={confirmPassword} onChange={(event)=>setConfirmPassword(event.target.value)}></input>
                <div id='confirmPasswordError'></div>
                <input id='regestrationSubmit' className='regestration-submit' value={"Create Account"} type="submit"></input>
            </form>
        </div>
        <Footer></Footer>
        </>
    )
}
export default Regestration;