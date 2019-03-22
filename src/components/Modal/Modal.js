import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { Button, Modal, Fade, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Lists from "../Lists/Lists";
import InputBar from "../InputBar/InputBar";

class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            nestedAddModal: false,
            nestedDeleteModal: false,
            closeAll: false,
            input: "",
            children: this.props.data.children
        };
        this.onToggle = this.onToggle.bind(this);
        this.onToggleNestedAdd = this.onToggleNestedAdd.bind(this);
        this.onToggleNestedDelete = this.onToggleNestedDelete.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    onToggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    onToggleNestedAdd() {
        this.setState({
            nestedAddModal: !this.state.nestedAddModal,
            closeAll: false
        });
    }
    onToggleNestedDelete() {
        this.setState({
            nestedDeleteModal: !this.state.nestedDeleteModal,
            closeAll: false
        });
    }
    onAdd() {
        var { children } = this.state;
        const id = children[children.length - 1].id + 1;
        // let children = this.state.children;
        const obj = {
            id: id,
            question: this.state.input
        };
        children.push(obj);
        this.setState({
            nestedAddModal: !this.state.nestedAddModal,
            closeAll: false,
            children: children
        });
    }
    onDelete() {
        let { children, input } = this.state;
        let obj = children.filter(function (child) {
            return child.id !== input;
        })
        this.setState({
            nestedDeleteModal: !this.state.nestedDeleteModal,
            closeAll: false,
            children: obj
        });
    }
    toggleAll() {
        this.setState({
            nestedAddModal: !this.state.nestedAddModal,
            // nestedDeleteModal: !this.state.nestedDeleteModal,
            closeAll: true
        });
    }
    onInputChange(event) {
        this.setState({ input: event.target.value });
        // console.log(event.target.value);
    }
    render() {
        // console.log("Children", children);
        return (
            <div>
                <Button color="danger" onClick={this.onToggle}>{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.modal} onToggle={this.onToggle} className={this.props.className}>
                    <ModalHeader onToggle={this.onToggle}>{this.props.data.question}</ModalHeader>
                    <ModalBody>
                        <Lists children={this.state.children} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onToggleNestedAdd}>Add</Button>{" "}
                        <Modal isOpen={this.state.nestedAddModal} toggle={this.onToggleNestedAdd}
                            onClosed={
                                this.state.closeAll ? this.onToggle : undefined
                            }>
                            <ModalHeader>Add Child</ModalHeader>
                            <ModalBody>
                                <InputBar placeholder="Enter Question to Add....." onInputChange={this.onInputChange} />
                            </ModalBody>
                            <ModalFooter>
                                <Button outline color="success" onClick={this.onAdd}>Add</Button>{" "}
                                <Button outline color="secondary" onClick={this.toggleAll}>All Done</Button>
                            </ModalFooter>
                        </Modal>
                        <Button color="danger" onclick={this.onToggleNestedDelete}>Delete</Button>{" "}
                        <Modal isOpen={this.state.nestedDeleteModal} toggle={this.onToggleNestedDelete}
                            onClosed={
                                this.state.closeAll ? this.onToggle : undefined
                            }>
                            <ModalHeader>Delete Child</ModalHeader>
                            <ModalBody>
                                <InputBar placeholder="Enter index of question....." onInputChange={this.onInputChange} />
                            </ModalBody>
                            <ModalFooter>
                                <Button outline color="danger" onClick={this.onAdd}>Delete</Button>{" "}
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

Modal.propTypes = {
    // boolean to control the state of the popover
    isOpen: PropTypes.bool,
    autoFocus: PropTypes.bool,
    // if modal should be centered vertically in viewport
    centered: PropTypes.bool,
    // corresponds to bootstrap's modal sizes, ie. 'lg' or 'sm'
    size: PropTypes.string,
    // callback for toggling isOpen in the controlling component
    onToggle: PropTypes.func,
    role: PropTypes.string, // defaults to "dialog"
    // used to reference the ID of the title element in the modal
    labelledBy: PropTypes.string,
    keyboard: PropTypes.bool,
    // control backdrop, see http://v4-alpha.getbootstrap.com/components/modal/#options
    backdrop: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(["static"])
    ]),
    // if body of modal should be scrollable when content is long
    scrollable: PropTypes.bool,
    // allows for a node/component to exist next to the modal (outside of it). Useful for external close buttons
    // external: PropTypes.node,
    // called on componentDidMount
    onEnter: PropTypes.func,
    // called on componentWillUnmount
    onExit: PropTypes.func,
    // called when done transitioning in
    onOpened: PropTypes.func,
    // called when done transitioning out
    onClosed: PropTypes.func,
    className: PropTypes.string,
    wrapClassName: PropTypes.string,
    modalClassName: PropTypes.string,
    backdropClassName: PropTypes.string,
    contentClassName: PropTypes.string,
    // boolean to control whether the fade transition occurs (default: true)
    fade: PropTypes.bool,
    cssModule: PropTypes.object,
    // zIndex defaults to 1000.
    zIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    // backdropTransition - controls backdrop transition
    // timeout is 150ms by default to match bootstrap
    // see Fade for more details
    backdropTransition: PropTypes.shape(Fade.propTypes),
    // modalTransition - controls modal transition
    // timeout is 300ms by default to match bootstrap
    // see Fade for more details
    modalTransition: PropTypes.shape(Fade.propTypes),
    innerRef: PropTypes.object,
    // if modal should be destructed/removed from DOM after closing
    unmountOnClose: PropTypes.bool // defaults to true
};
export default Popup;
