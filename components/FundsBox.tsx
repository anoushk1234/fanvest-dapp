import React from "react";
import {
  Heading,
  Flex,
  Input,
  Textarea,
  InputGroup,
  Box,
  Progress,
  Text,
  Skeleton,
  Image,
  InputRightAddon,
  Button,
} from "@chakra-ui/react";
import MintButton from "./MintButton";
export default function FundsBox({ props }: any) {
  return (
    <Box
      border="2px solid white"
      borderRadius="lg"
      w="464px"
      ml={20}
      mt={69}
      mb={20}
      p="4"
      maxH="297.84px"
      bgColor="rgba(0, 0, 0, 0.46);"
    >
      <Flex flexDir="column">
        <Heading as="h4" size="sm" fontWeight="semibold" color="white" mb="4px">
          Funding
        </Heading>
        <Heading as="h1" size="lg" fontWeight="600" color="white" mb="4px">
          {props.funding} FANX
        </Heading>
        <Progress
          value={(props.funding / props.goal) * 100}
          size="md"
          borderRadius="lg"
          border="1px solid grey"
          sx={{
            "div[role='progressbar']": {
              bg: "linear-gradient(to right, blue, red);",
            },
          }}
        />
        <Flex justifyContent="flex-end" p={4}>
          <MintButton />
        </Flex>
      </Flex>
    </Box>
  );
}
