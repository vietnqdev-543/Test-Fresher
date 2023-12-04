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
      },
      doUploadAvatarAction : (state ,action) => {
        state.tempAvatar = action.payload.avatar
        console.log("Trạng thái Hình đại diện mới:", action.payload.avatar);
      },
      doUpdateUserInfoAction : (state , action) => {
        state.user.avatar = action.payload.avatar;
        state.user.fullName = action.payload.fullName;
        state.user.phone = action.payload.phone;
        console.log("Trạng thái Hình đại diện mới:", action.payload.avatar);
        
      }

  },

  extraReducers: (builder) => {
  
  },
});

export const { doLoginAction ,doGetAccountAction , doLogoutAction , doUpdateUserInfoAction , doUploadAvatarAction} = AccountSlide.actions;


export default AccountSlide.reducer;