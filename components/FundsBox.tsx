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
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { walletContext } from "../utils/walletContext";
import { ethers } from "ethers";
const { abi2 } = require("../utils/Fanvest.json");
export default function FundsBox({ props }: any) {
  const [wallet, setWallet] = useContext(walletContext);
  const [mintAmt, setMintAmt] = useState(0);
  const [inTxn, setInTxn] = useState(false);
  //console.log("caS", props.contractAddress, props.signer);

  const mintFraction = async () => {
    const contract = new ethers.Contract(
      props.contractAddress,
      abi2,
      props.signer
    );
    if (wallet.address) {
      setInTxn(true);
      try {
        await contract.mint(1, mintAmt, {
          value: ethers.utils.parseEther(mintAmt.toString()),
        });
        toast.success(`Minted ${mintAmt} token successfully`);
      } catch (e) {
        toast.error(String(e.message));
      }
      setInTxn(false);
    } else {
      toast.error("Please connect to MetaMask");
    }
  };
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
          {props.minted} / {props.goal} SOLD
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
              {(props.balance / props.goal) * 100}%
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
              {props.fee} MATIC
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
              onChange={(e) => setMintAmt(Number(e.target.value))}
            />
            <InputRightAddon>Fractions</InputRightAddon>
          </InputGroup>
          <MintButton mintFraction={mintFraction} />
        </Flex>
      </Flex>
    </Box>
  );
}
