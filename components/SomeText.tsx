import {
    Box,
    Heading,
    useBreakpointValue,
    useColorMode,
  } from "@chakra-ui/react";
  
  const SomeText = () => {
    const { colorMode } = useColorMode();
    const textSize = useBreakpointValue({
      base: "xs",
      sm: "md",
    });
  
    return (
      <>
        <Heading as="h2" fontSize="3xl">
          Fund your next film w/ crypto
        </Heading>
  
        <Box
          backgroundColor={colorMode === "light" ? "gray.200" : "gray.500"}
          padding={4}
          borderRadius={4}
        >
          <Box d="flex" alignItems="center" fontSize={textSize}>
            v1.0.0
          </Box>
        </Box>
      </>
    );
  };

  export default SomeText;