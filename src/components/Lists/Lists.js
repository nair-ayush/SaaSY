import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

export default class Lists extends Component {

    render() {
        let elements = [];
        // console.log("Lists", this.props);
        for (let i = 0; i < this.props.children.length; i++) {
            // push the component to elements!
            elements.push(
                <ListGroupItem
                    tag="a"
                    href="#"
                    action
                    key={this.props.children[i].id}
                >
                    {this.props.children[i].id + ". " + this.props.children[i].question}
                </ListGroupItem>
            );
        }
        return (
            <div>
                <ListGroup>{elements}</ListGroup>
            </div>
        );
    }
}
