import SidebarBarComp from "./SideBarComp";
import { Flex, Text, IconButton } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

export default function SideBar({ bal, address, handleWalletConnect }: any) {
  let addressDisplay;
  if (address) {
    let addArr = address.split("");
    addressDisplay =
      addArr[0] +
      addArr[1] +
      addArr[2] +
      addArr[3] +
      "..." +
      addArr[addArr.length - 4] +
      addArr[addArr.length - 3] +
      addArr[addArr.length - 2] +
      addArr[addArr.length - 1];
  }

  return (
    <Flex
      border="5px solid"
      borderColor="orange.400"
      borderRadius={35}
      p={3}
      maxHeight="130vh"
      maxW="min-content"
      ml="2rem"
      mr="2rem"
    >
      <SidebarBarComp />
      <Flex
        pos="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      ></Flex>
    </Flex>
  );
}
