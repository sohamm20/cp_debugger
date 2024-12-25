// import React, { useState, useEffect } from 'react';
// import './App.css';
// import RightInput from './components/RightInput';
// import WrongInput from './components/WrongInput';
// import IPFormat from './components/IPFormat';

// function App() {
//     const [pythonCodeRight, setPythonCodeRight] = useState('');
//     const [pythonCodeWrong, setPythonCodeWrong] = useState('');
//     const [input, setInput] = useState('');
//     const [output, setOutput] = useState('');
//     const [isExecuting, setIsExecuting] = useState(false); // Add a flag to track execution state

//     const executePythonCode = async () => {
//         try {
//             setIsExecuting(true); // Set to true when the code is running
//             const response = await fetch('http://localhost:5000/run-python', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     codeRight: pythonCodeRight,
//                     codeWrong: pythonCodeWrong,
//                     input: input,
//                 }),
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 setOutput(data.output);
//             } else {
//                 const errorMessage = `Error: ${data.error}`;
//                 setOutput(errorMessage);
//             }
//         } catch (error) {
//             const errorMessage = `Error: ${error.message}`;
//             setOutput(errorMessage);
//         } finally {
//             setIsExecuting(false); // Reset after execution finishes
//         }
//     };

//     const handleChange = () => {
//         if (!isExecuting) {  // If it's not currently executing, proceed
//             executePythonCode();
//         }
//     };

//     useEffect(() => {
//         if (output) {
//             console.log(output); // Log the output when it updates
//         }
//     }, [output]); // Trigger useEffect when 'output' changes

//     useEffect(() => {
//         if (input) {
//             console.log(input); // Log the output when it updates
//         }
//     }, [input]); // Trigger useEffect when 'output' changes

//     return (
//         <div>
//             <IPFormat setInput = {setInput}/>
//             <br></br>
//             <div className="input-container">
//                 <RightInput className="RightInput" pythonCode={pythonCodeRight} setPythonCode={setPythonCodeRight} />
//                 <WrongInput className="WrongInput" pythonCode={pythonCodeWrong} setPythonCode={setPythonCodeWrong} />
//             </div>
//             <button onClick={handleChange} disabled={isExecuting}>
//                 {isExecuting ? 'Executing...' : 'Find Failing Test'}
//             </button>
//             <h1>Result : {output}</h1>
//         </div>
//     );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import './App.css';
import RightInput from './components/RightInput';
import WrongInput from './components/WrongInput';
import IPFormat from './components/IPFormat';

function App() {
    const [pythonCodeRight, setPythonCodeRight] = useState('');
    const [pythonCodeWrong, setPythonCodeWrong] = useState('');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [isExecuting, setIsExecuting] = useState(false);

    const executePythonCode = async () => {
        try {
            setIsExecuting(true);
            const response = await fetch('http://localhost:5000/run-python', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    codeRight: pythonCodeRight,
                    codeWrong: pythonCodeWrong,
                    input: input,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setOutput(data.output);
            } else {
                const errorMessage = `Error: ${data.error}`;
                setOutput(errorMessage);
            }
        } catch (error) {
            const errorMessage = `Error: ${error.message}`;
            setOutput(errorMessage);
        } finally {
            setIsExecuting(false);
        }
    };

    const handleChange = () => {
        if (!isExecuting) {
            executePythonCode();
        }
    };

    useEffect(() => {
        if (output) {
            console.log(output);
        }
    }, [output]);

    useEffect(() => {
        if (input) {
            console.log(input);
        }
    }, [input]);

    return (
        <Box sx={{ p: 3, bgcolor: '#f5f5f5', borderRadius: '8px', boxShadow: 2 }}>
            <IPFormat setInput={setInput} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <RightInput
                    className="RightInput"
                    pythonCode={pythonCodeRight}
                    setPythonCode={setPythonCodeRight}
                />
                <WrongInput
                    className="WrongInput"
                    pythonCode={pythonCodeWrong}
                    setPythonCode={setPythonCodeWrong}
                />
            </Box>
            <Button
                variant="contained"
                onClick={handleChange}
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
            <Typography variant="h5" color="teal" sx={{ mt: 2 }}>
                Result: {output}
            </Typography>
        </Box>
    );
}

export default App;
