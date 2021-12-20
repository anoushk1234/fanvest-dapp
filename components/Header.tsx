import { Flex, Button, Text, Box, Image } from "@chakra-ui/react";
import Link from "next/link";

function Header({ bal, address, handleWalletConnect }: any) {
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
    <Flex rounded="md" direction="row" p={4} justifyContent="space-between">
      <Link href="/" passHref>
        <Flex ml="2rem" mt="1rem" maxWidth={"md"}>
          <Image
            position="absolute"
            zIndex="overlay"
            src="https://res.cloudinary.com/dev-connect/image/upload/v1637389107/img/finallogo_fzlrzm.png"
            alt="logo"
            maxW="4rem"
          />
        </Flex>
      </Link>
      <Flex p={3} align={"center"}>
        {bal && address ? (
          <>
            <Box m={2} p={2}>
              <Link href="#">How it works?</Link>
            </Box>
            <Button variant="outline" p={4} rounded={"md"} m={2}>
              {" "}
              {parseFloat(bal).toFixed(4)}
            </Button>
            <Button variant="outline" p={4} m={2} rounded={"md"}>
              {" "}
              {addressDisplay}
            </Button>
            <Link href="/auth/login">
              <Button
                m={3}
                px={4}
                color="white"
                border="5px solid "
                bg="transparent"
                borderRadius={35}
                borderColor={"orange.400"}
                h={["2rem", "3rem", "3rem", "3rem"]}
                w={["6rem", "9rem", "9rem", "9rem"]}
                _hover={{ bg: "white", color: "black" }}
              >
                Your profile
              </Button>
            </Link>
          </>
        ) : (
          <Button
            m={3}
            p={4}
            borderRadius={35}
            h={["2rem", "3rem", "3rem", "3rem"]}
            w={["6rem", "9rem", "9rem", "9rem"]}
            color="white"
            _hover={{ bg: "white", color: "black" }}
            bgColor="orange.400"
            onClick={handleWalletConnect}
          >
            <Text
              fontSize={["0.6rem", "1rem", "1rem", "1rem"]}
              fontWeight="bold"
            >
              Connect Wallet
            </Text>
          </Button>
        )}
      </Flex>
    </Flex>
  );
}

export default Header;
