import { Button, Text } from "@chakra-ui/react";

export default function MintButton({ mintFraction }: any) {
  return (
    <Button
      onClick={mintFraction}
      bg="white"
      _hover={{ bg: "white" }}
      size="lg"
    >
      <Text
        fontSize="xl"
        fontWeight="bold"
        bgGradient="linear(to-r,#101A78,#821CBD)"
        bgClip="text"
      >
        Mint
      </Text>
    </Button>
  );
}
