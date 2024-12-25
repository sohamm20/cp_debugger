const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Initialize Express
const app = express();
const port = 5000;

// Middleware to parse incoming requests and handle CORS
app.use(cors());
app.use(bodyParser.json());

// POST route to receive Python code and input from the frontend
app.post('/run-python', (req, res) => {
  const pythonCode = req.body.code;
  const userInput = req.body.input; // Get the input from the request

  // Validate the Python code (basic example)
  if (typeof pythonCode !== 'string' || pythonCode.trim() === '') {
    return res.status(400).json({ error: 'Invalid Python code.' });
  }

  // Save the Python code to a temporary file (main.py)
  fs.writeFile('main.py', pythonCode, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error saving Python script.' });
    }

    // Save the user input to a temporary file (input.txt)
    fs.writeFile('input.txt', userInput, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error saving input file.' });
      }

      // Execute the Python code with input redirection
      exec('python3 main.py < input.txt', (error, stdout, stderr) => {
        // Cleanup files after execution
        fs.unlink('main.py', () => {});
        fs.unlink('input.txt', () => {});

        if (error) {
          return res.status(500).json({ error: stderr || 'Error executing script.' });
        }

        // Send the output back to the client
        res.json({ output: stdout });
      });
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
