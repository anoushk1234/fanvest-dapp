import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import { FaMagic, FaEthereum } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import NavItem from "./NavItem";
import Link from "next/link";
import { useRouter } from "next/router";
export default function SidebarBarComp() {
  const [navSize, changeNavSize] = useState("large");
  const router = useRouter();
  const [activePage, setActivePage] = useState(router.pathname);
  const handleNavClick = (e: any) => {
    setActivePage(e.target.getAttribute("href"));
  };
  return (
    <Flex
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      borderRadius={navSize == "small" ? "15px" : "30px"}
      w={navSize == "small" ? "75px" : "200px"}
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        as="nav"
      >
        <Link href="/create" passHref>
          <button onClick={handleNavClick}>
            <NavItem
              navSize={navSize}
              icon={FaMagic}
              title="Create"
              active={activePage == "/create"}
              description="This is the description for the dashboard."
            />
          </button>
        </Link>
        <Link href="/profile" passHref>
          <button onClick={handleNavClick}>
            <NavItem
              navSize={navSize}
              icon={CgProfile}
              title="Profile"
              active={activePage == "/profile"}
              description={""}
            />
          </button>
        </Link>
        {/* <button
          onClick={() => {
            Router.push("/withdraw");
            setActivePage("/withdraw");
            console.log(activePage);
          }}
        >
          <NavItem
            navSize={navSize}
            icon={FaEthereum}
            title="Withdraw"
            active={activePage == "/withdraw"}
            description={""}
          />
        </button> */}

        {/* <NavItem navSize={navSize} icon={FiUser} title="Clients" active={false} description={""}/>
        <NavItem navSize={navSize} icon={IoPawOutline} title="Animals" active={false} description={""} />
        <NavItem navSize={navSize} icon={FiDollarSign} title="Stocks" active={false} description={""}/>
        <NavItem navSize={navSize} icon={FiBriefcase} title="Reports" active={false} description={""}/>
        <NavItem navSize={navSize} icon={FiSettings} title="Settings" active={false} description={""} /> */}
      </Flex>

      {/* <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Divider display={navSize == "small" ? "none" : "flex"} />
        <Flex mt={4} align="center">
          <Avatar size="sm" src="avatar-1.jpg" />
          <Flex
            flexDir="column"
            ml={4}
            display={navSize == "small" ? "none" : "flex"}
          >
            <Heading as="h3" size="sm">
              Sylwia Weller
            </Heading>
            <Text color="gray">Admin</Text>
          </Flex>
        </Flex>
      </Flex> */}
    </Flex>
  );
}
