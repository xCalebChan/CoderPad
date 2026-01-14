import { Box, Text, Button } from "@chakra-ui/react"

const Output = ({output, clearOutput, isError}) => {
    return (
        <Box w='50%'>
            <Text mb={2} fontSize='lg'>Output</Text>
            <Button
                variant='outline'
                colorScheme='red'
                mb={4}
                onClick={clearOutput}
                align=''
            >
                Clear Output
            </Button>
            <Box height='75vh' //need to make half the size for paint to go ontop
                p={2}
                border='1px solid'
                borderRadius={4}
                color={isError ? "red.400" : ""}
                overflowY="auto"
                borderColor={isError ? "red.500": "#333"}>
                {output
                    ? output.map((line, i) => <Text key={i}>{line}</Text>)
                    : "Click 'Run Code' to see the output here"}
            </Box>
        </Box>
    )
}
export default Output