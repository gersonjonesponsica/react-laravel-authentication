import React from "react";
import { Route, Redirect } from "react-router-dom";
import decode from 'jwt-decode'

const checkAuth = () => {

    if(!localStorage.usertoken){
        return false
    }

    try {
        const { exp } = decode(localStorage.usertoken)
        // console.log(exp)
        if(exp < new Date().getTime() / 1000){
            return false
        }
    } catch (e) {
        return false
    }

    return true
}


const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (checkAuth()) {
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

export default ProtectedRoute
