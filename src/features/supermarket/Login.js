import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { is_user_logged, loginAsync } from './loginSlice';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const dispatch = useDispatch();
  const [userName, setusername] = useState("")
  const [password, setpassword] = useState("")
  const logged = useSelector(is_user_logged);
  const navigate = useNavigate()

  const login_user = async ()=>{
    const details = { userName: userName, password: password };
  
    try {
      const retvalue = await dispatch(loginAsync(details));
      console.log(retvalue)
      // The loginAsync action has completed successfully, 
      // and the navigation logic is handled inside the loginSlice
    } catch (error) {
      // Handle any errors
      console.error('Login error:', error);
    }
  }

  return (
    <div>
      {!logged ? (
        <div className="container-fluid center-form">
          <div className="col-md-6 offset-md-3">
            <h1 className="text-center">Login</h1>
    
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input type="text" onChange={(e) => setusername(e.target.value)} className="form-control" id="username" name="username" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" onChange={(e) => setpassword(e.target.value)} className="form-control" id="password" name="password" required />
            </div>
            <button type="submit" onClick={() => login_user()} className="btn btn-primary btn-block">Login</button>
            {/* <p className="mt-3 text-center">Forgot Your Password? <a onClick="forgot()"
              style={{ cursor: "pointer", color: "rgb(0, 174, 255)" }}>Reset Password</a></p> */}
            <p className="mt-3 text-center">Don't have an account? <a href="register.html">Create New Account</a></p>
    
            <div id="messagebox" className="text-center mt-3"></div>
          </div>
        </div>
      ) : navigate("/")}
    </div>
  );
  
}

export default Login