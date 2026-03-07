import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import './App.css';
import CodeInput from './components/CodeInput';
import InputFormat from "./components/InputFormat";
import LabeledToggle from "./components/LabeledToggle";

const App = () => {
    const [correctCode, setCorrectCode] = useState('');
    const [incorrectCode, setIncorrectCode] = useState('');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState(null);
    const [isExecuting, setIsExecuting] = useState(false);
    const [isPython, setIsPython] = useState(true); // Default to Python

    const runCode = async () => {
        setIsExecuting(true);
        try {
            const response = await fetch('http://localhost:5000/run-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    codeRight: correctCode,
                    codeWrong: incorrectCode,
                    input,
                    isPython,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setOutput({ input: data.input, rightOutput: data.rightOutput, wrongOutput: data.wrongOutput, iterations: data.iterations });
            } else {
                setOutput({ error: data.error });
            }
        } catch (error) {
            setOutput({ error: error.message });
        } finally {
            setIsExecuting(false);
        }
    };

    return (
        <Box sx={{p: 3, bgcolor: '#f5f5f5', borderRadius: '8px', boxShadow: 2}}>
            <InputFormat setInput={setInput}/>
            <div>
                <LabeledToggle setIsPython={setIsPython} isPython={isPython} />
            </div>
            <br/>
            <Box sx={{display: 'flex', justifyContent: "space-evenly", mb: 3}}>
                <CodeInput
                    pythonCode={correctCode}
                    setPythonCode={setCorrectCode}
                    type={"Correct"}
                    isPython={isPython}
                />
                <CodeInput
                    pythonCode={incorrectCode}
                    setPythonCode={setIncorrectCode}
                    type={"Incorrect"}
                    isPython={isPython}
                />
            </Box>
            <Button
                variant="contained"
                onClick={() => !isExecuting && runCode()}
                disabled={isExecuting}
                sx={{
                    bgcolor: '#6200ea',
                    color: 'white',
                    '&:hover': { bgcolor: '#3700b3' },
                    mb: 2,
                }}
            >
                {isExecuting ? 'Executing...' : 'Find Failing Test'}
            </Button>
            {output && output.error && (
                <Typography variant="h6" color="error" sx={{mt: 2}}>
                    <strong>Error:</strong> {output.error}
                </Typography>
            )}
            {output && !output.error && (
                <Typography variant="h5" color="teal" sx={{mt: 2}}>
                    <strong>Result:</strong>
                    <br/> <strong>Input:</strong> {output.input}
                    <br/> <strong>Correct Output:</strong> {output.rightOutput}
                    <br/> <strong>Wrong Output:</strong> {output.wrongOutput}
                    <br/> <strong>Iterations Taken:</strong> {output.iterations + 1}
                </Typography>
            )}
        </Box>
    );
};

export default App;
