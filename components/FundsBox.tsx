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
          Funded
        </Heading>
        <Heading as="h1" size="lg" fontWeight="600" color="white" mb="4px">
          {props.funding} / {props.goal} FANX
        </Heading>
        <Progress
          value={(props.funding / props.goal) * 100}
          size="md"
          borderRadius="lg"
          // border="1px solid grey"
          sx={{
            "div[role='progressbar']": {
              bg: "linear-gradient(to right, blue, red);",
            },
          }}
        />
        <Text
          fontSize="md"
          bgGradient="linear-gradient(to-tr,red,blue, blue)"
          bgClip="text"
          fontWeight="semibold"
          mb="4px"
        >
          {(props.funding / props.goal) * 100}% funded
        </Text>
        <Flex>
          <Box>
            <Heading
              as="h4"
              mt="1rem"
              size="sm"
              fontWeight="semibold"
              color="white"
              mb="4px"
            >
              You Own
            </Heading>
            <Heading as="h1" size="lg" fontWeight="600" color="white" mb="4px">
              {props.share}%
            </Heading>
          </Box>
          <Box ml="10rem">
            <Heading
              as="h4"
              mt="1rem"
              size="sm"
              fontWeight="semibold"
              color="white"
              mb="4px"
            >
              Tokens left
            </Heading>
            <Heading
              as="h1"
              size="lg"
              fontWeight="600"
              bgGradient="linear-gradient(to-tr,red,blue, blue)"
              bgClip="text"
              mb="4px"
            >
              {props.goal - props.funding}
            </Heading>
          </Box>
        </Flex>
        <Flex justifyContent="flex-end" p={4}>
          <MintButton />
        </Flex>
      </Flex>
    </Box>
  );
}
