import React, { Component } from "react";
import NavBar from "../../components/Navbar/NavBar";
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <div className="App">
                <NavBar />
            </div>
        );
    }
}

export default App;
