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
        axios.get('http://35.154.175.45/user/myntra')
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
        axios.post('http://35.154.175.45/project/get-child-by-name', {
            childName: nodeKey
        }).then(response => {
            const node = response.data;
            console.log(node);
            this.setState({
                clicked: true,
                node
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
        console.log('state', this.state.data);
        // switch (route) {
        //     case "signIn":
        //         return (
        //             <div className="App">
        //                 <NavBar route={route} onRouteChange={this.onRouteChange} />
        //                 <SignIn onRouteChange={this.onRouteChange} />
        //             </div>
        //         );
        //     case "register":
        //         return (
        //             <div className="App">
        //                 <NavBar route={route} onRouteChange={this.onRouteChange} />
        //                 <Register onRouteChange={this.onRouteChange} />
        //             </div>
        //         )
        //     case "home":
        return (
            <div className="App">
                <NavBar route={route} onRouteChange={this.onRouteChange} />
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
        //     default:
        //         break;
        // }
    }
}

export default App;
