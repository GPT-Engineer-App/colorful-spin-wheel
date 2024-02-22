import React, { useEffect, useState } from "react";
import { Flex, Box, Button, Center, Container, Text, useToast } from "@chakra-ui/react";
import { FaRedo } from "react-icons/fa";
import { DenominationList, denominations } from "../components/DenominationList";

const calculateWinningColor = (rotation, totalSlices, wheelSlices) => {
  const degreesPerSlice = 360 / totalSlices;
  const winningSliceIndex = Math.floor(((rotation % 360) / degreesPerSlice) % totalSlices);
  return wheelSlices[totalSlices - winningSliceIndex - 1]; // Adjust for the array index and rotation direction
};

const Index = () => {
  const toast = useToast();
  const [winningColor, setWinningColor] = useState(null);
  const [rotation, setRotation] = useState(0);

  const spinWheel = () => {
    // Generate a random rotation degree between 5000 and 10000 for a good spin effect
    const newRotation = Math.floor(Math.random() * 5000 + 5000);
    setRotation((prevRotation) => {
      const finalRotation = prevRotation + newRotation;
      const winningSlice = calculateWinningColor(finalRotation, totalSlices, wheelSlices);
      setWinningColor(winningSlice);
      return finalRotation;
    });
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
      <Box flex="1" padding="4" position="relative" boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)" borderRadius="lg" bg="white" margin="2" overflow="hidden">
        <Box position="absolute" top="-20px" left="50%" transform="translateX(-50%)" width="0" height="0" borderLeft="20px solid transparent" borderRight="20px solid transparent" borderBottom="20px solid black" zIndex="1" />
        <Center height="100%">
          <Box position="relative" height="300px" width="300px" boxShadow="0 8px 24px rgba(0, 0, 0, 0.6)" overflow="hidden">
            <Box position="absolute" top="-20px" left="50%" transform="translateX(-50%)" width="0" height="0" borderLeft="20px solid transparent" borderRight="20px solid transparent" borderBottom="20px solid black" />
            <svg viewBox="0 0 100 100" width="300px" height="300px" style={{ transform: `rotate(${rotation}deg)`, transition: "transform 3s ease-out" }}>
              {arrangedSlices.map((slice, index) => (
                <path key={index} fill={slice.color} stroke="#fff" strokeWidth="0.5" d={`M50,50 L${50 + 50 * Math.cos((Math.PI * 2 * index) / totalSlices)},${50 + 50 * Math.sin((Math.PI * 2 * index) / totalSlices)} A50,50 0 0,1 ${50 + 50 * Math.cos((Math.PI * 2 * (index + 1)) / totalSlices)},${50 + 50 * Math.sin((Math.PI * 2 * (index + 1)) / totalSlices)} Z`} />
              ))}
            </svg>
          </Box>
        </Center>
        <Center marginTop="30px">
          <Button
            leftIcon={<FaRedo />}
            colorScheme="teal"
            onClick={() => {
              spinWheel();
              setTimeout(() => {
                toast({
                  title: `Congratulations, you got a ${winningColor.color}!`,
                  description: `You are lucky to have ${denominations.find((d) => d.color === winningColor.color).value}PHP!`,
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
              }, 3000);
            }}
          >
            Spin
          </Button>
        </Center>
        {winningColor && (
          <Container centerContent marginTop="8">
            <Box bg={winningColor.color} p="4" borderRadius="md" boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)">
              <Text fontSize="xl" fontWeight="bold" color="white">
                Congratulations, you got a {winningColor.color} and you are lucky to have {denominations.find((d) => d.color === winningColor.color).value}PHP!
              </Text>
              <Button mt="4" colorScheme="green">
                Claim
              </Button>
            </Box>
          </Container>
        )}
      </Box>
    </Flex>
  );
};

export default Index;
