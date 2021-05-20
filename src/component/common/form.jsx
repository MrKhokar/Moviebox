import React, { Component } from 'react';
import Joi from 'joi-browser';

import Input from './input';
import Select from './select';

class Form extends Component {
    state = {
        data: {},
        errors: {}
    };
      
    validate=()=> {
        const {error} = Joi.validate(this.state.data,this.schema,{abortEarly:false});
        console.log(error);
        if (!error) return null; //if the result property of error is false then return null.
        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message;
        return errors;

        // above we use joi validations in the argument we passes 3 values first in
        // which we want to do the we want to do validations 2nd phase is for the
        // this.schema(in which we are writing the validations) and 3rd phase is for the
        // early abortion 
        // from line 24 - 28 we define a variable errors to empty object > mapping all the
        // arrays to that object by for loop defining a item variable in the loop then going
        // to the details of result.errors >choosing the error by item.path[ and value it to its messages]


        // simple validation from 30-37
        // const errors = {};
        // const { username, password } = this.state.data;
        // if (username.trim() === "")
        //     errors.username = "Username must be filled";
        // if (password.trim() === '')
        //     errors.password = "Password must be filled";
        
        // return Object.keys(errors).length === 0 ? null : errors;
        // => created a const errors(empty in starting) checking if the value of username and
        // the password is empty string then  adding the new property in errors and giving
        // errors value correspondingly, In return returning the object.keys and pass erros in
        // it and then check its length if its zero then return null or reurn errors with values
    }
    handleSubmit = e => {
        e.preventDefault();

          
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        // console.log(this.validate())
        if (errors) return;
        this.doSubmit();
       
        // => we indirectly setting the errors to the state
        // saving  a function on the const errors and settings its return value on the state
        

        // const username = this.username.current.value;//
        // const password = this.password.current.value;//
        //=>above methos is used to grab the value on the onchange methods

        // console.log(username, "- is username");//
        // console.log(password, "-is the password");//
        //=>loging the values on console to check the code working or not.
    }
    validateProperty = ({ id, value }) => {
        const obj = {[id]:value};
        const schema={[id]:this.schema[id]}
       
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;

        // if (id === 'username') {
        //     if (value.trim() === '') return "Username must be filled ";
        // }
        // if (id === 'password') {
        //     if (value.trim() === '') return 'Password must be filled';
        // }
        // from 49 - 54 we are validating the each and every filleds on change
        // and storing the value on return function and then on calling this 
        // function transfer the values to the errors
    }
    handlechange = ({ currentTarget: input }) => {
        
        const errors = { ...this.state.errors };
        const errorMessages = this.validateProperty(input);
        if (errorMessages) errors[input.id] = errorMessages;
        else delete errors[input.id];
        // from 50-53 we clone errors from state to a const errors then initailize a const errorMessages with 
        // a method in which we are passing the input then on 52 if errorMessages have some value or true then
        // errorsdefine with id is equal to the errorMessages else delete that errorswith id on line 62 we 
        // set the const errors in the state
        const data = { ...this.state.data };
        data[input.id] = input.value;
        this.setState({ data, errors });
        //=>cloning the data into the new data const and settings its value in the state by react
      
    };
   
        
     renderButton(label) {
         return <button disabled={this.validate()} className="btn-primary">{label}</button>
    };
    renderInput(name, label, type = 'text') {
        const { username, password } = this.state.data;
        const { data,errors } = this.state;
        return <Input
                    name={name}
                    label={label}
                    onChange={this.handlechange}
                    value={data[name]}
                    type={type}
                    error={errors[name]}
                />
    };
    renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handlechange}
        error={errors[name]}
      />
    );
  }
    
  
  
};
 
export default Form;