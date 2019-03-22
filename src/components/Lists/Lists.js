import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

export default class Lists extends Component {
    render() {
        return (
            <div>
                <ListGroup>
                    <ListGroupItem tag="a" href="#" action>Child 1 <Badge pill>42</Badge></ListGroupItem>
                    <ListGroupItem tag="a" href="#" action>Child 2 <Badge pill>34</Badge></ListGroupItem>
                    <ListGroupItem tag="a" href="#" action>Child 3 <Badge pill>12</Badge></ListGroupItem>
                    <ListGroupItem tag="a" href="#" action>Child 4 <Badge pill>70</Badge></ListGroupItem>
                    <ListGroupItem tag="a" href="#" action>Child 5 <Badge pill>14</Badge></ListGroupItem>
                </ListGroup>
            </div>
        );
    }
}

