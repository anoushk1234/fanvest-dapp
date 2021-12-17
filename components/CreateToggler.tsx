import React, { useState, useEffect } from "react";
import {
  Flex,
  useColorModeValue,
  Box,
  Text,
  chakra,
  Button,
  Stack,
  Code,
  useClipboard,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import StreamForm from "./StreamForm";
import CreateForm from "./CreateForm";
import { useContext } from "react";
import { walletContext } from "../utils/walletContext";
import { testAuthentication } from "../utils/IPFSconfig";
import { create as ipfsHttpClient } from "ipfs-http-client";
// import getContractAddress from "../utils/contractAddress";
import { ethers, ContractFactory } from "ethers";
const { abi } = require("../utils/FanvestFactory.json");
const { bytecode } = require("../utils/bytecode.json");
const { abi2 } = require("../utils/Fanvest.json");
const { bytecode2 } = require("../utils/bytecode2.json");
import { supabase } from "../utils/supabaseClient";
import moment from "moment";
declare const window: any;
const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});
export default function CreateToggler() {
  const [page, setPage] = useState("Info");
  const [wallet] = useContext(walletContext);
  const [contractAddress, setContractAddress] = useState("");
  const [title, setTitle]: any = useState("");
  const [description, setDescription]: any = useState("");
  const [inTxn, setInTxn]: any = useState(false);
  const [fee, setFee]: any = useState(0);
  const [fractions, setFractions]: any = useState(0);
  const [file, setFile]: any = useState(undefined);
  const [date, setDate]: any = useState(undefined);
  // const [cid, setCid]: any = useState("");
  const [id, setId]: any = useState("");
  const [created, setCreated] = useState(false);
  const [startStream, setStartStream] = useState(false);
  const { hasCopied, onCopy } = useClipboard(
    process.env.NEXT_PUBLIC_ENV !== "prod"
      ? `http://localhost:3000/project/${wallet.address}/${id}`
      : `https://${process.env.NEXT_PUBLIC_DOMAIN_URL}/project/${wallet.address}/${id}`
  );

  if (hasCopied) {
    toast("copied the link!");
  }

  // const uploadToCloudinary = async () => {
  //   // const formData = new FormData();
  //   // formData.append("file", file);
  //   // formData.append("upload_preset", "public");
  //   // let post = await axios.post(
  //   //   "https://api.cloudinary.com/v1_1/dev-connect/image/upload",
  //   //   formData
  //   // );
  //   // return post.data.secure_url;
  // };

  const createMetaData = async (cid: any) => {
    let metadata = {
      name: title,
      image: `https://ipfs.infura.io/ipfs/${cid}`,
      properties: {
        fractions: fractions,
        fee: fee,
        date: date,
      },
    };
    return JSON.stringify(metadata);
  };
  const deployContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const ca = "0xf079ea59856fbfbfE2f2909144a3892B87ddF9d4";
    if (wallet.address) {
      const FanvestFactory = new ethers.Contract(ca, abi, signer);
      const contract = await FanvestFactory.create();
      const getCA = await FanvestFactory.getContract();
      console.log(getCA, "contract address this");
      return getCA[1];
    } else {
      toast.error("Please connect to MetaMask");
      return "0x";
    }
  };

  const fetchProject = async () => {
    const { data, error } = await supabase.from("projects").select();
    data
      ? data.forEach((element: any) => {
          //console.log(element.contract_address, "contract address");

          if (element.contract_address === contractAddress) {
            console.log(element.id, "element");
            return element.id;
          }
        })
      : null;
  };
  const sendProjectToSupabase = async (
    address: string,
    contractAddress: any,
    ipfsHash: any
  ) => {
    try {
      const { data, error } = await supabase.from("projects").insert(
        {
          public_address: address,
          contract_address: contractAddress,
          title: title,
          desc: description,
          image: `https://ipfs.infura.io/ipfs/${ipfsHash}`,
          fracts: fractions,
          fee: fee,
          date: date,
        },
        { returning: "minimal" }
      );
      // const { data, error } = await supabase.from("projects").select();
      // console.log(data[0]);
      console.log({
        public_address: address,
        contract_address: contractAddress,
        title: title,
        desc: description,
        image: `https://ipfs.infura.io/ipfs/${ipfsHash}`,
        fracts: String(fractions),
        fee: fee,
        date: moment(date).format("DD/MM/YYYY"),
      });
      console.log(data);
      // }
      // console.log(data, error);
    } catch (error) {
      console.log(error);
    }
  };
  const mint_Supply = async (contractAddress: any, cid: any) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    if (wallet.address) {
      setInTxn(true);
      console.log(contractAddress, wallet.address);

      try {
        const contract = new ethers.Contract(contractAddress, abi2, signer);
        let met = await createMetaData(cid);
        console.log(btoa(met), title, fee, fractions);
        const txn = await contract.mintSupply(
          title,
          btoa(met),
          fee,
          fractions,
          {
            gasLimit: 3000000,
          }
        );
        await txn.wait();

        console.log("Txn completed!", txn);
        sendProjectToSupabase(wallet.address, contractAddress, cid);
        toast.success("Supply minted ⛏");
        setInTxn(false);
        return txn;
      } catch (err) {
        console.log(err);
        setInTxn(false);
        return err;
      }
    } else {
      toast.error("Please connect to Metamask");
      return "err";
    }
  };
  const uploadToIPFS = async () => {
    const formData = new FormData();

    formData.append("file", file);
    try {
      const added = await client.add(file, {
        progress: (prog: any) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log(url);
      return added.path;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  useEffect(() => {
    testAuthentication();
  }, []);
  useEffect(() => {
    created
      ? fetchProject().then((res: any) => {
          setId(res);
          setCreated(true);
        })
      : null;
    console.log(contractAddress, "cA");
  }, [contractAddress, created]);
  // useEffect(() => {
  //   console.log(file + "file");
  // }, [file]);
  return (
    <Flex w="full" p={10} alignItems="center" justifyContent="space-evenly">
      <Box py="64px" px="10" bg={useColorModeValue("gray.100", "gray.700")}>
        <Box w="full" px={[10, 4]} mx="auto" textAlign="center">
          <Text mb={2} fontSize="5xl" fontWeight="bold" lineHeight="tight">
            Create some magic
          </Text>
          <chakra.p
            mb={6}
            fontSize={["lg", "xl"]}
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Start by giving a snyopsis of your project and a poster/teaser.
          </chakra.p>
          <Flex justify="center" mx={["auto", 0]} mb={2}>
            <Stack
              direction="row"
              justify="space-between"
              p="2"
              textAlign="center"
              rounded="md"
              bg={useColorModeValue("gray.200", "gray.600")}
            >
              <Button
                colorScheme="brand"
                variant={page === "Info" ? "solid" : "ghost"}
                onClick={() => {
                  setPage("Info");
                  console.log(page);
                }}
                px={6}
              >
                Info
              </Button>
              <Button
                colorScheme="brand"
                variant={page === "Stream" ? "solid" : "ghost"}
                onClick={() => {
                  setPage("Stream");
                  console.log(page);
                }}
                px={6}
              >
                Stream
              </Button>
            </Stack>
          </Flex>
        </Box>
        {/* {<Feature pg={page}></Feature>} */}
        <Flex
          direction="column"
          alignItems={"center"}
          justifyContent={"center"}
        >
          {created ? (
            <>
              <Text>
                You have successfully launched your film! Share this link for
                funding with your fans{" "}
                <Code onClick={onCopy}>
                  {process.env.NEXT_PUBLIC_ENV !== "prod"
                    ? `http://localhost:3000/project/${wallet.address}/${id}`
                    : `https://${process.env.NEXT_PUBLIC_DOMAIN_URL}/project/${wallet.address}/${id}`}
                </Code>
              </Text>
            </>
          ) : page === "Info" ? (
            <CreateForm
              setFile={setFile}
              setTitle={setTitle}
              setDescription={setDescription}
              setFee={setFee}
              uploadToIPFS={uploadToIPFS}
              deployContract={deployContract}
              setFractions={setFractions}
              setDate={setDate}
              mint_Supply={mint_Supply}
              contractAddress={contractAddress}
              setContractAddress={setContractAddress}
              setCreated={setCreated}
            >
              {" "}
            </CreateForm>
          ) : (
            <StreamForm setFile={setFile} date={date} />
          )}
        </Flex>
      </Box>
    </Flex>
  );
}
