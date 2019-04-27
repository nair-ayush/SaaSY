import React from 'react';
import { Alert, Input, InputGroup,  InputGroupAddon, InputGroupText } from 'reactstrap';

const InputBar = ({ placeholder, onInputChange }) => {
    return (
        <div>
            <Input placeholder={placeholder} onChange={onInputChange}/>
        </div>
    );

};

export default InputBar;
