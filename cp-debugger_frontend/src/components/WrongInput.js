import React from 'react';

function WrongInput(props) {
    return (
        <div>
            <input 
                id="inputBox" 
                type="text" 
                // value={inputValue} 
                onChange={(e) => props.setPythonCode(e.target.value)} 
                placeholder="Enter Right Code" 
            />
        </div>
    )
}

export default WrongInput;