import React from "react";
import { Heading, Box, Text } from "@chakra-ui/layout";
export default function ProjectInfo({ title, desc }: any) {
  return (
    <>
      <Heading
        bgGradient="linear(to-tr, #4e54c8,#8f94fb)"
        marginLeft="10"
        marginTop="20"
        bgClip="text"
      >
        {title}
      </Heading>
      <Box maxW="90%">
        <Text margin={10} fontSize={28} noOfLines={15}>
          {desc}
        </Text>
      </Box>
    </>
  );
}
