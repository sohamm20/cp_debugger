const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = process.platform;

const TEMP_PY   = path.join(__dirname, 'temp.py');
const TEMP_CPP  = path.join(__dirname, 'temp.cpp');
const TEMP_IN   = path.join(__dirname, 'temp_input.txt');

// Convert the semicolon-delimited input string into real newlines
function toStdin(input) {
  return input.replace(/;/g, '\n');
}

// ─── Python ────────────────────────────────────────────────────────────────
// Write code to temp.py and pipe temp_input.txt into it.
// Avoids ALL shell quoting / newline issues with `python -c "..."`.
async function runPythonScript(code, input) {
  return new Promise((resolve, reject) => {
    fs.writeFileSync(TEMP_PY, code);
    fs.writeFileSync(TEMP_IN, toStdin(input));

    const py = os === 'darwin' ? 'python3' : 'python';
    exec(`${py} "${TEMP_PY}" < "${TEMP_IN}"`, (err, stdout, stderr) => {
      if (err)    return reject(new Error(`Python error: ${err.message}`));
      if (stderr) return reject(new Error(`Python stderr: ${stderr.trim()}`));
      resolve(stdout.trim());
    });
  });
}

// ─── C++ ───────────────────────────────────────────────────────────────────
// Write code to temp.cpp, compile, then run with stdin from temp_input.txt.
async function runCppScript(code, input) {
  return new Promise((resolve, reject) => {
    fs.writeFileSync(TEMP_CPP, code);
    fs.writeFileSync(TEMP_IN, toStdin(input));

    exec(
      `g++ "${TEMP_CPP}" -o "${TEMP_CPP}.out" && "${TEMP_CPP}.out" < "${TEMP_IN}"`,
      (err, stdout, stderr) => {
        if (err)    return reject(new Error(`C++ error: ${err.message}`));
        if (stderr) return reject(new Error(`C++ stderr: ${stderr.trim()}`));
        resolve(stdout.trim());
      }
    );
  });
}

// ─── Input generation ──────────────────────────────────────────────────────
// Format descriptor: array of types e.g. ["1", "3", "2"]
//   "1" = Number, "2" = String (len = prev value), "3" = Array (count = prev value)
function generateInput(types) {
  // Gracefully handle if legacy string was passed 
  if (typeof types === 'string') {
     types = types.split('');
     types.shift(); // remove the count character if it was a string
  }

  const segments = []; // track each generated segment for prev-value lookup

  for (const type of types) {
    if (type === '2') {
      // String: length = last generated value (capped to avoid huge strings)
      const len = prevValue(segments);
      let s = '';
      for (let j = 0; j < len; j++) s += generateChar();
      segments.push(s);

    } else if (type === '3') {
      // Array: count = last generated value
      const count = prevValue(segments);
      const nums = Array.from({ length: count }, generateNumber);
      segments.push(nums.join(' '));
      
    } else {
      // Number (or default if unselected)
      segments.push(generateNumber());
    }
  }

  return segments.join(';') + ';';
}

// Return the numeric value of the last generated segment (first token for arrays).
// Capped at 20 so arrays/strings stay manageable.
function prevValue(segments) {
  if (segments.length === 0) return 1;
  const last = segments[segments.length - 1].trim().split(/\s+/)[0];
  const n = parseInt(last, 10);
  return isNaN(n) || n < 1 ? 1 : Math.min(n, 20);
}

function generateChar() {
  return 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];
}

// Keep numbers small (1–20) so they work sensibly as array/string lengths too
function generateNumber() {
  return (Math.floor(Math.random() * 20) + 1).toString();
}

module.exports = { runPythonScript, runCppScript, generateInput };
