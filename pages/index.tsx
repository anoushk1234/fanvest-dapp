import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Flex, Button, Box, Heading } from "@chakra-ui/react";
import SomeText from "../components/SomeText";
import Heros from "../components/Hero";
const Home: NextPage = () => {
  return (
    <Box p={4}>
      <Heros />
    </Box>
  );
};

export default Home;
