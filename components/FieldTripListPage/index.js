import React from "react";
import Link from "next/link";
import Router from "next/router";

import {
  Container,
  Headline,
  Header,
  List,
  ListItem,
  Button,
} from "../component.styled";

const FieldTripListPage = () => {
  const fieldtrips = [
    { id: 1, title: "Field Trip 1" },
    { id: 2, title: "Field Trip 2" },
    { id: 3, title: "Field Trip 3" },
    // Add more field trip objects as needed
  ];

  return (
    <Container>
      <Header>
        <Headline>Fieldtrip List</Headline>
      </Header>
      <List>
        {fieldtrips.map((fieldtrip) => (
          <ListItem key={fieldtrip.id}>
            <Link
              href={{
                pathname: "/outcroplist",
                query: { id: fieldtrip.id, title: fieldtrip.title },
              }}
              as={`/outcroplist/${fieldtrip.id}`}
            >
              <Button>{fieldtrip.title}</Button>
            </Link>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default FieldTripListPage;
