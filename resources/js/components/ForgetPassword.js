import React, { Component } from 'react'
import { forgetPassword } from './Functions/UserFunctions'
import { Link, withRouter } from 'react-router-dom'
import './Register/Register.css'

class ForgetPassword extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
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

        forgetPassword(this.state.email).then(res => {

            // console.log(res)

            if(res){
                this.setState({err: false});
            }else{
                this.setState({err: true});
            }

            this.setState({isLoading: false})
        })
    }

    render() {
        const {isLoading} = this.state
        let error = this.state.err ;
        let msg = (!error) ? 'We have e-mailed your password reset link!' : 'User doesnt exist' ;
        let name = (!error) ? 'alert alert-success' : 'alert alert-danger' ;
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
                                    Forget Password
                                </h1>
                                {error != undefined && <div className={name} role="alert"><a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>{msg}</div>}
                        
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Enter email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                </div>
                                
                                <button
                                    type="submit"
                                    className="btn btn-lg btn-primary btn-block"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Loading...' : 'Register!'}
                                </button>
                                   
                                <div className="text-center pt-3">
                                    {/* </br> */}
                                    <p className="text-dark">Do not have an account? 
                                    {/* <a href="/register"> </a> */}
                                    <Link to="/login" className='ml-1'>
                                     Sign In
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

export default ForgetPassword
