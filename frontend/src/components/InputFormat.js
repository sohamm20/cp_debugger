import React, { useState, useEffect } from 'react';
import './InputFormat.css'

function InputFormat(props) {
    const [inputValue, setInputValue] = useState('1');
    const [selectedOptions, setSelectedOptions] = useState(['']); // State to track selected options

    // Create an array of dropdowns based on the input value
    const item = Array.from({ length: Math.max(1, Number(inputValue)) }, (_, index) => index);

    const handleInputChange = (event) => {
        const value = parseInt(event.target.value, 10);

        // Ensure the input is a positive integer
        if (!isNaN(value) && value >= 1) {
            setInputValue(value.toString());
            // Preserve existing options when size changes
            setSelectedOptions(prev => {
                return Array.from({ length: value }, (_, i) => prev[i] || '');
            });
        }
    };

    const handleSelectChange = (index) => (event) => {
        const newSelectedOptions = [...selectedOptions]; // Copy current selected options
        newSelectedOptions[index] = event.target.value; // Update the value at the specific index
        setSelectedOptions(newSelectedOptions); // Update state
    };

    useEffect(() => {
        props.setInput(selectedOptions);
    }, [selectedOptions]);

    return (
        <div>
            <div>
                <label htmlFor="inputBox" style={{display: 'block', marginBottom: '5px'}}>
                    Number of Input Lines
                </label>
                <input
                    id="inputBox"
                    type="number"
                    value={inputValue}
                    onChange={handleInputChange}
                    min="1"
                    max="100"
                    step="1"
                    style={{width: 'auto', textAlign: 'center'}}
                />
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {item.map((_, index) => (
                    <select
                        key={index}
                        id="myDropdown"
                        value={selectedOptions[index]} // Set the value to the corresponding selected option
                        onChange={handleSelectChange(index)} // Pass the index to the handler
                    >
                        <option value="">--Please choose an option--</option>
                        <option value="1">Number</option>
                        <option value="2">String</option>
                        <option value="3">Array</option>
                    </select>
                ))}
            </div>
            <br/>
        </div>
    );
}

export default InputFormat;
