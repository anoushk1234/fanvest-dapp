import {
  Input,
  Button,
  Flex,
  Box,
  VisuallyHidden,
  chakra,
  SimpleGrid,
  GridItem,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { HiOutlineSparkles } from "react-icons/hi/";

const LoginForm = ({
  handleLogin,
  wallet,
}: {
  handleLogin: any;
  wallet: any;
}) => {
  const [name, setName] = useState("");

  return (
    <Box px={8} py={24} mx="auto">
      <SimpleGrid
        alignItems="center"
        w={{ base: "full", xl: 11 / 12 }}
        columns={{ base: 1, lg: 11 }}
        gap={{ base: 0, lg: 24 }}
        mx="auto"
      >
        <GridItem
          colSpan={{ base: "auto", lg: 7 }}
          textAlign={{ base: "center", lg: "left" }}
        >
          <chakra.h1
            mb={4}
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            lineHeight={{ base: "shorter", md: "none" }}
            color={useColorModeValue("gray.900", "gray.200")}
            letterSpacing={{ base: "normal", md: "tight" }}
          >
            Ready to start your journey?
          </chakra.h1>
          {/* <chakra.p
                          mb={{ base: 10, md: 4 }}
                          fontSize={{ base: "lg", md: "xl" }}
                          fontWeight="thin"
                          color="gray.500"
                          letterSpacing="wider"
                      >
                          Low-latency voice and video feels like you’re in the same room. Wave
                          hello over video, watch friends stream their games, or gather up and
                          have a drawing session with screen share.
                      </chakra.p> */}
        </GridItem>
        <GridItem colSpan={{ base: "auto", md: 4 }}>
          <Box as="form" mb={6} rounded="lg" shadow="xl">
            <SimpleGrid
              columns={1}
              px={6}
              py={4}
              spacing={4}
              borderBottom="solid 1px"
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <Flex>
                <VisuallyHidden>Username</VisuallyHidden>
                <Input
                  mt={0}
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="First Name"
                  required
                />
              </Flex>
              {/* <Flex>
                                  <VisuallyHidden>Email Address</VisuallyHidden>
                                  <Input
                                      mt={0}
                                      type="email"
                                      placeholder="Email Address"
                                      required={true || true}
                                  />
                              </Flex>
                              <Flex>
                                  <VisuallyHidden>Password</VisuallyHidden>
                                  <Input
                                      mt={0}
                                      type="password"
                                      placeholder="Password"
                                      required={true || true}
                                  />
                              </Flex> */}
            </SimpleGrid>
            <Flex px={6} py={4}>
              <Button
                py={2}
                w="full"
                colorScheme="blue"
                leftIcon={<HiOutlineSparkles />}
                onClick={() => handleLogin(wallet.address, name)}
              >
                Sign - up
              </Button>
              t
            </Flex>
          </Box>
          {/* <chakra.p fontSize="xs" textAlign="center" color="gray.600">
                          By signing up you agree to our{" "}
                          <chakra.a color="brand.500" >
                              Terms of Service
                          </chakra.a>
                      </chakra.p> */}
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default LoginForm;
