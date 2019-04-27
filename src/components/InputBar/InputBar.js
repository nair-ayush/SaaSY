import React from 'react';
import { Alert, Input, InputGroup,  InputGroupAddon, InputGroupText } from 'reactstrap';

const InputBar = ({ onInputChange, name, onTick, tick }) => {
    if (!tick) {
        return (
            <div>
                <Input placeholder="Enter question(index) to Add(Delete)...." name={name[0]} onChange={onInputChange} />
                <h4>Add one or more answers below</h4>
                <Input placeholder="Enter the first option...." name={name[1]} onInputChange={this.onInputChange} />
                <Input placeholder="Enter the second option...." name={name[2]} onInputChange={this.onInputChange} />
                <Input placeholder="Enter the third option...." name={name[3]} onInputChange={this.onInputChange} />
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <Input addon type="checkbox" aria-label="Checkbox for following text input" onChange={this.props.onTick} />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Alert color="light">
                        Mark as final node
                    </Alert>
                </InputGroup>
            </div>
        );
    }
    return (
        <div>
            <Input placeholder="Enter question(index) to Add(Delete)...." name={name[0]} onChange={onInputChange} />
            <h4>Add one or more answers below</h4>
            <Input placeholder="Enter the first product link...." name={name[1]} onInputChange={this.onInputChange} />
            <Input placeholder="Enter the second product link...." name={name[2]} onInputChange={this.onInputChange} />
            <Input placeholder="Enter the third product link...." name={name[3]} onInputChange={this.onInputChange} />
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <Input addon type="checkbox" aria-label="Checkbox for following text input" onChange={this.props.onTick} />
                    </InputGroupText>
                </InputGroupAddon>
                <Alert color="light">
                    Mark as final node
                    </Alert>
            </InputGroup>
        </div>
    );

};

export default InputBar;
