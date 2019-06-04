import React, { Component } from 'react'
import Navbar from './Navbar'

class Landing extends Component {
  render() {
    return (
      <div>
      <Navbar />
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">Fluid jumbotron</h1>
          <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
        </div>
      </div>
      </div>
    )
  }
}

export default Landing
