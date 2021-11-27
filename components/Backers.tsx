import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import { MdWavingHand } from "react-icons/md";

export default function Backers({ backers }: any) {
  return (
    <List spacing={3}>
      {backers.map((backer: any) => {
        return (
          <ListItem
            borderRadius="2xl"
            py={3}
            px={1}
            m={2}
            border="1px solid"
            borderColor="gray.600"
            key={backer.id}
          >
            <ListIcon as={MdWavingHand} boxSize="30px" />
            {backer.add}
          </ListItem>
        );
      })}
    </List>
  );
}
