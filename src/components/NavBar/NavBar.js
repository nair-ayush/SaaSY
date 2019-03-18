import React, { Component} from 'react';
import { PropTypes } from "prop-types";
import { Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }
    render() {
        return(
            <div className='navBar'>
                <Navbar color="light" light expand="md">
                <NavbarBrand href="/">SAASY</NavbarBrand>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="">Profile</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="">Logout</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
                </Navbar>
            </div>
        )
    }
}
NavBar.propTypes = {
    light: PropTypes.bool,
    dark: PropTypes.bool,
    fixed: PropTypes.string,
    color: PropTypes.string,
    role: PropTypes.string,
    expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
    // pass in custom element to use
  }
export default NavBar;