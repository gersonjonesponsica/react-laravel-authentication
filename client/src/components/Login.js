import React, { Component } from 'react'
import { login } from './UserFunctions'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        login(user).then(res => {
            if (res) {
                this.props.history.push(`/profile`)
                this.setState({err: false});
            }else
                this.setState({err: true});
        })
    }

    render() {
        let error = this.state.err ;
        let msg = (!error) ? 'Login Successful' : 'Wrong Credentials' ;
        let name = (!error) ? 'alert alert-success alert-dismissible' : 'alert alert-danger alert-dismissible' ;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        
                        <form noValidate onSubmit={this.onSubmit}>
                            
                            <h1 className="h3 mb-3 font-weight-normal">
                                Please sign in
                            </h1>
                        

                            {/* <div className={name}>
                                {error != undefined && <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> { msg }}
                            </div> */}

                            {/* <div className="col-md-offset-2 col-md-8 col-md-offset-2"> */}
                                {error != undefined && <div className={name} role="alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>{msg}</div>}
                            {/* </div>   */}
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
                            >
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
