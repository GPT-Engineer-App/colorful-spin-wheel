import React, { useState } from "react";
import { Flex, Box, Button, Center, Container, Text } from "@chakra-ui/react";
import { FaRedo } from "react-icons/fa";
import DenominationList from "../components/DenominationList";

const Index = () => {
  const [rotation, setRotation] = useState(0);

  const spinWheel = () => {
    // Generate a random rotation degree between 5000 and 10000 for a good spin effect
    const newRotation = Math.floor(Math.random() * 5000 + 5000);
    setRotation((prevRotation) => prevRotation + newRotation);
  };

  const wheelSlices = Array.from({ length: 12 }, (_, index) => {
    const isTen = index % 2 === 0; // Alternating slices for the number 10
    return {
      value: isTen ? 10 : Math.floor(Math.random() * 490 + 11),
      color: `hsl(${index * 30}, 100%, 70%)`, // Different color for each slice
    };
  });

  // Ensure only one slice has 500
  wheelSlices[Math.floor(Math.random() * wheelSlices.length)].value = 500;

  return (
    <Flex maxW="container.xl" justify="space-between" p="4" bg="white" boxShadow="0 4px 20px rgba(0, 0, 0, 0.2)" borderRadius="lg">
      <Box flex="1" padding="4" boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)" borderRadius="lg" bg="white" margin="2">
        <DenominationList />
      </Box>
      <Box flex="1" padding="4" position="relative" boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)" borderRadius="lg" bg="white" margin="2">
        <Box position="absolute" top="0" left="50%" transform="translateX(-50%) translateY(-10px)" width="0" height="0" borderLeft="10px solid transparent" borderRight="10px solid transparent" borderBottom="30px solid black" zIndex="2" />
        <Center height="100%">
          <Box position="relative" height="300px" width="300px" boxShadow="0 8px 24px rgba(0, 0, 0, 0.6)">
            <svg viewBox="0 0 100 100" width="300px" height="300px" style={{ transform: `rotate(${rotation}deg)`, transition: "transform 3s ease-out" }}>
              {wheelSlices.map((slice, index) => (
                <path key={index} fill={slice.color} d={`M50,50 L${50 + 50 * Math.cos((Math.PI * 2 * index) / wheelSlices.length)},${50 + 50 * Math.sin((Math.PI * 2 * index) / wheelSlices.length)} A50,50 0 0,1 ${50 + 50 * Math.cos((Math.PI * 2 * (index + 1)) / wheelSlices.length)},${50 + 50 * Math.sin((Math.PI * 2 * (index + 1)) / wheelSlices.length)} Z`} />
              ))}
            </svg>
          </Box>
        </Center>
        <Center marginTop="30px">
          <Button leftIcon={<FaRedo />} colorScheme="teal" onClick={spinWheel}>
            Spin
          </Button>
        </Center>
      </Box>
    </Flex>
  );
};

export default Index;
