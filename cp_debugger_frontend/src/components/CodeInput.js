import React from 'react';

function CodeInput(props) {
    return (
        <div>
            <textarea
                id="inputBox"
                rows="20" // Adjust the number of rows to make it bigger
                cols="90" // Adjust the number of columns to make it wider
                onChange={(e) => props.setPythonCode(e.target.value)}
                placeholder={`Enter ${props.type} Code`}
                style={{ resize: 'vertical' }} // Allows vertical resizing
            />
        </div>
    )
}

export default CodeInput;