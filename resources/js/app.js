require('./bootstrap');


import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
//import registerServiceWorker from './registerServiceWorker';

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Profile from './components/Profile'
import ProtectedRoute from './components/ProtectedRoute'

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
          <Route exact path="/home" component={Landing} />
          <ProtectedRoute2 exact path="/register" component={Register} />
          <ProtectedRoute2 exact path="/login" component={Login} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <Route path='*' component={() => "404 Not Found"}/>
        </Switch>
      </div>
</BrowserRouter>, document.getElementById('app'));
// registerServiceWorker();
