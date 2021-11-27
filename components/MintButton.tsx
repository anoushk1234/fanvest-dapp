import { Button, Text } from "@chakra-ui/react";

export default function MintButton(props: any) {
  return (
    <Button bg="white" _hover={{ bg: "white" }} size="lg" {...props}>
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
