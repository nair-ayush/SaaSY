import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import firebase from '../../containers/Firebase/Firebase';
import "./Login.css";
import App from "../../containers/App/App";
import LOGGED_IN from "../../Constants";
class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loggedIn: false,
            isOpen: false
        }
    }
    onEmailChange = (event) => {
        console.log(event.target.value);
        this.setState({ email: event.target.value });
    }
    onPasswordChange = (event) => {
        console.log(event.target.value);
        this.setState({ password: event.target.value });
    }
    // onSubmit = () => {
    //     this.props.onRouteChange('home');
    // }
    handleSubmit = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(async () => {
                // this.props.onRouteChange('home');
                await window.localStorage.setItem(LOGGED_IN, 'yes');
                this.setState({ loggedIn: true });
            })
            .catch((error) => {
                alert('Sorry, incorrect email/password!');
                console.error(error);
            });

    }
    // onRouteChange = () => {
    //     return <Redirect to="/register" />;
    // }

    render() {
        if (this.state.loggedIn === true) {
            return (
                <Redirect to="/" />
            );
        }
        return (
            <div className='login'>
                {<div className='navBar'>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand href="/">SAASY</NavbarBrand>

                    </Navbar>
                </div>}
                <article className="br2">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ph0 mh0">
                                <legend className="f2 fw6 ph0 mh0" color="white">Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input className="pa2 input-reset bg-transparent hover-white w-100" type="email" name="email-address" id="email-address" onChange={this.onEmailChange} style={{ color: 'white' }} />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input className="b pa2 input-reset bg-transparent hover-white w-100" type="password" style={{ color: 'white' }} name="password" id="password" onChange={this.onPasswordChange} />
                                </div>
                            </fieldset>
                            <div className="">
                                <input className="b ph3 pv2 input-reset bg-transparent grow pointer f6 dib mg5" type="submit" style={{ color: 'white' }} value="Sign in" onClick={this.handleSubmit} />
                            </div>
                        </div>
                    </main>
                </article>
                {/* <a href='/register'>Register</a> */}
            </div >
        )
    }
}

export default SignIn;