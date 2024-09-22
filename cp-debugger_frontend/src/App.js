// import React, { useState, useEffect } from 'react';
// import './App.css';
// import RightInput from './components/RightInput';
// import WrongInput from './components/WrongInput';
//
// function App() {
//     const [pythonCodeRight, setPythonCodeRight] = useState('');
//     const [pythonCodeWrong, setPythonCodeWrong] = useState('');
//     const [argumentsInput, setArgumentInput] = useState('');
//     const [outputRight, setOutputRight] = useState('');
//     const [outputWrong, setOutputWrong] = useState('');
//
//     const executePythonCode = async (is_right) => {
//         const temp = is_right ? pythonCodeRight : pythonCodeWrong;
//
//         try {
//             const response = await fetch('http://localhost:5000/run-python', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     code: temp,
//                     input: argumentsInput,
//                 }),
//             });
//
//             const data = await response.json();
//             if (response.ok) {
//                 if (is_right) {
//                     setOutputRight(data.output);
//                 } else {
//                     setOutputWrong(data.output);
//                 }
//             } else {
//                 const errorMessage = `Error: ${data.error}`;
//                 if (is_right) {
//                     setOutputRight(errorMessage);
//                 } else {
//                     setOutputWrong(errorMessage);
//                 }
//             }
//         } catch (error) {
//             const errorMessage = `Error: ${error.message}`;
//             if (is_right) {
//                 setOutputRight(errorMessage);
//             } else {
//                 setOutputWrong(errorMessage);
//             }
//         }
//     };
//
//     const startExecution = () => {
//         const n = Math.round(Math.random() * 100);
//         setArgumentInput(n.toString());
//     };
//
//     useEffect(() => {
//         if (argumentsInput) {
//             executePythonCode(true);
//             executePythonCode(false);
//         }
//     }, [argumentsInput]);
//
//     useEffect(() => {
//         console.log(outputRight, outputWrong);
//     }, [outputRight, outputWrong]);
//
//     const handleChange = () => {
//         startExecution();
//     };
//
//     return (
//         <div>
//             <div className="input-container">
//                 <RightInput className="RightInput" pythonCode={pythonCodeRight} setPythonCode={setPythonCodeRight} />
//                 <WrongInput className="WrongInput" pythonCode={pythonCodeWrong} setPythonCode={setPythonCodeWrong} />
//             </div>
//             <button onClick={handleChange}>Find Failing Test</button>
//         </div>
//     );
// }
//
// export default App;
import React, { useState, useEffect } from 'react';
import './App.css';
import RightInput from './components/RightInput';
import WrongInput from './components/WrongInput';

function App() {
    const [pythonCodeRight, setPythonCodeRight] = useState('');
    const [pythonCodeWrong, setPythonCodeWrong] = useState('');
    const [argumentsInput, setArgumentInput] = useState('');
    const [outputRight, setOutputRight] = useState('');
    const [outputWrong, setOutputWrong] = useState('');

    const executePythonCode = async (is_right) => {
        const temp = is_right ? pythonCodeRight : pythonCodeWrong;

        try {
            const response = await fetch('http://localhost:5000/run-python', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: temp,
                    input: argumentsInput,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                if (is_right) {
                    setOutputRight(data.output);
                } else {
                    setOutputWrong(data.output);
                }
            } else {
                const errorMessage = `Error: ${data.error}`;
                if (is_right) {
                    setOutputRight(errorMessage);
                } else {
                    setOutputWrong(errorMessage);
                }
            }
        } catch (error) {
            const errorMessage = `Error: ${error.message}`;
            if (is_right) {
                setOutputRight(errorMessage);
            } else {
                setOutputWrong(errorMessage);
            }
        }
    };

    const startExecution = () => {
        const n = Math.round(Math.random() * 100);
        setArgumentInput(n.toString());
    };

    useEffect(() => {
        const executeBoth = async () => {
            if (argumentsInput) {
                await executePythonCode(true);
                await executePythonCode(false);
            }
        };

        executeBoth();
    }, [argumentsInput]);

    useEffect(() => {
        console.log(outputRight, outputWrong);
    }, [outputRight, outputWrong]);

    const handleChange = () => {
        startExecution();
    };

    return (
        <div>
            <div className="input-container">
                <RightInput className="RightInput" pythonCode={pythonCodeRight} setPythonCode={setPythonCodeRight} />
                <WrongInput className="WrongInput" pythonCode={pythonCodeWrong} setPythonCode={setPythonCodeWrong} />
            </div>
            <button onClick={handleChange}>Find Failing Test</button>
        </div>
    );
}

export default App;
