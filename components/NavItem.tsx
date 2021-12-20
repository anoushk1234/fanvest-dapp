import React from "react";
import {
  Flex,
  Text,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuList,
  Box,
} from "@chakra-ui/react";

export default function NavItem({
  icon,
  title,
  description,
  active,
  navSize,
}: {
  icon: any;
  title: string;
  description: string;
  active: boolean;
  navSize: string;
}) {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize == "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Box
          backgroundColor={!active ? "transparent" : "orange.400"}
          // border={!active ? "5px solid" : "none"}
          // borderColor={!active ? "orange.400" : "transparent"}
          p={3}
          borderRadius={35}
          transition={["all", "1s", "ease-in-out"]}
          _hover={{
            textDecor: "none",
            backgroundColor: "white",
            color: "black",
          }}
          w={navSize == "large" ? "100%" : "auto"}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? "white" : "gray.500"}
                _hover={{
                  color: "white",
                }}
              />
              <Text ml={5} display={navSize == "small" ? "none" : "flex"}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Box>
      </Menu>
    </Flex>
  );
}
