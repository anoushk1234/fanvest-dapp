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
      maxH="350px"
      bgColor="rgba(0, 0, 0, 0.46);"
    >
      <Flex flexDir="column">
        <Heading as="h4" size="sm" fontWeight="semibold" color="white" mb="4px">
          Funded
        </Heading>
        <Heading as="h1" size="lg" fontWeight="600" color="white" mb="4px">
          {props.minted} / {props.goal} FANX
        </Heading>
        <Progress
          value={(props.minted / props.goal) * 100}
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
          {(props.minted / props.goal) * 100}% funded
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
              {props.goal - props.minted}
            </Heading>
          </Box>
        </Flex>
        <Flex justifyContent="space-between" m={1}>
          <Flex flexDir="column">
            <Heading
              as="h4"
              size="sm"
              fontWeight="semibold"
              color="white"
              mb="4px"
            >
              Mint price
            </Heading>
            <Heading as="h1" size="lg" fontWeight="600" color="white" mb="4px">
              {props.fee} FANX
            </Heading>
          </Flex>
        </Flex>
        <Flex
          flexDir="row"
          m={1}
          p={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <InputGroup size="md" mr={2} p={1}>
            <Input
              type="number"
              placeholder="0"
              value={props.mintAmount}
              onChange={(e) => props.setMintAmt(e.target.value)}
            />
            <InputRightAddon>Fractions</InputRightAddon>
          </InputGroup>
          <MintButton mintFraction={props.mintFraction} />
        </Flex>
      </Flex>
    </Box>
  );
}
