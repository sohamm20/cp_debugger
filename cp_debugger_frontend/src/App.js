import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import './App.css';
import CodeInput from './components/CodeInput';
import InputFormat from "./components/InputFormat";

const App = () => {
    const [correctCode, setCorrectCode] = useState('');
    const [incorrectCode, setIncorrectCode] = useState('');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState([]);
    const [isExecuting, setIsExecuting] = useState(false);

    const executePythonCode = async () => {
        setIsExecuting(true);
        try {
            const response = await fetch('http://localhost:5000/run-python', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    codeRight: correctCode,
                    codeWrong: incorrectCode,
                    input,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setOutput([data.input, data.rightOutput, data.wrongOutput, data.iterations]);
            } else {
                setOutput([`Error: ${data.error}`]);
            }
        } catch (error) {
            setOutput([`Error: ${error.message}`]);
        } finally {
            setIsExecuting(false);
        }
    };

    return (
        <Box sx={{ p: 3, bgcolor: '#f5f5f5', borderRadius: '8px', boxShadow: 2 }}>
            <InputFormat setInput={setInput} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <CodeInput
                    pythonCode={correctCode}
                    setPythonCode={setCorrectCode}
                    type = {"Correct"}
                />
                <CodeInput
                    pythonCode={incorrectCode}
                    setPythonCode={setIncorrectCode}
                    type = {"Incorrect"}
                />
            </Box>
            <Button
                variant="contained"
                onClick={() => !isExecuting && executePythonCode()}
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
            {output.length > 0 && (
                <Typography variant="h5" color="teal" sx={{ mt: 2 }}>
                    <strong>Result:</strong>
                    <br /> Input: {output[0]}
                    <br /> Correct Output: {output[1]}
                    <br /> Wrong Output: {output[2]}
                    <br /> Iterations Taken: {output[3]}
                </Typography>
            )}
        </Box>
    );
};

export default App;
