import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import SideBar from "../components/Sidebar";
import { Flex, Button, Box, Heading } from "@chakra-ui/react";
//import { useMounted } from "../utils/useMounted";
import CreateToggler from "../components/CreateToggler";
const Hom: NextPage = () => {
  //const hasMounted = useMounted();
  return (
    <>
      <Head>
        <title>Welcome to Fanvest</title>
      </Head>
      <Flex direction="row">
        <SideBar />
        {/* {!hasMounted ? <CreateToggler /> : null} */}
        {CreateToggler()}
      </Flex>
    </>
  );
};
export async function getStaticProps(context: any) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Hom;
