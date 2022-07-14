import React, { useContext, useState } from 'react';
import Editor from '@monaco-editor/react';
import Split from 'react-split';
import { EditorInfoType } from './Home';
import { ApplicationContext } from '../App';
import chevronRight from '../assets/chevron-right.svg';

interface CodeEditorProp {
  editorTheme: string;
  output: string;
  editorInfo: EditorInfoType;
  handleEditorChange: (value: string | undefined) => void;
  handleEditorDidMount: (editor: any, monaco: any) => void;
}

export default function CodeEditor({
  editorTheme,
  output,
  editorInfo,
  handleEditorChange,
  handleEditorDidMount,
}: CodeEditorProp) {
  const [validateMessage, setValidateMessage] = useState([]);

  function handleEditorValidation(markers: any) {
    // model markers
    markers.forEach((marker: any) => setValidateMessage(marker.message));
    console.log(typeof markers);
  }

  //   console.log(editorInfo)

  const { applicationContext } = useContext(ApplicationContext);

  // console.log(applicationContext);

  return (
    <>
      <main className="classThatSpecifiesTheSizeToWorkWith simple-vertical">
        <Split className="split-vertical" direction="vertical">
          <Editor
            language={editorInfo.language}
            value={editorInfo.value}
            theme={editorTheme}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            // beforeMount={handleEditorWillMount}
            onValidate={handleEditorValidation}
            options={applicationContext.options}
          />
          <output className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-50 ">
            <code style={{ color: 'red', fontWeight: 'bold' }}>
              {validateMessage !== [] && validateMessage}
            </code>
            <div className='flex'>
              <img width="16" src={chevronRight} alt="chevron-right" />
              <code className="whitespace-pre-wrap">{output && output}</code>
            </div>
          </output>
        </Split>
      </main>
    </>
  );
}
