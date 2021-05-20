import http from "./httpservices";
import {api} from "../config.json";
const Api = api+"/users";
export function registerService(user){
    return http.post(Api,{
        email:user.username,
        password:user.password,
        name:user.name
    });
};