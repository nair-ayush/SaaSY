import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { Navbar, NavbarBrand } from 'reactstrap';

import firebase from '../../containers/Firebase/Firebase';
import { LOGGED_IN } from '../../Constants';

import "./Login.css";
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

    handleSubmit = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(async () => {
                await window.localStorage.setItem(LOGGED_IN, 'yes');
                this.setState({ loggedIn: true });
            })
            .catch((error) => {
                alert('Sorry, incorrect email/password!');
                console.error(error);
            });

    }

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
            </div >
        )
    }
}

export default SignIn;