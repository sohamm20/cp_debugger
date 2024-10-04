
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const { exec } = require('child_process');
// const { promisify } = require('util');

// // Initialize Express
// const app = express();
// const port = 5000;

// // Middleware to parse incoming requests and handle CORS
// app.use(cors());
// app.use(bodyParser.json());

// // Utility function to run Python scripts and return output as a Promise
// async function runPythonScript(code, input) {
//   return new Promise((resolve, reject) => {

//     code = `import sys\nimport io\nsys.stdin = io.StringIO('${input}')\n${code}`

//     console.log(code)

//     const command = `python -c "${code}"`; // Execute Python code directly

//     exec(command, (error, stdout, stderr) => {
//       if (error) {
//         return reject(`Error executing script: ${error.message}`);
//       }
//       if (stderr) {
//         return reject(`Python error: ${stderr.trim()}`);
//       }

//       resolve(stdout.trim()); // Return the script output
//     });
//   });
// }

// function generateChar() {
//   const alphabet = 'abcdefghijklmnopqrstuvwxyz'; // String containing all lowercase letters
//   const randomIndex = Math.floor(Math.random() * alphabet.length); // Get a random index
//   return alphabet[randomIndex]; // Return the character at the random index
// }

// function generateNumber() {
//   return Math.round(Math.random() * 1000).toString(); // Random number as string
// }

// // Function to generate random input, can be extended to handle complex input generation
// function generateInput(input) {
//   let ans = "1\n";
  
//   for (let i = 1; i <= parseInt(input[0], 10); i++) {
//     if (input[i] === "1") {
//       const num = generateNumber();
//       ans += num;
//     } else if (input[i] === "2") {
//       const temp = parseInt(ans[ans.length - 2]);
//       for (let j = 0; j < temp; j++) {
//         ans += generateChar();
//       }
//     } else {
//       const temp = parseInt(ans[ans.length - 2]);
//       for (let j = 0; j < temp; j++) {
//         const num = generateNumber();
//         ans += num + " ";
//       }
//     }
    
//     ans += "\n";
//   }

//   return ans;
// }

// // POST route to receive Python code and input from the frontend
// app.post('/run-python', async (req, res) => {
//   const { codeRight, codeWrong, input } = req.body;  // Destructure the input from the frontend

//   try {
//     let generatedInput = generateInput(input);  // Use the input from frontend or generate if not provided
//     let outputRight, outputWrong;
//     let counter = 0;
//     const maxTries = 5;  // Maximum loop iterations

//     while (counter < maxTries) {
//       outputRight = await runPythonScript(codeRight, generatedInput);
//       outputWrong = await runPythonScript(codeWrong, generatedInput);
//       if (outputRight !== outputWrong) {
//         break;
//       }

//       generatedInput = generateInput(input);  // Keep using frontend input or regenerate if not provided
//       counter++;
//       console.log(counter, outputWrong, outputRight);
//     }

//     if (counter === maxTries) {
//       return res.status(400).json({ error: "No differing outputs found after max attempts" });
//     }

//     res.json({
//       output: `Input: ${generatedInput}, Right Output: ${outputRight}, Wrong Output: ${outputWrong}, Iterations: ${counter}`
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });





const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { runPythonScript, generateInput } = require('./utils');

// Initialize Express
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post('/run-python', async (req, res) => {
  const { codeRight, codeWrong, input } = req.body;

  try {
    let generatedInput = generateInput(input);
    let outputRight, outputWrong;
    let counter = 0;
    const maxTries = 5;

    while (counter < maxTries) {
      outputRight = await runPythonScript(codeRight, generatedInput);
      outputWrong = await runPythonScript(codeWrong, generatedInput);

      if (outputRight !== outputWrong) {
        break;
      }

      generatedInput = generateInput(input); 
      counter++;
    }

    if (counter === maxTries) {
      return res.status(400).json({ error: "No differing outputs found after max attempts" });
    }

    res.json({
      input: generatedInput,
      rightOutput: outputRight,
      wrongOutput: outputWrong,
      iterations: counter,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
