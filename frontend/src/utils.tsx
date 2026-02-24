import axios from "axios";

export const logIn = (email:Text, password:Text) =>{
    axios.get("http://127.0.0.1:5000/login",{'email':email, 'password':password}).then(response=>{
        console.log("Logged in", response)
    }).catch(error => {
        if (error.response) {
            console.error('Error data:', error.response.data);
            console.error('Error status:', error.response.status);
            console.error('Error headers:', error.response.headers);
        } else if (error.request) {
            console.error('Request error:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
    });
}