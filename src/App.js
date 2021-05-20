import React,{Component} from 'react';

import {ToastContainer} from 'react-toastify';
import { Redirect, Route, Switch } from 'react-router-dom';
import Movies from "./component/movies";
import Navbar from './component/navbar';
import Customers from './component/customers';
import Rentals from './component/rentals';
import NotFound from './component/notFound';
import MovieForm from './component/movieForm';
import LoginForm from './component/loginForm';
import Register from './component/register';
import Logout from './component/logout';
import auth from './services/authService'
import "react-toastify/dist/ReactToastify.css"
import './App.css';
import ProtectedRoutes from './component/common/protectedRoutes';


class App extends Component {
  state = {  }
  componentDidMount() {
    const user =auth.getCurrentUser();
    this.setState({user});
   
  }
  render() { 
    const{user}=this.state;
    return ( 
    <React.Fragment>
      <ToastContainer/>
       <Navbar user={user}/>
    <main className="container">
        <Switch>
          <ProtectedRoutes path="/movies/:id" component={MovieForm} />
          <Route path="/login" component={LoginForm} />
           <Route path="/logout" component={Logout} />
          <Route path="/register" component={Register}/>
          <Route path="/movies" render={props=><Movies {...props} user={this.state.user}/>}/>
          <Route path="/customers" component={Customers}/>
          <Route path="/rentals" component={Rentals}/>
          <Route path="/notFound" component={NotFound}/>
          <Redirect from="/" exact to="/movies" />
          <Redirect to='/notFound'/>
      </Switch>
    </main>
    </React.Fragment> );
  }
}
 


export default App;
