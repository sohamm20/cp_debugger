import React from "react";
import './LabeledToggle.css'

const LabeledToggle = ({setIsPython, isPython}) => {

    const handleToggle = () => {
        setIsPython(!isPython);
    };

    return (
        <div>
            <label className="switch">
                <input type="checkbox" checked={!isPython} onChange={handleToggle}/>
                <span className="slider round"></span>
            </label>
            <br/>
            <strong><span style={{marginRight: "10px"}}>{isPython ? "Python" : "C++"}</span></strong>
        </div>
    );
};

export default LabeledToggle;
