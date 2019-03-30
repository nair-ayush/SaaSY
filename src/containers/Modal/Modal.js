import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Lists from "../../components/Lists/Lists";
import InputBar from "../../components/InputBar/InputBar";
const axios = require('axios');

class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: this.props.modal,
            nestedModal: false,
            closeAll: false,
            input: "",
            children: this.props.data.children,
            deletedChild: false
        };
        // console.log("Modal props: " + JSON.stringify(props));
        this.onToggle = this.onToggle.bind(this);
        this.onToggleNested = this.onToggleNested.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    getChildByName(childName) {
        axios.post('http://35.154.175.45/project/get-child-by-name', {
            childName: childName
        }).then(response => {
            const node = response.data;
            this.setState({
                deletedChild: node
            })
            // console.log(node);
        })
    }
    onToggle() {
        if (this.state.modal) {
            console.log('closing modal');
            axios.get('http://35.154.175.45/user/myntra')
                .then(response => {
                    // console.log(response.data);
                    this.props.reflectModalChanges(response.data)
                })
        }
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        // location.reload(true);
    }
    onToggleNested() {
        this.setState({
            nestedModal: !this.state.nestedModal,
            closeAll: false
        });
    }
    onAdd() {
        var { children } = this.state;
        // const id = children.length ? children[children.length - 1].id + 1 : 1;
        // // let children = this.state.children;

        axios.post('http://35.154.175.45/project/add-child', {
            child: {
                key: this.state.input
            },
            parentId: this.props.data._id
        })
            .then(response => {
                const obj = {
                    _id: response.data._id,
                    name: this.state.input
                };
                children.push(obj);
                this.setState(children);
            })
            .catch(err => console.log(err))
        this.setState({
            nestedModal: !this.state.nestedModal,
            closeAll: false,
            children: children
        });
    }
    onDelete() {
        let { children, input } = this.state;
        const child = this.getChild
        this.getChildByName(input);
        children.splice(children.indexOf(this.state.deletedChild), 1);
        axios.post('http://35.154.175.45/project/delete-child', {
            childId: input,
            parentId: this.props.data._id
        }).then(response => {
            this.setState({
                children
            })
        })
            .catch(err => console.log(err))
        // console.log(this.state.children);
        this.setState({
            nestedModal: !this.state.nestedModal,
            closeAll: false,
            children
        });
    }
    toggleAll() {
        this.setState({
            nestedModal: !this.state.nestedModal,
            closeAll: true
        });

    }
    onInputChange(event) {
        this.setState({ input: event.target.value });
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.data.children)
        this.setState({
            modal: nextProps.modal,
            children: nextProps.data.children
        })
    }

    render() {
        return (
            <div>
                <Button color="danger" onClick={this.onToggle}>{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.modal} onToggle={this.onToggle} className={this.props.className}>
                    <ModalHeader onToggle={this.onToggle}>{this.props.data.name}</ModalHeader>
                    <ModalBody>
                        <Lists children={this.state.children} onDelete={this.onDelete} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onToggleNested}>Modify</Button>{" "}
                        <Modal isOpen={this.state.nestedModal} toggle={this.onToggleNested}
                            onClosed={
                                this.state.closeAll ? this.onToggle : undefined
                            }>
                            <ModalHeader>Add/Delete Child</ModalHeader>
                            <ModalBody>
                                <InputBar placeholder="Enter Question(Index) to Add(Delete)....." onInputChange={this.onInputChange} />
                            </ModalBody>
                            <ModalFooter>
                                <Button outline color="success" onClick={this.onAdd}>Add</Button>{" "}
                                <Button outline color="danger" onClick={this.onDelete}>Delete</Button>{" "}
                                <Button outline color="secondary" onClick={this.toggleAll}>All Done</Button>
                            </ModalFooter>
                        </Modal>
                        <Button color="secondary" onClick={this.onToggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Popup;
