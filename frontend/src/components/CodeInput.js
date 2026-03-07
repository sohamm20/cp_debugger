import React from 'react';
import Editor from '@monaco-editor/react';
import './CodeInput.css';

function CodeInput({ setPythonCode, type, isPython }) {
    const language = isPython ? 'python' : 'cpp';

    return (
        <div className="codeinput-wrapper">
            <div className="codeinput-label">{type} Solution</div>
            <Editor
                height="420px"
                language={language}
                theme="vs-dark"
                onChange={(value) => setPythonCode(value || '')}
                options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    wordWrap: 'on',
                    automaticLayout: true,
                    tabSize: 4,
                    lineNumbers: 'on',
                    renderLineHighlight: 'all',
                    padding: { top: 12, bottom: 12 },
                }}
            />
        </div>
    );
}

export default CodeInput;