
import React, { Component } from 'react';

const Listbox = (props) => {
    const {  items,  choose,selectedGenre,objectName,objectId} = props;
       return (   <div>
            
             {items.map(item => <ul key={item[objectId]} className="list-group">
                <li style={{cursor:"pointer",color:"orange",fontSize:20,fontFamily:"cursive"}} className={item===selectedGenre ? "list-group-item active" :"list-group-item"} onClick={()=>choose(item)}>{item[objectName]}</li>
                </ul >)}
         
             
               
            
             </div> );

}
Listbox.defaultProps = {
   objectId:"_id",
   objectName:"name"
};
 
export default Listbox;
 

 