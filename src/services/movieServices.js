import http from "./httpservices";
import{api} from "../config.json";
const Api =api+"/movies";
function movieUrl(id){
    return `${Api}/${id}`;
}
export  function getMovies(){
return http.get(Api)
};
export  function deleteMovie(movieId){
return http.delete(movieUrl(movieId));
};
export  function getMovie(movieId){
return http.get(movieUrl(movieId))
};
export function saveMovie(movie){
    const data ={...movie};
    delete data._id;
    if(movie._id){

        return http.put(movieUrl(movie._id),data)
    }
return http.post(Api,movie)
};