import axios from "axios";

export const logIn = (email: string, password: string) => {
    return axios.post("http://127.0.0.1:5000/login", { 'email': email, 'password': password }).then(response => {
        return response;
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
        return undefined;
    });
}

export const register = (email: string, password: string, firstName: string, lastName: string) => {
    return axios.post("http://127.0.0.1:5000/add_user", {
        email,
        password,
        first_name: firstName,
        last_name: lastName
    }).then(response => {
        console.log("Registered", response);
        return response;
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
        return undefined;
    });
}

export const getUser = (id:string) =>{
    return axios.get(`http://127.0.0.1:5000/get_user/${id}`).then(response =>{
        return response.data
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
        return undefined;
    });
}
export const getResarvations = () =>{
    return axios.get("http://127.0.0.1:5000/get_resarvations").then(response=>{
        return response.data
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
        return undefined;
    });
}
