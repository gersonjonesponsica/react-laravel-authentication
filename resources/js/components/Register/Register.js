import React, { Component } from 'react'
import { register } from '../Functions/UserFunctions'
import { Link, withRouter } from 'react-router-dom'
import './Register.css'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            errors: [],
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
        const newUser = {
            fname: this.state.first_name,
            lname: this.state.last_name,
            email: this.state.email,
            password: this.state.password
        }

        register(newUser).then(res => {
            
            // console.log(res)
            if(res.user != undefined){
                localStorage.setItem('usertoken', res.token)
                localStorage.setItem('username', res.user.fname + ' ' +res.user.lname)
                this.props.history.push(`/home`)
                //alert(res)
            }else{
                let json = JSON.parse(res)
                let arr = [];
                let b;
                // alert(res)
                for(let i in json){
                    b = json[i];
                    arr.push(b);
                }

                this.setState({errors: arr})
            }
            this.setState({isLoading: false})
        })
    }

    render() {
        let error = this.state.errors ;
        const {isLoading, password, email} = this.state
        let msg = (!error) ? 'Register Successful' : 'Wrong input values' ;
        let name = (!error) ? 'alert alert-success alert-dismissible' : 'alert alert-danger alert-dismissible' ;
        const errs = this.state.errors.map((err, index) => <li key={index}>{err}</li> );
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
                                    Register
                                </h1>
                                {error != '' && <div className={name} role="alert"><a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a><ul>{errs}</ul></div>}
                        
                                <div className="form-group">
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label htmlFor="first_name">First name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="first_name"
                                                placeholder="First Name"
                                                value={this.state.first_name}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                        <div className='col-md-6'>
                                            <label htmlFor="last_name">Last name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="last_name"
                                                placeholder="Last Name"
                                                value={this.state.last_name}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="form-group">
                                    
                                </div> */}
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
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Password"
                                        value={this.state.password}
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

export default Register
