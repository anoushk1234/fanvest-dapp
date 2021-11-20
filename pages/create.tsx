import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import SideBar from "../components/Sidebar";
import { Flex, Button, Box, Heading } from "@chakra-ui/react";
const Hom: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Flex direction="row">
      <SideBar />
        <Box flex={1} p={4} m={3}>
          <Heading as="h1" size="xl">
            Home
          </Heading>
          <Link href="/about">
            <Button>About</Button>
          </Link>
        </Box>
      </Flex>
    </>
  );
};

export default Hom;
