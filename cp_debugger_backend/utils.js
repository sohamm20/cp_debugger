const { exec } = require('child_process');
const { promisify } = require('util');
const os = process.platform;

// Run Python script and return the result
async function runPythonScript(code, input) {
  const { exec } = require("child_process");
  return new Promise((resolve, reject) => {
    code = `import sys;import io;sys.stdin = io.StringIO('${input}'.replace(';','\\n'));${code.replace(/"/g, '\\"')}`;
    const pythonCmd = (process.platform === "darwin") ? "python3" : "python";
    const command = `${pythonCmd} -c "${code}"`;

    exec(command, (error, stdout, stderr) => {
      if (error) return reject(new Error(`Error executing script: ${error.message}`));
      if (stderr) return reject(new Error(`Python error: ${stderr.trim()}`));
      resolve(stdout.trim());
    });
  });
}

// Generate random input
function generateInput(input) {
  let ans = "";

  for (let i = 1; i <= parseInt(input[0], 10); i++) {
    if (input[i] === "1") {
      const num = generateNumber();
      ans += num;
    } else if (input[i] === "2") {
      const temp = parseInt(ans[ans.length - 2]);
      for (let j = 0; j < temp; j++) {
        ans += generateChar();
      }
    } else {
      const temp = parseInt(ans[ans.length - 2]);
      for (let j = 0; j < temp; j++) {
        const num = generateNumber();
        ans += num + " ";
      }
    }
    ans += ";";
  }

  return ans;
}

// Utility to generate random character
function generateChar() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  return alphabet[randomIndex];
}

// Utility to generate random number
function generateNumber() {
  return Math.round(Math.random() * 1000).toString();
}

module.exports = { runPythonScript, generateInput };
