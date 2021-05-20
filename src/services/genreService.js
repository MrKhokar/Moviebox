
import http from './httpservices';
import {api} from '../config.json';
export  function getGenres() {
return http.get( api + '/genres')  
};