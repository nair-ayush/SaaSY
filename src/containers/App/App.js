import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignIn from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import Main from "../Main/Main";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login" name="Login Page" component={SignIn} />
                    <Route path="/" name="Home" component={Main} />
                    <Route path="/register" name="Register" component={Register} />
                </Switch>
            </BrowserRouter>
        );
    }
}
export default App;
