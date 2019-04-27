import React, { Component } from "react";
import Tree from "react-tree-graph";
import { Redirect } from "react-router-dom";
import { Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
// import NavBar from "../../components/NavBar/NavBar";
import Popup from "../../components/Modal/Modal";
import LOGGED_IN from "../../Constants";
import firebase from '../../containers/Firebase/Firebase';

import './App.css';

import { Launcher } from "react-chat-window";
const axios = require('axios');

const API_IP = "13.127.145.212";

class Main extends Component {
    constructor() {
        super();
        this.state = {
            clicked: false,
            height: 2500,
            node: null,
            width: 1200,
            data: {},
            isOpen: false,
            messageList: [{
                author: 'them',
                type: 'text',
                data: { text: 'Are you looking for male wear or female wear?' }
            }, {
                author: 'them',
                type: 'text',
                data: { text: 'option 1' }
            }, {
                author: 'them',
                type: 'text',
                data: { text: 'option 2' }
            }]
        };
        this.onHandleClose = this.onHandleClose.bind(this);
        this.onClick = this.onClick.bind(this);
        this.reflectModalChanges = this.reflectModalChanges.bind(this);
    }
    reflectModalChanges(data) {
        this.setState({ data, clicked: false });
    }
    componentWillMount() {
        axios.get('http://' + API_IP + '/user/myntra')
            .then(response => {
                // console.log(response);
                this.setState({
                    data: response.data
                })
            })
        this.setState({
            height: window.innerHeight,
            width: window.innerWidth
        });
    }
    onClick = (event, nodeKey) => {
        axios.post('http://' + API_IP + '/project/get-child-by-name', {
            childName: nodeKey
        }).then(response => {
            const node = response.data;
            console.log(node);
            // debugger;
            this.setState({
                clicked: true,
                node
            })
        }).catch(err => {
            console.error(err);
        })
    };
    onHandleClose = () => {
        this.setState({ clicked: false })
    }
    _onMessageWasSent(message) {
        console.log(message);
        this.setState({
            messageList: [...this.state.messageList, message]
        })
    }

    _sendMessage(text) {
        if (text.length > 0) {
            this.setState({
                messageList: [...this.state.messageList, {
                    author: 'them',
                    type: 'text',
                    data: { text }
                }]
            })
        }
    }
    render() {
        const { height, width } = this.state;
        if (window.localStorage.getItem(LOGGED_IN) !== 'yes') {
            // redirect user to login page
            return <Redirect to="/login" />;
        }
        return (
            <div className="App">
                <div className='navBar'>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand href="/">SAASY</NavbarBrand>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/login" onClick={() => {
                                        firebase.auth().signOut();
                                        window.localStorage.setItem(LOGGED_IN, 'no');
                                    }}>Logout</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
                <div className="custom-container">
                    <Tree
                        data={this.state.data}
                        height={height}
                        width={width / 1.2}
                        gProps={{
                            className: 'white-text',
                            onClick: this.onClick
                        }}
                        svgProps={{
                            className: 'custom'
                        }}
                        animated />
                </div>
                <Launcher
                    agentProfile={{
                        teamName: 'SaaSY chat   ',
                        imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                    }}
                    onMessageWasSent={this._onMessageWasSent.bind(this)}
                    messageList={this.state.messageList}
                />
                {this.state.clicked ? <Popup tree={this.state.data} data={this.state.node} modal={this.state.clicked} onModalClose={this.onHandleClose} reflectModalChanges={this.reflectModalChanges} /> : null}
            </div>
        );
    }
}
export default Main;