import {
  Heading,
  Input,
  Textarea,
  InputGroup,
  InputRightAddon,
  Button,
} from "@chakra-ui/react";

import Link from "next/link";

function CreateForm({
  setTitle,
  setDescription,
  setFee,
  uploadToIPFS,
  setFractions,
  setFile,
  setDate,
}: any) {
  return (
    <>
      <Input
        m={2}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={"Title"}
      />
      <Textarea
        m={2}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={"Description"}
      />
      <Input
        onChange={(e) => setFractions(e.target.value)}
        placeholder={"Fractions"}
      />
      <InputGroup m={2}>
        <Input
          type="file"
          p={1}
          accept="image/*"
          onChange={(e) =>
            e.target.files ? setFile(e.target.files[0]) : undefined
          }
        />
        <InputRightAddon>
          {" "}
          <Link href="#">Preview</Link>{" "}
        </InputRightAddon>
      </InputGroup>

      <InputGroup m={2}>
        <Input
          onChange={(e) => setFee(e.target.value)}
          placeholder={"Amount"}
        />
        <InputRightAddon>MATIC</InputRightAddon>
      </InputGroup>

      <hr />
      <Input
        type="datetime-local"
        onChange={({ target }) => {
          setDate(new Date(target.value));
        }}
      />
      <Button m={2} variant="outline" p={4} onClick={uploadToIPFS}>
        Launch Project
      </Button>
    </>
  );
}

export default CreateForm;
