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

  // Arrange the wheel slice colors based on the colors in Column A without having the same color next to each other
  const shuffleArray = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  };

  const arrangeSlices = (slices) => {
    let arranged = [shuffleArray(slices).pop()]; // Start with a random slice

    while (slices.length > 0) {
      for (let i = 0; i < slices.length; i++) {
        if (slices[i].color !== arranged[arranged.length - 1].color) {
          arranged.push(slices.splice(i, 1)[0]);
          break;
        }
      }

      // Shuffle the remaining slices to try a different order if no different color is found
      shuffleArray(slices);
    }

    return arranged;
  };

  const arrangedSlices = arrangeSlices([...wheelSlices]);

  return (
    <Flex maxW="container.xl" justify="space-between" p="4" bg="white" boxShadow="0 4px 20px rgba(0, 0, 0, 0.2)" borderRadius="lg">
      <Box flex="1" padding="4" boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)" borderRadius="lg" bg="white" margin="2">
        <DenominationList />
      </Box>
      <Box flex="1" padding="4" position="relative" boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)" borderRadius="lg" bg="white" margin="2">
        <Center height="100%">
          <Box position="relative" height="300px" width="300px" boxShadow="0 8px 24px rgba(0, 0, 0, 0.6)">
            <svg viewBox="0 0 100 100" width="300px" height="300px" style={{ transform: `rotate(${rotation}deg)`, transition: "transform 3s ease-out" }}>
              {arrangedSlices.map((slice, index) => (
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
