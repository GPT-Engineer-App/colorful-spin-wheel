import React from "react";
import { VStack, HStack, Text, Box } from "@chakra-ui/react";

const denominations = [
  { value: 500, quantity: 1, color: "hsl(360, 100%, 70%)" },
  { value: 100, quantity: 2, color: "hsl(300, 100%, 70%)" },
  { value: 50, quantity: 3, color: "hsl(240, 100%, 70%)" },
  { value: 40, quantity: 4, color: "hsl(180, 100%, 70%)" },
  { value: 30, quantity: 5, color: "hsl(120, 100%, 70%)" },
  { value: 20, quantity: 6, color: "hsl(60, 100%, 70%)" },
  { value: 10, quantity: 7, color: "hsl(0, 100%, 70%)" },
];

const DenominationList = () => {
  return (
    <VStack align="start" spacing={4} marginBottom={8}>
      {denominations.map((denomination, index) => (
        <HStack key={index}>
          <Text fontWeight="bold">{`${denomination.value} x ${denomination.quantity}`}</Text>
          <Box width="30px" height="30px" bgColor={denomination.color} borderRadius="md" />
        </HStack>
      ))}
    </VStack>
  );
};

export default DenominationList;
