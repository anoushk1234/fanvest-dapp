import {
  Box,
  chakra,
  Button,
  Text,
  useColorModeValue,
  Stack,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";

import { FaTwitter } from "react-icons/fa";

export default function Heros() {
  return (
    <Box px={8} py={10} mx="auto">
      <Box
        w={{ base: "full", md: 11 / 12, xl: 9 / 12 }}
        mx="auto"
        textAlign={{ base: "left", md: "center" }}
      >
        <chakra.h1
          mb={6}
          fontSize={{ base: "4xl", md: "7xl" }}
          fontWeight="bold"
          lineHeight="none"
          letterSpacing={{ base: "normal", md: "tight" }}
          color={useColorModeValue("gray.900", "gray.100")}
        >
          Creators get{" "}
          <Text
            display={{ base: "block", lg: "inline" }}
            w="full"
            bgClip="text"
            bgGradient="linear(to-r,#FF008A,#00D1FF)"
            fontWeight="extrabold"
          >
            freedom,
          </Text>{" "}
          fans get quality cinema.
        </chakra.h1>
        <chakra.p
          px={{ base: 0, lg: 24 }}
          mb={6}
          fontSize={{ base: "lg", md: "2xl" }}
          color={useColorModeValue("gray.600", "gray.300")}
        >
          Fanvest allows indie film makers to launch their film projects as
          fractional NFTs on Polygon and Solana that fans can mint to fund the
          film
        </chakra.p>
        <Stack
          direction={{ base: "column", sm: "row" }}
          mb={{ base: 4, md: 8 }}
          spacing={2}
          justifyContent={{ sm: "left", md: "center" }}
        >
          <Link href="/auth/login">
            <Button
              as="a"
              variant="solid"
              mt={5}
              // colorScheme="teal"
              display="inline-flex"
              alignItems="center"
              bgColor="orange.400"
              justifyContent="center"
              w={{ base: "full", sm: "auto" }}
              mb={{ base: 2, sm: 0 }}
              size="lg"
              cursor="pointer"
            >
              LFG🚀🚀🚀
              <Icon boxSize={4} ml={1} viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </Icon>
            </Button>
          </Link>
        </Stack>
      </Box>
    </Box>
  );
}
