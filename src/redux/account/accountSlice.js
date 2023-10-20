import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
  isAuthenticated : false ,
  isLoading : true ,
  user: {
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: "",
    id: ""
},
  status: 'idle',
};


export const AccountSlide = createSlice({
  name: 'account',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    doLoginAction: (state ,action) => {
      state.isAuthenticated =  true ; 
      state.isLoading =false ;
      state.user = action.payload 
    },
    
    doGetAccountAction: (state ,action) => {
        state.isAuthenticated =  true ;
        state.isLoading =false ;
        state.user = action.payload.user 
      },

      doLogoutAction : (state , action) => {
        localStorage.removeItem('access_token')
        state.isAuthenticated  = false ;
        state.user = {
          email: "",
          phone: "",
          fullName: "",
          role: "",
          avatar: "",
          id: ""
        }
      }
  },

  extraReducers: (builder) => {
  
  },
});

export const { doLoginAction ,doGetAccountAction , doLogoutAction} = AccountSlide.actions;


export default AccountSlide.reducer;