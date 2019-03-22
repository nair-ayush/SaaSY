import React, { Component } from 'react';
import { PropTypes } from "prop-types";
import { Button, Modal, Fade, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Lists from '../Lists/Lists';
import InputBar from '../InputBar/InputBar';

class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            nestedModal: false,
            closeAll: false,
            input: '',
            children: this.props.data
        };
        this.onToggle = this.onToggle.bind(this);
        this.onToggleNested = this.onToggleNested.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
    }
    onToggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    onToggleNested() {
        this.setState({
            nestedModal: !this.state.nestedModal,
            closeAll: false
        });
    }
    toggleAll() {
        this.setState({
            nestedModal: !this.state.nestedModal,
            closeAll: true
        });
        const obj = {
            id: Math.random() * (20 - 5) + 5,
            question: this.state.input
        }
        
    }
    onInputChange(event) {
        this.setState({input: event.target.value});
    }
    render() {
        return (
            <div>
                <Button color="danger" onClick={this.onToggle}>{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.modal} onToggle={this.onToggle} className={this.props.className}>
                    <ModalHeader onToggle={this.onToggle}>Modal title</ModalHeader>
                    <ModalBody>
                        <Lists />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onToggleNested}>Add</Button>{' '}
                        <Modal isOpen={this.state.nestedModal} toggle={this.onToggleNested} onClosed={this.state.closeAll ? this.onToggle : undefined}>
                            <ModalHeader>Add Child</ModalHeader>
                            <ModalBody>
                                <InputBar placeholder='Input Question.....' onInputChange={this.onInputChange} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.onToggleNested}>Add</Button>{' '}
                                <Button color="secondary" onClick={this.toggleAll}>All Done</Button>
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
    isOpen:  PropTypes.bool,
    autoFocus: PropTypes.bool,
    // if modal should be centered vertically in viewport
    centered: PropTypes.bool,
    // corresponds to bootstrap's modal sizes, ie. 'lg' or 'sm'
    size: PropTypes.string,
    // callback for toggling isOpen in the controlling component
    onToggle:  PropTypes.func,
    role: PropTypes.string, // defaults to "dialog"
    // used to reference the ID of the title element in the modal
    labelledBy: PropTypes.string,
    keyboard: PropTypes.bool,
    // control backdrop, see http://v4-alpha.getbootstrap.com/components/modal/#options
    backdrop: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['static'])
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
    zIndex: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
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
  }
export default Popup;