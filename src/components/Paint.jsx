import React, { useRef, useState, useEffect } from 'react';
import { Box, Button, Flex, Text, HStack, Divider } from '@chakra-ui/react';

const PaintCanvas = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    // --- Configuration State ---
    const [color, setColor] = useState('black');
    const [brushSize, setBrushSize] = useState(5);
    const [mode, setMode] = useState('draw');

    // --- Initialize Canvas ---
    useEffect(() => {
        const canvas = canvasRef.current;
        // Matching the container size seen in your screenshot roughly
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * 2;
        canvas.height = rect.height * 2;

        canvas.style.width = '100%';
        canvas.style.height = '100%';

        const context = canvas.getContext('2d');
        context.scale(2, 2);
        context.lineCap = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = 5;
        contextRef.current = context;
    }, []);

    // --- Update Context Styles ---
    useEffect(() => {
        if (!contextRef.current) return;

        if (mode === 'erase') {
            contextRef.current.strokeStyle = 'white';
        } else {
            contextRef.current.strokeStyle = color;
        }

        contextRef.current.lineWidth = brushSize;
    }, [color, brushSize, mode]);

    // --- Drawing Handlers ---
    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    };

    const clearOutput = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <Box w="100%" h="85vh" display="flex" flexDirection="column">
            <Text mb={2} fontSize='lg'>Drawing Canvas</Text>
            {/* --- HORIZONTAL TOOLBAR --- */}
            <Flex
                w="100%"
                bg="transparent"
                mb={4}
                alignItems="center"
                justifyContent="space-between" // Spreads the groups out evenly
                flexWrap="nowrap" // Forces single line
                overflowX="auto" // Adds scroll if screen is too small
            >

                {/* Group 1: Actions */}
                <Button
                    variant='outline'
                    colorScheme='red'
                    onClick={clearOutput}
                    align=''
                >
                    Clear Output
                </Button>

                <Divider orientation='vertical' h="20px" borderColor="gray.400" />

                {/* Group 2: Mode */}
                <HStack spacing={2}>
                    <Button
                        variant={mode === 'draw' ? 'solid' : 'outline'}
                        colorScheme='blue'
                        onClick={() => setMode('draw')}
                        align=''
                    >
                        Draw
                    </Button>
                    <Button
                        variant={mode === 'erase' ? 'solid' : 'outline'}
                        colorScheme='orange'
                        onClick={() => setMode('erase')}
                        align=''
                    >
                        Erase
                    </Button>
                </HStack>

                <Divider orientation='vertical' h="20px" borderColor="gray.400" />

                {/* Group 3: Size */}
                <HStack spacing={2}>
                    <Button
                        variant={brushSize === 5 ? 'solid' : 'outline'}
                        colorScheme='gray'
                        onClick={() => setBrushSize(5)}
                        align=''
                        color='white'
                    >
                        Small
                    </Button>
                    <Button
                        variant={brushSize === 10 ? 'solid' : 'outline'}
                        colorScheme='gray'
                        onClick={() => setBrushSize(10)}
                        align=''
                        color='white'
                    >
                        Med
                    </Button>
                    <Button
                        variant={brushSize === 20 ? 'solid' : 'outline'}
                        colorScheme='gray'
                        onClick={() => setBrushSize(20)}
                        align=''
                        color='white'
                    >
                        Large
                    </Button>
                </HStack>

                <Divider orientation='vertical' h="20px" borderColor="gray.400" />

                {/* Group 4: Colors (Swatches) */}
                <HStack spacing={2}>
                    {['red', 'blue', 'black', 'white'].map((c) => (
                        <Button
                            key={c}
                            onClick={() => {
                                setColor(c);
                                setMode('draw');
                            }}
                            // Shape & Size
                            w="36px"
                            h="36px"
                            minW="36px"
                            borderRadius="full"
                            p={0}

                            // Color Logic
                            bg={c}
                            _hover={{ transform: 'scale(1.1)' }}
                            _active={{ transform: 'scale(0.95)' }}

                            // Border logic (Permanent gray outline so White is visible)
                            border="3px solid"
                            borderColor={color === c && mode === 'draw' ? 'green.400' : 'gray.300'}
                        />
                    ))}
                </HStack>
            </Flex>

            {/* --- CANVAS --- */}
            <Box
                flex="1"
                border="2px solid"
                borderColor="gray.600"
                boxShadow="md"
                borderRadius="md"
                overflow="hidden"
                bg="white"
            >
                <canvas
                    onMouseDown={startDrawing}
                    onMouseUp={finishDrawing}
                    onMouseMove={draw}
                    onMouseLeave={finishDrawing}
                    ref={canvasRef}
                    style={{ width: '100%', height: '100%' }}
                />
            </Box>
        </Box>
    );
};

export default PaintCanvas;