import React, { useState } from 'react';

function IPFormat(props) {
    const [inputValue, setInputValue] = useState('1');
    const [selectedOptions, setSelectedOptions] = useState(['']); // State to track selected options

    // Create an array of dropdowns based on the input value
    const item = Array.from({ length: Math.max(1, Number(inputValue)) }, (_, index) => index);

    const handleInputChange = (event) => {
        const value = event.target.value;

        // Ensure the input is a positive integer
        if (!isNaN(value) && value >= 1) {
            setInputValue(value);
            setSelectedOptions(Array.from({ length: Number(value) }, () => '')); // Reset selected options
        }
    };

    const handleSelectChange = (index) => (event) => {
        const newSelectedOptions = [...selectedOptions]; // Copy current selected options
        newSelectedOptions[index] = event.target.value; // Update the value at the specific index
        setSelectedOptions(newSelectedOptions); // Update state
    };

    // const handleSubmit = () => {
    //     console.log('Submitted values:', selectedOptions);
    //     alert('You have submitted');
    // };

    const setInputFormat = () => {
        var curr = '';
        curr += inputValue;
        for (var i = 0; i < inputValue; i++){
            curr += selectedOptions[i];
        }
        props.setInput(curr); // Call setInput with the selected formats
    };

    return (
        <div>
            <p>Enter number of input lines</p>
            <input
                id="inputBox"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type a number"
            />
            <br />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
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
            <button onClick={setInputFormat}>Set</button>
            {/* <button onClick={handleSubmit}>Submit</button> */}
        </div>
    );
}

export default IPFormat;
