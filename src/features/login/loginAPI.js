import axios from 'axios';
import { TargetServer } from '../settings/Settings';
export async function logtoServer(details) {
    const MY_SERVER = `${TargetServer}login/`; // Updated protocol to 'http' or 'https'
    
    const data = {
        "username": details.userName,
        "password": details.password
    }
    return axios.post(MY_SERVER, JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        return response;
    })
    .catch(error => {
        console.error('Error while sending data to the server:', error);
        throw error;
    });
}