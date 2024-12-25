import React, { useState } from 'react';
import './App.css';

function PythonExecutor() {
    const [pythonCode, setPythonCode] = useState('');
    const [argumentsInput, setArgumentsInput] = useState('');
    const [output, setOutput] = useState('');

    const executePythonCode = async () => {
        try {
            const response = await fetch('http://localhost:5000/run-python', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    code: pythonCode,
                    input: argumentsInput // Send the input to the backend
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setOutput(data.output);
            } else {
                setOutput(`Error: ${data.error}`);
            }
        } catch (error) {
            setOutput(`Error: ${error.message}`);
        }
    };

    return (
        <div className="App">
            <h1>Python Code Executor</h1>
            
            <textarea 
                id="pythonCode" 
                rows="10" 
                cols="50" 
                placeholder="Enter Python code here"
                value={pythonCode}
                onChange={(e) => setPythonCode(e.target.value)}
            ></textarea>
            <br /><br />
            
            <textarea 
                id="arguments" 
                rows="5"
                cols="50" 
                placeholder="Enter input arguments"
                value={argumentsInput}
                onChange={(e) => setArgumentsInput(e.target.value)}
            ></textarea>
            <br /><br />
            
            <button onClick={executePythonCode}>Run</button>

            <h2>Output:</h2>
            <pre id="output">{output}</pre>
        </div>
    );
}

export default PythonExecutor;
