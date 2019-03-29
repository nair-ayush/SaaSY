import React, { Component } from "react";
import Tree from "react-tree-graph";
import NavBar from "../../components/NavBar/NavBar";
import Popup from "../../components/Modal/Modal";
import SignIn from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import './App.css';
import { Launcher } from "react-chat-window";
const axios = require('axios');
// import { timingSafeEqual } from "crypto";
class App extends Component {
    constructor() {
        super();
        this.state = {
           
            route: "signIn",
            data: {},
            clicked: false,
            height: 2500,
            node: null,
            width: 1200,
            messageList: [{
                author: 'them',
                type: 'text',
                data: { text: 'flare' }
            }, {
                author: 'them',
                type: 'text',
                data: { text: 'abracadabre' }
            }, {
                author: 'them',
                type: 'text',
                data: { text: 'bsioflf' }
            }]
        };
        this.onHandleClose = this.onHandleClose.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    componentWillMount() {
        axios.get('http://35.154.175.45/user/myntra')
            .then(response => {
                  console.log(response);
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
        axios.post('http://35.154.175.45/project/get-child-by-name', {
            childName: nodeKey
        }).then(response => {
            console.log(response);
            this.setState({
                clicked: true,
                node: response.data
            })
            .catch(err => {
                  console.error(err);
            })
        })

    };
    onHandleClose = () => {
        this.setState({ clicked: false })
    }
    onRouteChange = route => {
        this.setState({ route: route });
    };

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
    onRouteChange = route => {
        this.setState({ route: route });
    };
    render() {
        const { route, height, width } = this.state;
        console.log(this.state.clicked);
        return (
            <div className="App">
                <NavBar route={route} onRouteChange={this.onRouteChange} />
                <div className="custom-container">
                    <Tree
                        data={this.state.data}
                        height={height}
                        width={width / 2}
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
                {this.state.clicked ? <Popup data={this.state.node} modal={this.state.clicked} onModalClose={this.onHandleClose} /> : null}
            </div>
        );
        //     default:
        //         break;
        // }
    }
}

export default App;
