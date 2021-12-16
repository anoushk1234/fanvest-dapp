import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { MdWavingHand } from "react-icons/md";

export default function Backers({ backers }: any) {
  return (
    <List spacing={3} overflowY="scroll" height="20rem">
      {backers.length > 0 ? (
        backers.map((backer: any, id: any) => {
          return (
            <ListItem
              borderRadius="2xl"
              py={3}
              px={1}
              m={2}
              border="1px solid"
              borderColor="gray.600"
              key={id}
            >
              {/* <ListIcon as={MdWavingHand} boxSize="30px" /> */}
              {/* <Text fontSize="xl" noOfLines={1}>
              {"👋"}
            </Text> */}
              <Text noOfLines={1} fontSize="lg">
                {"👋 " + backer}
                {/*  + " " + backer.tokenquantity */}
              </Text>
            </ListItem>
          );
        })
      ) : (
        <ListItem>
          <Text fontSize="lg">No backers yet</Text>
        </ListItem>
      )}
    </List>
  );
}
