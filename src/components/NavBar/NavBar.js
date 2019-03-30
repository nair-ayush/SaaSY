import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import './NavBar.css';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }
    render() {
        switch (this.props.route) {
            case 'home':
                return (
                    <div className='navBar'>
                        <Navbar color="light" light expand="md">
                            <NavbarBrand href="/">SAASY</NavbarBrand>
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink href="">Home</NavLink>
                                    </NavItem>
                                    {/* <NavItem>
                                        <NavLink href="">Profile</NavLink>
                                    </NavItem> */}
                                    <NavItem>
                                        <NavLink onClick={() => this.props.onRouteChange('signIn')}>Logout</NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </div>
                )
            case 'register':
                return (
                    <div className='navBar'>
                        <Navbar color="light" light expand="md">
                            <NavbarBrand href="/">SAASY</NavbarBrand>
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink onClick={() => this.props.onRouteChange('signIn')}>SignIn</NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </div>
                )
            case 'signIn':
                return (
                    <div className='navBar'>
                        <Navbar color="light" light expand="md">
                            <NavbarBrand href="/">SAASY</NavbarBrand>
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink onClick={() => this.props.onRouteChange('register')}>Register</NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </div>
                )
            default:
                break;
        }

    }
}
export default NavBar;