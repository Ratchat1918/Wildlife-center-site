import '/src/styles/Login.css'
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
    const validatePassword = (password:String) => {
        const specialSymbols = ["@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "!", "?", "<", ">", "/", "\\", "|", "~", "`"];
        const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        let hasSpecialSymbol = specialSymbols.some(symbol => password.includes(symbol));
        let hasNumber = numbers.some(number => password.includes(number));
        if(hasSpecialSymbol && hasNumber && password.length >= 10 && password.length<=16){
            return true;
        }
        return false;
    }
    useEffect(()=>{
        const emailValid:boolean = validateEmail(email)
        const passwordValid: boolean = validatePassword(password)
        const submitBtn: HTMLInputElement = document.getElementById("loginSubmit")
        if(emailValid==false){
            submitBtn.className="login-submit";
        }
        if(passwordValid==false){
            submitBtn.className="login-submit";
        }
        if(emailValid && passwordValid){
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
                <div className='emailError'></div>
                <label className='login-label' htmlFor="passwordInput">Password</label>
                <input id='passwordInput' className='login-input' type="text" value={password} onChange={(event)=>setPassword(event.target.value)}></input>
                <div className='passwordError'></div>
                <input id='loginSubmit' className='login-submit' value={"Login"} type="submit"></input>
            </form>
        </div>
    )
}
export default Login;