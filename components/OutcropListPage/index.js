import React from "react";
import Link from "next/link";

import {
  Container,
  Headline,
  Header,
  List,
  ListItem,
} from "../component.styled";

const OutcropListPage = () => {
  const outcrops = [
    { id: 1, title: "Outcrop 1" },
    { id: 2, title: "Outcrop 2" },
    { id: 3, title: "Outcrop 3" },
    // Add more outcrop objects as needed
  ];

  return (
    <Container>
      <Header>
        <Headline>Outcrop List</Headline>
      </Header>
      <List>
        {outcrops.map((outcrop) => (
          <ListItem key={outcrop.id}>
            <Link
              href={{
                pathname: "/outcrop/[id]",
                query: { id: outcrop.id, title: outcrop.title },
              }}
              as={`/outcrop/${outcrop.id}`}
            >
              {outcrop.title}
            </Link>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default OutcropListPage;
