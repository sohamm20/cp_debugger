import React from 'react';
import './CodeInput.css'

function CodeInput({ setPythonCode, type }) {
    return (
        <div>
            <textarea
                id="inputBox"
                rows="20"
                cols="100"
                onChange={(e) => setPythonCode(e.target.value)}
                placeholder={`Enter ${type} Code`}
            />
        </div>
    )
}

export default CodeInput;