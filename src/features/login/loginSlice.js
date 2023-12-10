import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { logtoServer } from './loginAPI';
import { Message } from '../../Message';

const getUserDetailsFromSessionStorage = () => {
  const storedUserDetails = sessionStorage.getItem('userDetails');
  return storedUserDetails ? JSON.parse(storedUserDetails) : null;
};

const initialState = {
  loggedin:getUserDetailsFromSessionStorage() ? true : false,
  token:sessionStorage.getItem('token') || null,
  userDetails:getUserDetailsFromSessionStorage() || []
};


export const loginAsync = createAsyncThunk(
    'login/logtoServer',
    async (details) => {
      const response = await logtoServer(details);
      return response.data;
    }
  );


export const loginSlice = createSlice({
  name: 'login',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    user_logout: (state,payload) => {
      state.loggedin = false
      state.userDetails = []
      sessionStorage.removeItem("userDetails")
      Message("Logged out Successfully","success")
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        if(!action.payload.access) return
        state.token = action.payload.access;
        state.userDetails = parseJwt(state.token)
        sessionStorage.setItem("token", state.token);
        sessionStorage.setItem("userDetails", JSON.stringify({
          "user_id": state.userDetails.user_id,
          "user": state.userDetails.username,
          "firstname": state.userDetails.firstname || "John",
          "lastname": state.userDetails.lastname || "Doe",
          "email": state.userDetails.email || "johndoe@gmail.com",
          "gender": state.userDetails.gender || "male",
          "dob": state.userDetails.dob,
          "img": state.userDetails.img,
          "is_staff": state.userDetails.is_staff
        }));
        state.loggedin = true
        Message("Welcome Back "+state.userDetails.username,"success")
      })
  },
});

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export const { user_logout } = loginSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.login.value)`
export const is_user_logged = (state) => state.login.loggedin;
export const is_user_staff = (state) => state.login.userDetails.is_staff;
export const get_user_details = (state) => state.login.userDetails;
export const get_user_token = (state) => state.login.token;

export default loginSlice.reducer;
