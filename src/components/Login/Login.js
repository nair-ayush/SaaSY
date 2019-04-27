import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import firebase from '../../containers/Firebase/Firebase';
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
            <div>
                <div className='navBar'>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand href="/">SAASY</NavbarBrand>
                        
                    </Navbar>
                </div>
                <article className="br2 shadow-1 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" onChange={this.onEmailChange} />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" onChange={this.onPasswordChange} />
                                </div>
                            </fieldset>
                            <div className="">
                                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={this.handleSubmit} />
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        )
    }
}

export default SignIn;