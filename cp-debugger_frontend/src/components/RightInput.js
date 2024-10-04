import React from 'react';

function RightInput(props) {

    return (
        <div>
            <textarea
                id="inputBox"
                rows="5" // Adjust the number of rows to make it bigger
                cols="30" // Adjust the number of columns to make it wider
                onChange={(e) => props.setPythonCode(e.target.value)}
                placeholder="Enter Right Code"
                style={{ resize: 'vertical' }} // Allows vertical resizing
            />
        </div>
    )
}

export default RightInput;