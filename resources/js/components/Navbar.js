import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {getProfile} from './UserFunctions'

class Landing extends Component {
  constructor() {
    super()
    this.state = {
        name: '',
        email: ''
    }
}

  // async componentDidMount() {
  //   if(localStorage.usertoken){
  //     const response = await getProfile();
  //       this.setState({
  //           name: response.user.name,
  //           email: response.user.email
  //       })
  //   }
  // }

  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.setState({
      name: '',
      email: ''
    })
    this.props.history.push(`/`)
  }

  render() {
    const loginRegLink = (
      <ul className="nav navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
      </ul>
    )

    const userLink = (
      <ul className="nav navbar-nav ml-auto">
        {/* <li className="nav-item">
          <Link to="/profile" className="nav-link">
            User
          </Link>
        </li> */}
        <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {localStorage.username}
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">

          <Link to="/profile" className="dropdown-item">
          <i className='fa fa-user'></i> Account
          </Link>
          <a href="" onClick={this.logOut.bind(this)} className="dropdown-item">
           <i className='fa fa-sign-out'></i>  Logout
          </a>
        </div>
      </li>
        {/* <li className="nav-item">
          
        </li> */}
      </ul>
    )

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarsExample10"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          </ul>
          {localStorage.usertoken ? userLink : loginRegLink}
        </div>
      </nav>
    )
  }
}

export default withRouter(Landing)
