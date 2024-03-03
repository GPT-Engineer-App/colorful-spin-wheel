import React from "react";
import { VStack, HStack, Text, Box } from "@chakra-ui/react";

const denominations = [
  { value: "free hair cut", quantity: 2, color: "hsl(360, 100%, 70%)" },
  { value: "free manicure", quantity: 2, color: "hsl(300, 100%, 70%)" },
  { value: "free pedicure", quantity: 2, color: "hsl(240, 100%, 70%)" },
  { value: "voucher worth 100", quantity: 5, color: "hsl(180, 100%, 70%)" },
  { value: "voucher worth 500", quantity: 1, color: "hsl(120, 100%, 70%)" },
];

const DenominationList = () => {
  return (
    <VStack align="start" spacing={4} marginBottom={8}>
      <Text fontSize="2xl" fontWeight="bold" marginBottom={4}>
        Legend
      </Text>
      {denominations.map((denomination, index) => (
        <HStack key={index}>
          <Box width="50px" height="30px" bgColor={denomination.color} borderRadius="md" />
          <Text fontWeight="bold" marginLeft={3}>
            {denomination.value}
          </Text>
        </HStack>
      ))}
    </VStack>
  );
};

export { DenominationList, denominations };
