import { Box, HStack, VStack, Button, useToast } from "@chakra-ui/react"
import { Editor } from "@monaco-editor/react"
import { useRef, useState } from "react"
import LanguageSelector from "./LanguageSelector"
import { CODE_SNIPPETS } from "../constants"
import { executeCode } from "../api"
import Output from "./Output"
import PaintCanvas from "./Paint"

const CodeEditor = () => {
    const toast = useToast()
    const editorRef = useRef()
    const [value, setValue] = useState('')
    const [language, setLanguage] = useState("python");
    const [output, setOutput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    };

    const onSelect = (language) => {
        setLanguage(language);
        setValue(
            CODE_SNIPPETS[language]
        )
    }

    const clearOutput = () => {
        setOutput("")
        setIsError(false)
    }

    const runCode = async () => {
        const soureCode = editorRef.current.getValue();
        if (!soureCode) return;
        try {
            setIsLoading(true)
            const { run: result } = await executeCode(language, soureCode)
            setOutput(result.output.split("\n"))
            result.stderr ? setIsError(true) : setIsError(false)
        } catch (error) {
            console.log(error)
            toast({
                title: "An error occured.",
                description: error.message || "Unable to run code",
                status: "error",
                duration: 6000,
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Box>
            <HStack spacing={4} align='flex-start'>
                <Box w='75%'>
                    <HStack spacing={4} w="100%" justify="space-between" align="flex-end" mb={2}>
                        <LanguageSelector language={language} onSelect={onSelect} />

                        <Button
                            variant='outline'
                            colorScheme='green'
                            mb={2}
                            isLoading={isLoading} // useful for when running code
                            onClick={runCode}
                        >
                            Run Code
                        </Button>
                    </HStack>
                    <Editor
                        height="75vh"
                        theme='vs-dark'
                        language={language}
                        defaultValue={CODE_SNIPPETS[language]}
                        value={value}
                        //onChange={(value) => setValue(value)}
                        onMount={onMount}
                    />
                </Box>
                <Output output={output} clearOutput={clearOutput} isError={isError}></Output>
                <PaintCanvas></PaintCanvas>
            </HStack>
        </Box>
    )
}
export default CodeEditor