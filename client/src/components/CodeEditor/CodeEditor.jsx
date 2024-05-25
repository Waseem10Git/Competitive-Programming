import { useRef, useState } from "react";
import { Box, VStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "../LanguageSelector/LanguageSelector.jsx";
import { CODE_SNIPPETS } from "../../constants";
import Output from "../Output/Output.jsx";

const CodeEditor = ({sampleOutput}) => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <Box>
      <VStack spacing={1}>
        <Box w="100%" borderRadius={"10px"} paddingBottom={5}>
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="55vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </Box>
        <Output editorRef={editorRef} language={language} sampleOutput={sampleOutput} />
      </VStack>
    </Box>
  );
};
export default CodeEditor;
