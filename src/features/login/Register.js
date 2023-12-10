import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { is_user_logged, loginAsync } from './loginSlice';
import { useNavigate } from 'react-router-dom';


const Register = () => {

    const dispatch = useDispatch();
    const logged = useSelector(is_user_logged);
    const navigate = useNavigate()

    return (
        <div>
            {!logged ? (
                <div className="container center-form">
                    <div className="col-md-6 offset-md-3">
                        <h1 className="text-center">Register</h1>

                        <div className="form-group">
                            <label for="username">
                                <i className="fas fa-user"></i> Username:
                            </label>
                            <input type="text" className="form-control" id="username" name="username" placeholder="karen123" required/>
                        </div>

                        <div className="form-group">
                            <label for="email">
                                <i className="fas fa-envelope"></i> Email Address:
                            </label>
                            <input type="email" className="form-control" id="email" name="email" placeholder="example@gmail.com" required/>
                        </div>

                        <div className="form-group">
                            <label for="firstname">
                                <i className="fas fa-id-card"></i> Firstname:
                            </label>
                            <input type="text" className="form-control" id="firstname" name="firstname" placeholder="avner" required/>
                        </div>

                        <div className="form-group">
                            <label for="lastname">
                                <i className="fas fa-user-circle"></i> Lastname:
                            </label>
                            <input type="text" className="form-control" id="lastname" name="lastname" placeholder="yeruham" required/>
                        </div>

                        <div className="form-group">
                            <label for="dob">
                                <i className="fas fa-calendar-alt"></i> Birthdate:
                            </label>
                            <input type="date" className="form-control" id="dob" name="dob" required value="2000-01-01"/>
                        </div>

                        <div className="form-group">
                            <label for="gender">
                                <i className="fas fa-venus-mars"></i> Gender:
                            </label>
                            <select id="gender" name="gender" required>
                                <option value="" disabled selected>Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label for="password">
                                <i className="fas fa-lock"></i> Password:
                            </label>
                            <input type="password" className="form-control" id="password" name="password" required/>
                        </div>

                        <div className="form-group">
                            <label for="confirm_password">
                                <i className="fas fa-lock"></i> Confirm Password
                            </label>
                            <input type="password" className="form-control" id="confirm_password" name="confirm_password" required/>
                        </div>

                        <button type="submit" onclick="register()" className="btn btn-primary btn-block">Register</button>
                        <p className="mt-3 text-center">already have an account? <a href="login.html">Login</a></p>

                        <div id="messagebox" className="text-center mt-3"></div>
                    </div>
                </div>
            ) : navigate("/")}
        </div>
    );

}

export default Register