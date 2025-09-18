import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading:true,
  user:{
    user:null
  }
};

export const registerUser = createAsyncThunk('/auth/register',async(formdata)=>{
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`,formdata,{
    withCredentials:true
  })
  return response.data;
}

)
export const loginUser = createAsyncThunk('/auth/login',async(formdata)=>{
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`,formdata,{
    withCredentials:true
  })
  return response.data;
}


)
export const logOutUser = createAsyncThunk('/auth/logout',async()=>{
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/logout`,{
    withCredentials:true
  })
  return response.data;
})
export const checkAuth = createAsyncThunk('/auth/checkauth',async()=>{
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/check-auth`,{
    withCredentials:true,
    headers:{
      'Cache-Control':'no-store,no-cache,must-revalidate,proxy-revalidate',
    }
  })
  return response.data;

}
)


const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers:{
  
  },
  extraReducers:(builder)=>{
    builder.addCase(registerUser.pending,(state)=>{
        state.isLoading=true
    }).addCase(registerUser.fulfilled,(state,action)=>{
        state.isLoading=false
        state.user=action.payload
        state.isAuthenticated=false
    }).addCase(registerUser.rejected,(state,action)=>{
      state.isLoading=false
      state.user=action.payload
      state.isAuthenticated=false
  }).addCase(loginUser.pending,(state)=>{
    state.isLoading=true
}).addCase(loginUser.fulfilled,(state,action)=>{
  console.log(action.payload.user)
    state.isLoading=false
    state.user=!action.payload.success?null:action.payload.user
    state.isAuthenticated= action.payload.success
}).addCase(loginUser.rejected,(state)=>{
  state.isLoading=false
  state.user=null
  state.isAuthenticated=false
}).addCase(checkAuth.pending,(state)=>{
  state.isLoading=true
}).addCase(checkAuth.fulfilled,(state,action)=>{
  state.isLoading=false
  state.user=!action.payload.success?null:action.payload.user
  state.isAuthenticated= action.payload.success
}).addCase(checkAuth.rejected,(state)=>{
state.isLoading=false
state.user=null
state.isAuthenticated=false
}).addCase(logOutUser.fulfilled,(state)=>{
  state.isLoading=false
  state.user=null;
  state.isAuthenticated= false
})
  
  }
})

export const {setUser}=authSlice.actions;
export default authSlice.reducer;