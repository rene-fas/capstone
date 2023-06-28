import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  Container,
  Headline,
  Header,
  List,
  ListItem,
  Button,
} from "../component.styled";

const OutcropListPage = () => {
  const outcrops = [
    { id: 1, title: "Outcrop 1" },
    { id: 2, title: "Outcrop 2" },
    { id: 3, title: "Outcrop 3" },
    // Add more outcrop objects as needed
  ];
  const router = useRouter();
  const { query } = router;
  const fieldtripId = query.fieldtripId;
  const handleBack = () => {
    router.back();
  };
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
                pathname: "/outcroplist/[fieldtripId]/outcrop/[outcropId]",
                query: {
                  outcropId: outcrop.id,
                  title: outcrop.title,
                  fieldtripId: fieldtripId,
                },
              }}
              as={`/outcroplist/${fieldtripId}/outcrop/${outcrop.id}`}
            >
              {outcrop.title}
            </Link>
          </ListItem>
        ))}
      </List>
      <Button onClick={handleBack}>Go Back</Button>
    </Container>
  );
};

export default OutcropListPage;
