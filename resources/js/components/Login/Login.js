import React, { Component } from 'react'
import { login } from '../UserFunctions'
import { Link } from 'react-router-dom'
import '../Register/Register.css'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            isLoading: false
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()
        this.setState({isLoading: true})
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        login(user).then(res => {
            if (res) {
                this.props.history.push('/profile')
                this.setState({err: false});
            }else
                this.setState({err: true});

            this.setState({isLoading: false})    
        })
    }

    render() {
        let error = this.state.err ;
        const {isLoading, password, email} = this.state
        let msg = (!error) ? 'Login Successful' : 'Wrong Credentials' ;
        let name = (!error) ? 'alert alert-success alert-dismissible' : 'alert alert-danger alert-dismissible' ;
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className='card card-authentication1 mx-auto'>
                        <div className="m-5"> 
                            <form noValidate onSubmit={this.onSubmit}>
                            <div className="text-center">
                                <img className="rounded-circle" alt="..." src="https://logo.clearbit.com/baremetrics.com"/>
                            </div>
                                <h1 className="h3 m-3 font-weight-normal text-center">
                                    Please sign in
                                </h1>
                            

                                {/* <div className={name}>
                                    {error != undefined && <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> { msg }}
                                </div> */}

                                {/* <div className="col-md-offset-2 col-md-8 col-md-offset-2"> */}
                                    {error != undefined && <div className={name} role="alert"><a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>{msg}</div>}
                                {/* </div>   */}
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-lg btn-primary btn-block"
                                    disabled={isLoading}
                                >
                                   {isLoading ? 'Loading...' : 'Sign in'}
                                </button>
                                <div className="text-center pt-3">
                                    {/* </br> */}
                                    <p className="text-dark mr-1">Already have an account? 
                                    {/* <a href="/register"> Sign Up here</a> */}
                                    <Link to="/register" className='ml-1'>
                                     Sign Up
                                    </Link>
                                    </p>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
