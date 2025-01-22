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
