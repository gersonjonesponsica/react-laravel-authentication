import React, { Component } from 'react'
import { resetPassword } from './UserFunctions'
import { Link } from 'react-router-dom'
import './Register/Register.css'

class ResetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
        	token: props.match.params.token,
            email : '',
            password: '',
            password_confirmation: '',
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
            token:this.state.token,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
        }

        resetPassword(user).then(res => {
            if (res) {
                this.props.history.push('/login')
                this.setState({err: false});
            }else
                this.setState({err: true});

            this.setState({isLoading: false})    
        })
    }

    render() {
        let error = this.state.err ;
        const {isLoading, password, password_confirmation, email} = this.state
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
                                Reset Password
                                </h1>
                                {error != undefined && <div className={name} role="alert"><a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>{msg}</div>}

                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Enter email"
                                        onChange={this.onChange.bind(this)} required autoFocus 
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
                                <div className="form-group">
                                    <label htmlFor="password">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password_confirmation"
                                        placeholder="Password"
                                        value={password_confirmation}
                                        onChange={this.onChange.bind(this)}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-lg btn-primary btn-block"
                                    disabled={isLoading}
                                >
                                   {isLoading ? 'Loading...' : 'Reset password'}
                                </button>
                                {/* <div className="text-center pt-3">
                                
                                    <p className="text-dark mr-1">Already have an account? 
                                    
                                    <Link to="/register" className='ml-1'>
                                     Sign Up
                                    </Link>
                                    </p>
                                </div>
                                <div className="text-center">
                                    <Link to="/forgotpassword">
                                     Forget password
                                    </Link>
                                </div> */}
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResetPassword
