import React, { Component } from 'react';

import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../services/authService';
import { Redirect } from 'react-router';
class LoginForm extends Form {
    state = {
        data: { username: "", password: "" },
        errors: {
            
        }
        
    }
    schema={
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
            // in this schema we define the username and its value in a object key-value pairs 
            // in which key is the input.id and value is the requirement for the validations
        }
    // username = React.createRef();
    // password = React.createRef();
    // above methods is used to grab the values of dom directly

    doSubmit = async() => {
        try{

            const {data}=this.state;
            await auth.Login(data.username,data.password);
            const {state}=this.props.location;
            window.location=state ? state.from.pathname : '/';
        }
        catch(ex){
            if(ex.response && ex.response.status===400){
                const errors ={...this.state.errors};
                errors.username=ex.response.data;
                this.setState({errors});
            }
        }
         console.log("submitted")
    }
    // componentDidMount() {
    //     this.username.current.value = "Write Username";
    // }
    
    render() {
        if (auth.getCurrentUser()) return <Redirect to="/"/>
        const { username, password } = this.state.data;
        const { errors } = this.state;
        //Destruturing the values that we needed from the state.data
        return ( <div>
            <h1>Sign In</h1>
            <form on onSubmit={this.handleSubmit}>
                
                {this.renderInput("username", "Username")}
                {this.renderInput("password","Password","password")}
                {this.renderButton('Login')}
            </form>
        </div> );
    }
}
 
export default LoginForm;