import React, { Component } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Popup from "../../components/Modal/Modal";
// import logo from './logo.svg';
// import './App.css';
const Data = {
    id: "someId",
    question: "thisIsTheQuestion",
    children: [
        {
            id: 1,
            question: "How are you?"
        },
        {
            id: 2,
            question: "Who are you?"
        },
        {
            id: 3,
            question: "What is it?"
        }
    ]
};
class App extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <div className="App">
                <NavBar />
                <Popup buttonLabel="[ someId ]" data={Data} />
            </div>
        );
    }
}

export default App;
