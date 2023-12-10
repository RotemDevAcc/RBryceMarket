import axios from 'axios';
import { TargetServer } from '../settings/Settings';
import { Message } from '../../Message';
export async function regtoServer(details) {
    const MY_SERVER = `${TargetServer}register/`; // Updated protocol to 'http' or 'https'
    
    const uservalue = document.getElementById("username").value
    const fnamevalue = document.getElementById("firstname").value
    const lnamevalue = document.getElementById("lastname").value
    const emailvalue = document.getElementById("email").value
    const passvalue = document.getElementById("password").value
    const confirm_password = document.getElementById('confirm_password').value;
    const gender = document.getElementById('gender').value
    const date = document.getElementById('dob').value


    if (!uservalue) {
        Message("Username was not entered", "error")
        return
    }

    if(!fnamevalue || !lnamevalue){
        Message("Firstname or Lastname weren't entered","error")
        return
    }

    if (!emailvalue) {
        Message("Email was not entered", "error")
        return
    }

    if (!passvalue) {
        Message("Password was not entered", "error")
        return
    }

    if (!confirm_password) {
        Message("Confirm Password was not entered", "error")
        return
    }

    if(passvalue != confirm_password){
        Message("Passwords are not equal", "error")
        return
    }


    if (!gender || gender == "") {
        Message("Gender was not entered", "error")
        return
    }

    if (!date) {
        Message("Date was not entered", "error")
        return
    }

    const data = {
        "username": uservalue,
        "firstname": fnamevalue,
        "lastname": lnamevalue,
        "password": passvalue,
        "email":emailvalue,
        "gender": gender,
        "date": date,
    }
    return axios.post(MY_SERVER, JSON.stringify(data), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        return response;
    })
    .catch(error => {
        console.error('Error while sending data to the server:', error);
        throw error;
    });
}