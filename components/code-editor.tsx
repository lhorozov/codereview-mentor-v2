import { useState } from "react";
import Editor from '@uiw/react-textarea-code-editor';

export default function CodeEditor() {
    const [code, setCode] = useState(
        `function add(a, b) {\n  return a + b;\n}`
    );
    return (
        <Editor
            value={code}
            language="js"
            placeholder="Please enter JS code."
            onChange={(e) => setCode(e.target.value)}
            padding={15}
            style={{
                width: '100%',
                minHeight: '150px',
                minWidth: '150px',
                backgroundColor: "#f5f5f5",
                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
        />
    );
}