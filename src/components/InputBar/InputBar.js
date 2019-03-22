import React from 'react';
import { Input } from 'reactstrap';

const InputBar = ({ placeholder, onInputChange }) => {
    return (
        <div>
            <Input placeholder={placeholder} onChange={onInputChange}/>
        </div>
    );
};

export default InputBar;
