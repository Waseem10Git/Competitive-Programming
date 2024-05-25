import { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../../api";

const Output = ({ editorRef, language, sampleOutput }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [runIsLoading, setRunIsLoading] = useState(false);
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [executionTime, setExecutionTime] = useState(0);
  const [linesOfCode, setLinesOfCode] = useState(0);

    const countLinesOfCode = (sourceCode) => {
      if (!sourceCode) return 0;
      const lines = sourceCode.split("\n");
      const nonEmptyLines = lines.filter(line => line.trim() !== ''); // Filter out empty lines
      return nonEmptyLines.length;
    };

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setRunIsLoading(true);
      const startTime = performance.now(); // Record start time
      const { run: result } = await executeCode(language, sourceCode);
      const endTime = performance.now(); // Record end time
        const executionTime = endTime - startTime; // Calculate execution time
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
        setExecutionTime(executionTime); // Set execution time state
        const linesOfCode = countLinesOfCode(sourceCode); // Count lines of code
        setLinesOfCode(linesOfCode); // Set lines of code state
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setRunIsLoading(false);
    }
  };

  const submitCode = () => {
    try {
      setSubmitIsLoading(true);
      if (!output){
        alert("Problem in your code please make sure your output have a value");
        return;
      }
      const joinedOutput = output.join("\n");
      if (joinedOutput.trim() === sampleOutput.trim()){
        alert('matches');
      } else {
        alert('does not match');
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitIsLoading(false)
    }
  }

  return (
    <Box w="100%" height="33.5vh" borderRadius={10} p={5}>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={runIsLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      <Button
          variant="outline"
          colorScheme="green"
          mb={4}
          isLoading={submitIsLoading}
          onClick={submitCode}
      >
        Submit Code
      </Button>
      <Box
        height="10vh"
        p={2}
        color={isError ? "red.400" : "lightgray"}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </Box>
      {output
          ? <Text mb={2} fontSize="lg"> {executionTime} ms</Text>
          : ''}
      {output
          ? <Text mb={2} fontSize="lg"> {linesOfCode} Lines</Text>
          : ''}
      {sampleOutput}
      {/*{(output.toString().trim() === sampleOutput.trim())}*/}
    </Box>
  );
};
export default Output;
