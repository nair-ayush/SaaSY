import React from 'react';
import { Input } from 'reactstrap';

const InputBar = ({ placeholder, onInputChange, name }) => {
    return (
        <div>
            <Input placeholder={placeholder} name={name} onChange={onInputChange} />
        </div>
    );
};

export default InputBar;
