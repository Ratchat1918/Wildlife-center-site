import '../style.css'
import { useState, useEffect, use } from "react"
import { logIn } from '../utils'

const Login = () =>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
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
        const submitBtn = document.getElementById("loginSubmit") as HTMLInputElement;
        if (!submitBtn) return;
        const emailError = document.getElementById("emailError") as HTMLDivElement;
        const passwordError = document.getElementById("passwordError") as HTMLDivElement;
        let passwordHasNumbers:boolean = passwordNumbers(password);
        let passwordHasSymbols:boolean = passwordSymbols(password);
        if(emailValid==false){
            submitBtn.className="login-submit";
            if(email.length>0){
                emailError.innerText = "Enter valid email"
            }
        }
        if(passwordHasNumbers==false){
            submitBtn.className="login-submit";
            if(password.length>0){
                passwordError.innerText = "Password must contain at least one number"
            }
        }
        if(passwordHasSymbols==false){
            submitBtn.className="login-submit";
            if(password.length>0){
                passwordError.innerText = "Password must contain at least one special symbol"
            }
        }
        if(password.length<10){
            submitBtn.className="login-submit";
            if(password.length>0){
                passwordError.innerText = "Password must be at least 10 characters long"
            }
        }else if(password.length>20){
            submitBtn.className="login-submit";
            if(password.length>0){
                passwordError.innerText = "Password must be no more than 20 characters long"
            }
        }
        if(emailValid && passwordHasSymbols && passwordHasNumbers){
            submitBtn.className="login-submit-active";
        }
    },[email, password])
    const logIntoAccount = (event:any)=>{
        event.preventDefault()
        console.log("Logging in with email: ", email, " and password: ", password)
    }
    return(
        <div className='login-container'>
            <form className='login-form' onSubmit={logIntoAccount}>
                <label className='login-label' htmlFor="emailInput">Email</label>
                <input id='emailInput' className='login-input' type="text" value={email} onChange={(event)=>setEmail(event.target.value)}></input>
                <div id='emailError'></div>
                <label className='login-label' htmlFor="passwordInput">Password</label>
                <input id='passwordInput' className='login-input' type="text" value={password} onChange={(event)=>setPassword(event.target.value)}></input>
                <div id='passwordError'></div>
                <input id='loginSubmit' className='login-submit' value={"Login"} type="submit"></input>
            </form>
        </div>
    )
}
export default Login;