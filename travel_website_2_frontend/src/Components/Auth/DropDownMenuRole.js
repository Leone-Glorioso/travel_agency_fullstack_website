import React, { useState } from 'react';

const DropdownMenu = ({ onSelect }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        onSelect(selectedValue);
    };

    return (
        <div>
            <select value={selectedOption} onChange={handleOptionChange}>
                <option value="Client">Client</option>
                <option value="Landlord">Landlord</option>
                <option value="Landlord/Client">Landlord/Client</option>
            </select>
        </div>
    );
};

export default DropdownMenu;

