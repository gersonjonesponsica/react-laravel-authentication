import React, { Component } from 'react'

class Landing extends Component {
  render() {
    return (

      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">Fluid jumbotron</h1>
          <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
        </div>
      </div>
      // <div className="container">
      //   <div className="jumbotron mt-5">
      //     <div className="col-sm-8 mx-auto">
      //       <h1 className="text-center">WELCOME</h1>
      //     </div>
      //   </div>
      // </div>
    )
  }
}

export default Landing
