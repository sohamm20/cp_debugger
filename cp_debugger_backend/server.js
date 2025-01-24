const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { runPythonScript, generateInput, runCppScript } = require('./utils');

// Initialize Express
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post('/run-code', async (req, res) => {
  const { codeRight, codeWrong, input, isPython } = req.body;
  const runner = !isPython ? runCppScript : runPythonScript;

  try {
    let generatedInput = generateInput(input);
    let outputRight, outputWrong;
    let counter = 0;
    const maxTries = 10;

    while (counter < maxTries) {
      outputRight = await runner(codeRight, generatedInput);
      outputWrong = await runner(codeWrong, generatedInput);

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
