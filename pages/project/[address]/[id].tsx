import React, { useEffect, useState, useContext } from "react";
const { abi2 } = require("../../../utils/Fanvest.json");
const { bytecode2 } = require("../../../utils/bytecode2.json");
import { supabase } from "../../../utils/supabaseClient";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { walletContext } from "../../../utils/walletContext";
import { useRouter } from "next/router";
import { NextPage } from "next";
import {
  Heading,
  Flex,
  Input,
  Textarea,
  InputGroup,
  Box,
  Text,
  Skeleton,
  Image,
  IconButton,
  InputRightAddon,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaDiscord } from "react-icons/fa";
import ProjectInfo from "../../../components/ProjectInfo";
import FundsBox from "../../../components/FundsBox";
import Backers from "../../../components/Backers";
import { hexValue } from "@ethersproject/bytes";
import SignInWithDiscord from "../../../utils/SignInWithDiscord";

declare const window: any;
const Project: NextPage = () => {
  const backgrounds = [
    `url("data:image/svg+xml, %3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'560\' height=\'185\' viewBox=\'0 0 560 185\' fill=\'none\'%3E%3Cellipse cx=\'102.633\' cy=\'61.0737\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23ED64A6\' /%3E%3Cellipse cx=\'399.573\' cy=\'123.926\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23F56565\' /%3E%3Cellipse cx=\'366.192\' cy=\'73.2292\' rx=\'193.808\' ry=\'73.2292\' fill=\'%2338B2AC\' /%3E%3Cellipse cx=\'222.705\' cy=\'110.585\' rx=\'193.808\' ry=\'73.2292\' fill=\'%23ED8936\' /%3E%3C/svg%3E")`,
    `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ED8936'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%2348BB78'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%230BC5EA'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%23ED64A6'/%3E%3C/svg%3E")`,
    `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='102.633' cy='61.0737' rx='102.633' ry='61.0737' fill='%23ED8936'/%3E%3Cellipse cx='399.573' cy='123.926' rx='102.633' ry='61.0737' fill='%2348BB78'/%3E%3Cellipse cx='366.192' cy='73.2292' rx='193.808' ry='73.2292' fill='%230BC5EA'/%3E%3Cellipse cx='222.705' cy='110.585' rx='193.808' ry='73.2292' fill='%23ED64A6'/%3E%3C/svg%3E")`,
    `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ECC94B'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%239F7AEA'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%234299E1'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%2348BB78'/%3E%3C/svg%3E")`,
  ];
  const router = useRouter();
  const [wallet] = useContext(walletContext);
  const [image, setImage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [fee, setFee] = useState<string>("");
  const [minted, setMinted] = useState<Number>(0);
  const [hasBought, setHasBought] = useState<boolean>(false);
  const [inTxn, setInTxn]: any = useState(false);
  const [discord, setDiscord] = useState<string>("");
  const [balance, setBalance] = useState<Number>(0);
  const [totalSupply, setTotalSupply] = useState<string>("");
  const [fans, setFans] = useState<Array<any>>([]);
  const [contractAddress, setContractAddress] = useState<string>("");
  const { address, id }: any = router.query;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const fetchProject = async (address: any, id: any) => {
    const { data, error } = await supabase
      .from("projects")
      .select()
      .eq("public_address", address)
      .eq("id", id);
    error ? toast.error(error) : null;
    return data;
  };

  useEffect(() => {
    fetchProject(address, id).then((data: any) => {
      console.log(data);
      data ? setImage(data[0].image) : null;
      data ? setTitle(data[0].title) : null;
      data ? setDesc(data[0].desc) : null;
      data ? setDiscord(data[0].discord) : null;
      data ? setContractAddress(data[0].contract_address) : null;
    });
  }, [address, id, balance]);

  useEffect(() => {
    async function declareContract() {
      try {
        await window.ethereum.enable();
      } catch (error) {}
      if (wallet.address) {
        const contract = new ethers.Contract(contractAddress, abi2, signer);
        console.log(contract);
        const supplies = await contract.getSupply();
        console.log(supplies);
        console.log(supplies.toString());
        setTotalSupply(supplies.toString());
      } else {
        console.log("Please connect to MetaMask");
      }
    }
    declareContract();
  }, [wallet.address, contractAddress, signer]);
  async function getFans(contract: any) {
    const fans = await contract.getFans();
    console.log(fans, "fans");
    setFans(fans);
  }
  async function getMinted(contract: any) {
    const minted = await contract.minted();
    console.log(minted, "minted");
    setMinted(minted.toString());
  }
  async function getBalance(contract: any) {
    const balance = await contract.getBalances();
    console.log(balance, "balance");
    setBalance(balance.toString());
  }
  async function getRate(contract: any) {
    const rate = await contract.rate();
    console.log(rate, "rate");
    setFee(rate.toString());
  }

  useEffect(() => {
    if (wallet.address && contractAddress && signer) {
      const contract = new ethers.Contract(contractAddress, abi2, signer);

      getFans(contract);
      getMinted(contract);
      getBalance(contract);
      getRate(contract);
    }
  }, [setInTxn, wallet.address]);
  console.log(address, id);

  useEffect(() => {
    let fn: any = [];
    fans.forEach((fan: any) => {
      fn.push(fan.toUpperCase());
    });
    fans.length > 0 && fn.includes(wallet.address.toUpperCase())
      ? setHasBought(true)
      : setHasBought(false);
  }, [fans, wallet.address]);

  return (
    <>
      <Box m={10}>
        <Flex>
          <Flex flexDir="column" justifyContent="space-evenly">
            <Flex flexDir="row">
              <Skeleton isLoaded={image ? true : false} margin={5} boxSize="md">
                <Image
                  borderRadius="xl"
                  margin={5}
                  maxH="auto"
                  src={image}
                  alt="movie poster"
                />
              </Skeleton>
              <Box
                boxShadow={"lg"}
                maxW={"649px"}
                direction={{ base: "column-reverse", md: "row" }}
                width={"xl"}
                rounded={"xl"}
                mt={"2rem"}
                ml={"4rem"}
                p={3}
                justifyContent={"space-between"}
                position={"relative"}
                bgColor="#F7FAFC12"
                // border="5px solid"
                // borderColor="orange.400"
                _after={{
                  content: '""',
                  position: "absolute",
                  height: "21px",
                  width: "29px",
                  left: "35px",
                  top: "-10px",
                  backgroundSize: "cover",
                  //backgroundImage: `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='29' height='21' viewBox='0 0 29 21' fill='none'%3E%3Cpath d='M6.91391 21C4.56659 21 2.81678 20.2152 1.66446 18.6455C0.55482 17.0758 0 15.2515 0 13.1727C0 11.2636 0.405445 9.43939 1.21634 7.7C2.0699 5.91818 3.15821 4.3697 4.48124 3.05454C5.84695 1.69697 7.31935 0.678787 8.89845 0L13.3157 3.24545C11.5659 3.96667 9.98676 4.94242 8.57837 6.17273C7.21266 7.36061 6.25239 8.63333 5.69757 9.99091L6.01766 10.1818C6.27373 10.0121 6.55114 9.88485 6.84989 9.8C7.19132 9.71515 7.63944 9.67273 8.19426 9.67273C9.34658 9.67273 10.4776 10.097 11.5872 10.9455C12.7395 11.7939 13.3157 13.1091 13.3157 14.8909C13.3157 16.8848 12.6542 18.4121 11.3311 19.4727C10.0508 20.4909 8.57837 21 6.91391 21ZM22.5982 21C20.2509 21 18.5011 20.2152 17.3488 18.6455C16.2391 17.0758 15.6843 15.2515 15.6843 13.1727C15.6843 11.2636 16.0898 9.43939 16.9007 7.7C17.7542 5.91818 18.8425 4.3697 20.1656 3.05454C21.5313 1.69697 23.0037 0.678787 24.5828 0L29 3.24545C27.2502 3.96667 25.6711 4.94242 24.2627 6.17273C22.897 7.36061 21.9367 8.63333 21.3819 9.99091L21.702 10.1818C21.9581 10.0121 22.2355 9.88485 22.5342 9.8C22.8756 9.71515 23.3238 9.67273 23.8786 9.67273C25.0309 9.67273 26.1619 10.097 27.2715 10.9455C28.4238 11.7939 29 13.1091 29 14.8909C29 16.8848 28.3385 18.4121 27.0155 19.4727C25.7351 20.4909 24.2627 21 22.5982 21Z' fill='%239F7AEA'/%3E%3C/svg%3E")`,
                }}
                _before={{
                  content: '""',
                  position: "absolute",
                  zIndex: "-1",
                  height: "500px",
                  maxW: "640px",
                  width: "full",

                  filter: "blur(145px)",
                  transform: "scale(0.5) translateY(-50%)  ",

                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  top: 0,
                  left: 0,

                  //backgroundImage: backgrounds[0],
                  backgroundImage:
                    backgrounds[(Math.floor(Math.random() * 4) + 1) % 4],
                }}
              >
                <Heading p={4} size="lg" marginBottom={5}>
                  Fanvesters
                </Heading>
                <Backers backers={fans ? fans : []} />
              </Box>
            </Flex>

            <Flex flexDir="row" justifyContent="space-between" mt={"10rem"}>
              <Flex flexDir="column">
                <ProjectInfo title={title} desc={desc} />
                {hasBought ? (
                  <Flex p={5}>
                    <Button
                      bgColor={"#7289DA"}
                      variant="solid"
                      onClick={async () => {
                        // console.log(discord);
                        SignInWithDiscord(
                          process.env.NEXT_PUBLIC_ENV === "dev"
                            ? `http://localhost:3000/out/${discord}`
                            : `https://alpha.fanvest.in/out/${discord}`
                        );
                      }}
                      maxW="190px"
                      maxH={50}
                      rightIcon={<FaDiscord />}
                    >
                      Join the Discord
                    </Button>
                  </Flex>
                ) : null}
              </Flex>
              <Flex flexDir="column" w="min-content">
                <FundsBox
                  props={{
                    funding: "700",
                    goal: totalSupply,
                    address: address,
                    id: id,
                    share: 0.001,
                    fee: fee,
                    provider: provider,
                    signer: signer,
                    contractAddress: contractAddress,
                    minted: minted,
                    balance: balance,
                    setBalance: setBalance,
                    getBalance: getBalance,
                  }}
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Project;
