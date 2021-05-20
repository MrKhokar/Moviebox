import React from 'react';
const Input = ({name,label,error,...rest}) => {
    return (  <div className="form-group">
              <label htmlFor={name}>{label}</label>

                    <input
                        
                        // ref={this.name} //we need to pass ref as the attribute to grab the value
                       {...rest}
                        id={name}
                        
                        className="form-control"
                       
        />
        {error&&<div className="alert alert-danger">{ error}</div>}
    </div>);
    //Creating a reusable element and passing the values which have common props and raising events tpo grab the values
}
 
export default Input;