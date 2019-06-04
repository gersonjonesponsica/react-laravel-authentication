import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import ProtectedRoute from './components/ProtectedRoute'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          {/* <div className="container"> */}
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <ProtectedRoute exact path="/profile" component={Profile} />
              <Route path='*' component={() => "404 Not Found"}/>
            </Switch>
          </div>
        {/* </div> */}
      </BrowserRouter>
    )
  }
}
export default App
