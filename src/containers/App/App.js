import React, { Component } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Tree from '../../components/Tree/Tree';
// import logo from './logo.svg';
// import './App.css';



class App extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        return (
            <div className="App">
                <NavBar />
                {/* <Tree /> */}
            </div>
        );
    }
}

export default App;
