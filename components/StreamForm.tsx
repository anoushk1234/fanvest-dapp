import {
  Heading,
  Input,
  Textarea,
  InputGroup,
  InputRightAddon,
  Button,
} from "@chakra-ui/react";

import Link from "next/link";

export default function StreamForm({ setFile, date }: any) {
  return (
    <>
      <Heading mb={4} as="h2">
        Create a new stream
      </Heading>
      <Heading mb={4} as="h4">
        Launch Date: {date}
      </Heading>
      <form>
        <InputGroup>
          <Input
            type="file"
            p={1}
            accept="video/*"
            onChange={(e) =>
              e.target.files ? setFile(e.target.files[0]) : undefined
            }
          />
        </InputGroup>
      </form>
    </>
  );
}
