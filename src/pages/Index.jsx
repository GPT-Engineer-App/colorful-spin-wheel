import React, { useState } from "react";
import { Flex, Box, Button, Center, Container, Text } from "@chakra-ui/react";
import { FaRedo } from "react-icons/fa";
import { DenominationList, denominations } from "../components/DenominationList";

const Index = () => {
  const [rotation, setRotation] = useState(0);

  const spinWheel = () => {
    // Generate a random rotation degree between 5000 and 10000 for a good spin effect
    const newRotation = Math.floor(Math.random() * 5000 + 5000);
    setRotation((prevRotation) => prevRotation + newRotation);
  };

  // Calculate the total number of slices required based on the denominations
  const totalSlices = denominations.reduce((total, item) => total + item.quantity, 0);

  // Create an array that contains the correct sequence of colors based on the denominations
  const wheelSlices = denominations.flatMap((denomination) =>
    Array.from({ length: denomination.quantity }, (_, index) => ({
      value: denomination.value,
      color: denomination.color,
    })),
  );

  // Shuffle the array to have a randomized wheel slice order without having the same color next to each other
  const shuffledWheelSlices = (slices) => {
    let shuffled = [];
    while (slices.length > 0) {
      // Find a suitable slice that does not match the color of the last slice in shuffled array
      const nextSliceIndex = slices.findIndex((slice, index) => shuffled.length === 0 || slice.color !== shuffled[shuffled.length - 1].color);
      // If suitable slice is found, move it to shuffled array
      if (nextSliceIndex !== -1) {
        shuffled.push(slices.splice(nextSliceIndex, 1)[0]);
      } else {
        // If no suitable slice is found, break to prevent infinite loop
        break;
      }
    }
    // If there are remaining slices, they were not placed because of color conflict, so we need to interleave them
    while (slices.length > 0) {
      for (let i = 1; i < shuffled.length; i++) {
        if (slices.length === 0) break;
        if (shuffled[i].color !== slices[0].color && shuffled[i - 1].color !== slices[0].color) {
          shuffled.splice(i, 0, slices.shift());
        }
      }
    }
    return shuffled;
  };
  const shuffledSlices = shuffledWheelSlices(wheelSlices.slice()); // Pass a shallow copy of wheelSlices to the shuffling function

  return (
    <Flex maxW="container.xl" justify="space-between" p="4" bg="white" boxShadow="0 4px 20px rgba(0, 0, 0, 0.2)" borderRadius="lg">
      <Box flex="1" padding="4" boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)" borderRadius="lg" bg="white" margin="2">
        <DenominationList />
      </Box>
      <Box flex="1" padding="4" position="relative" boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)" borderRadius="lg" bg="white" margin="2">
        <Box position="absolute" top="0" left="50%" transform="translateX(-50%) translateY(-30px)" width="0" height="0" borderLeft="15px solid transparent" borderRight="15px solid transparent" borderTop="30px solid black" zIndex="2" />
        <Center height="100%">
          <Box position="relative" height="300px" width="300px" boxShadow="0 8px 24px rgba(0, 0, 0, 0.6)">
            <svg viewBox="0 0 100 100" width="300px" height="300px" style={{ transform: `rotate(${rotation}deg)`, transition: "transform 3s ease-out" }}>
              {wheelSlices.map((slice, index) => (
                <path key={index} fill={slice.color} stroke="#fff" strokeWidth="0.5" d={`M50,50 L${50 + 50 * Math.cos((Math.PI * 2 * index) / totalSlices)},${50 + 50 * Math.sin((Math.PI * 2 * index) / totalSlices)} A50,50 0 0,1 ${50 + 50 * Math.cos((Math.PI * 2 * (index + 1)) / totalSlices)},${50 + 50 * Math.sin((Math.PI * 2 * (index + 1)) / totalSlices)} Z`} />
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
