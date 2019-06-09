require('./bootstrap');


import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'

// import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Profile from './components/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import Forgot from './components/ForgetPassword'
import ResetPassword from './components/ResetPassword';
import Task from './components/Task/Task';
// import Home from './components/Home';

const ProtectedRoute2 = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!localStorage.usertoken) {
        return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};

ReactDOM.render(
<BrowserRouter>
    <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          {/* <Route exact path="/home2" component={Home} /> */}
          <Route exact path="/home" component={Landing} />
          <ProtectedRoute exact path="/task" component={Task} />
          <ProtectedRoute2 exact path="/register" component={Register} />
          <ProtectedRoute2 exact path="/login" component={Login} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute2 path='/forgotpassword' component={Forgot}/>
          <Route path='/password/reset/:token' component={ResetPassword}/>
          <ProtectedRoute2 path='*' component={() => "404 Not Found"}/>
        </Switch>
      </div>
</BrowserRouter>, document.getElementById('app'));
// registerServiceWorker();
