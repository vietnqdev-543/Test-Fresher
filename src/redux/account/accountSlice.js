import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
  isAuthenticated : false ,
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
      state.user = action.payload.user 
    },
    
    doGetAccountAction: (state ,action) => {
        state.isAuthenticated =  true ;
        state.user = action.payload.user 
      },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
  
  },
});

export const { doLoginAction ,doGetAccountAction} = AccountSlide.actions;


export default AccountSlide.reducer;