import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

export default class Lists extends Component {
    render() {
        let elements = [];
        for (let i = 0; i < this.props.children.length; i++) {
            // push the component to elements!
            elements.push(
                <ListGroupItem
                    key={this.props.children[i]._id}
                >
                    {this.props.children[i]._id + ". " + this.props.children[i].name}
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
