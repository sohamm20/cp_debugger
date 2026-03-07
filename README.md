# CP Debugger

A **stress testing tool** for competitive programming. Automatically finds a failing test case by running your correct and incorrect solutions against randomly generated inputs until their outputs differ.

<img width="1722" alt="CP Debugger UI" src="https://github.com/user-attachments/assets/6fa9d693-0112-46d7-a1c2-8128bca31231" />

---

## How It Works

1. Paste your **correct** solution and your **buggy** solution side by side.
2. Define the **input format** (how many lines, and the type of each line — number, string, or array).
3. Hit **Find Failing Test** — the tool runs both solutions against randomly generated inputs (up to 10 attempts) and stops the moment their outputs diverge, showing you the exact input and differing outputs.

Supports both **Python** and **C++**.

---

## Project Structure

```
cp_debugger/
├── backend/          # Express.js API — compiles & runs code, generates inputs
│   ├── server.js
│   └── utils.js
└── frontend/         # React UI — code editor, input format builder, results display
    └── src/
        ├── App.js
        └── components/
            ├── CodeInput.js      # Code textarea
            ├── InputFormat.js    # Line-count + type dropdowns
            └── LabeledToggle.js  # Python / C++ toggle
```

---

## Getting Started

### Prerequisites

- **Node.js** (v16+)
- **Python** (for Python mode)
- **g++** (for C++ mode)

### Install & Run

```bash
# Install dependencies for both services
cd backend && npm install && cd ../frontend && npm install && cd ..

# Start both services with one command
npm run dev
```

Or start them individually:

```bash
npm run backend    # API server → http://localhost:5000
npm run frontend   # React app  → http://localhost:3000
```

Then open **http://localhost:3000** in your browser.

---

## Input Format DSL

The input format builder constructs a descriptor string that tells the backend how to generate random inputs. Each line of the test input is one dropdown:

| Type | Description | Example output |
|------|-------------|----------------|
| **Number** | A random integer 0–1000 | `742` |
| **String** | A random lowercase string (length from previous line) | `xkqpr` |
| **Array** | Space-separated random integers (count from previous line) | `3 19 847` |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Material UI |
| Backend | Node.js, Express |
| Code execution | `child_process` (`python`/`python3`, `g++`) |
