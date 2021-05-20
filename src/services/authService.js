import decoder from 'jwt-decode';
import http from "./httpservices";
import{api} from "../config.json";
const Api =api+"/auth";

http.setJwt(getJwt());
export async function Login(email,password){
   const {data:jwt} = await http.post(Api,{email,password});
   localStorage.setItem("token",jwt);
};
export function logout(){
    localStorage.removeItem("token");
};
export function getCurrentUser(){
    try {
      const jwt=localStorage.getItem('token');
       console.log(decoder(jwt));
      return decoder(jwt);
     
    
    } catch (error) {
       return null
      //to not get error if any anonomous user uses it without login
    }
}
export function loginWithJwt(jwt){
   localStorage.setItem("token",jwt);
};
export function getJwt(){
   return localStorage.getItem('token');
}




// eslint-disable-next-line import/no-anonymous-default-export
export default{
Login,
getCurrentUser,
loginWithJwt,
getJwt,
logout
};
   
