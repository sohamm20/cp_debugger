import React from 'react';

function RightInput({setPythonCode}) {

    return (
        <div>
            <input
                id="inputBox"
                type="text"
                // value=''
                onChange={(e) => setPythonCode(e.target.value)}
                placeholder="Enter Right Code"
            />
        </div>
    )
}

export default RightInput;