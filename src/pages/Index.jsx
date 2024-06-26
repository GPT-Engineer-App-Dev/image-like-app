import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Container, Text, VStack, HStack } from "@chakra-ui/react";

const Index = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [splits, setSplits] = useState([]);
  const [bgColor, setBgColor] = useState("#f0e68c");
  const timerRef = useRef(null);

  const formatTime = (time) => {
    const getMilliseconds = `0${time % 100}`.slice(-2);
    const seconds = Math.floor(time / 100);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = Math.floor(seconds / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    return `${getMinutes}:${getSeconds}:${getMilliseconds}`;
  };

  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
    } else {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);
    }
    setIsRunning(!isRunning);
  };

  const handleSplitReset = () => {
    if (isRunning) {
      setSplits([...splits, time]);
    } else {
      setTime(0);
      setSplits([]);
    }
  };

  const handleOnOff = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
    setTime(0);
    setSplits([]);
  };

  useEffect(() => {
    const img = new Image();
    img.src = "/background-color-reference.png";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, img.width, img.height);
      const pixelData = context.getImageData(0, 0, 1, 1).data;
      const color = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
      setBgColor(color);
    };
  }, []);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" bg={bgColor}>
      <VStack spacing={4}>
        <Box bg="black" color="white" p={4} borderRadius="md" width="100%" textAlign="center">
          <Text fontSize="4xl" fontFamily="monospace">
            {formatTime(time)}
          </Text>
        </Box>
        <HStack spacing={4}>
          <Button colorScheme="red" onClick={handleOnOff}>
            ON/OFF
          </Button>
          <Button colorScheme="yellow" onClick={handleSplitReset}>
            SPLIT/RESET
          </Button>
          <Button colorScheme="green" onClick={handleStartStop}>
            {isRunning ? "STOP" : "START"}
          </Button>
        </HStack>
        <VStack spacing={2} width="100%">
          {splits.map((split, index) => (
            <Box key={index} bg="gray.100" p={2} borderRadius="md" width="100%" textAlign="center">
              <Text fontSize="md" fontFamily="monospace">
                Split {index + 1}: {formatTime(split)}
              </Text>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;