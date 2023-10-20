import axios from "../utils/axios-customize"

 export const callRegister = (fullName , email , password , phone) => {
    return axios.post("/api/v1/user/register" , {fullName , email , password , phone})
}
export const callLogin = (username , password)=> {
    return  axios.post("/api/v1/auth/login",{username , password})
}
 export const callFetchAccount = () => {
    return axios.get('/api/v1/auth/account')
 }
 export const callLogout = () => {
    return axios.post('/api/v1/auth/logout')
 }

 //user manage
 export const callFetchListUser = (query) => {
   //current : current=1&pageSize=2
   return axios.get(`/api/v1/user?${query}`)
 }

 export const callCreateAUser = (fullName , password , email ,phone) => {
   return axios.post('/api/v1/user' , {  fullName , password ,email , phone})
 }
 export const callUpdateAUser = (_id , fullName ,phone)=> {
   return axios.put('/api/v1/user' , { _id , fullName , phone})
 }
 export const callDeleteAUser = (_id) => {
  return axios.delete(`/api/v1/user/${_id}`)
 }

 //book 
 export const callFetchListBook = ( query) => { 
  // current : current=1&pageSize=10
  return axios.get(`/api/v1/book?${query}`)
 }
 export const callCreateABook = (mainText , category , author , price , quantity , sold) => {
  return axios.post('/api/v1/book' , {mainText , category , author , price , quantity , sold})
 }