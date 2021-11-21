import React, { useState, useEffect } from "react";
import {
  Flex,
  Icon,
  useColorModeValue,
  Box,
  Text,
  chakra,
  SimpleGrid,
  Button,
  Stack,
  Link,
  Code,
  useClipboard,
} from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-toastify";
import StreamForm from "./StreamForm";
import CreateForm from "./CreateForm";
import { useContext } from "react";
import { walletContext } from "../utils/walletContext";
export default function CreateToggler() {
  const [page, setPage] = useState("Info");
  const [wallet] = useContext(walletContext);

  const [title, setTitle]: any = useState(null);
  const [description, setDescription]: any = useState(null);

  const [fee, setFee]: any = useState(0);
  const [fractions, setFractions]: any = useState(0);
  const [file, setFile]: any = useState(undefined);
  const [date, setDate]: any = useState(undefined);
  const [cid, setCid]: any = useState("");

  const [created, setCreated] = useState(false);
  const [startStream, setStartStream] = useState(false);
  const { hasCopied, onCopy } = useClipboard(
    `https://metapass.vercel.app/event/${wallet.address}/${cid}`
  );

  if (hasCopied) {
    toast("copied the link!");
  }

  const uploadToCloudinary = async () => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "public");

    let post = await axios.post(
      "https://api.cloudinary.com/v1_1/devconnect/image/upload",
      formData
    );
    return post.data.secure_url;
  };
  const uploadToIPFS = async () => {};
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
          <Flex justify="center" mx={["auto", 0]} mb={-2}>
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
                You have successfully created an event! Share this link for
                booking{" "}
                <Code onClick={onCopy}>
                  {`https://metapass.vercel.app/event/${wallet.address}/${cid}`}
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
              setFractions={setFractions}
              setDate={setDate}
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
