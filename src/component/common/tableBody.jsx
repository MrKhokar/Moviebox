import React, { Component } from 'react';
import Like from './like';
import _ from "lodash";

class Tablebody extends Component {
    rendercell = (item, column) => {
        if (column.content) return column.content(item)
        return _.get(item, column.path)
    };
    createKey = (item,column) => {
        return item._id+(column.path ||column.key)
    }
    render() { 
        const{data,columns,onLike,onDelete}=this.props
        return (
            <tbody>
                {data.map(item => (<tr key={item._id}>
                    {columns.map(column => (<td key={this.createKey(item,column) } className="td">{this.rendercell(item,column)}</td>))}
              
            </tr>))}
           
            </tbody>
            
             );
    }
}
 
export default Tablebody;
// const non = () => {
//     return (
//         <tbody className="table table-striped">
//                 {movies.map(movie => (<tr key={movie._id} >
   
//                                <td >{movie.title}</td>
//                                <td >{movie.genre.name}</td>
//                                <td >{movie.numberInStock}</td>
//                                <td >{movie.dailyRentalRate}</td>
                            //    <td></td>
                            //    <td ></td>
//                            </tr>))}
                          
//                        </tbody> );
// }
 
// export default non;