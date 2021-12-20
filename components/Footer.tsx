import { FaTwitter } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { Flex, IconButton } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex mx="auto" justify="center">
      <IconButton
        aria-label="Twitter"
        icon={<FaTwitter />}
        variant="ghost"
        size="lg"
        color="white"
        onClick={() => {
          window.open("https://twitter.com/heyfanvest", "_blank");
        }}
      />
      <IconButton
        aria-label="Gmail"
        icon={<FiMail />}
        variant="ghost"
        size="lg"
        color="white"
        onClick={() => {
          window.open("mailto:hello@fanvest.in", "_blank");
        }}
      />
    </Flex>
  );
}
