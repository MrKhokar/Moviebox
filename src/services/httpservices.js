/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { toast } from 'react-toastify';
import Logger from './logservices'
// import * as Sentry  from '@sentry/react';

axios.interceptors.response.use(null, error => {
  const ExceptedErr = error.response && error.response.status >= 400 && error.response.status < 500;
  if (!ExceptedErr)
  {
    console.log("logginig the error", error);
    Logger.log(error);
  toast("Unexcepted error")}
  return Promise.reject(error);
});
function setJwt(jwt){
  axios.defaults.headers.common['x-auth-token']=jwt;

}
export default{
    get: axios.get,
    put: axios.put,
    post: axios.post,
    setJwt,
    delete:axios.delete
};