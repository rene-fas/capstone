import React, { useState, useEffect } from "react";
import Link from "next/link";

import {
  Container,
  Headline,
  Header,
  List,
  ListItem,
  Button,
} from "../component.styled";

const FieldTripListPage = () => {
  const [fieldtrips, setFieldTrips] = useState([]);

  useEffect(() => {
    const storedFieldTrips = localStorage.getItem("fieldTrips");
    if (storedFieldTrips) {
      setFieldTrips(JSON.parse(storedFieldTrips));
    }
  }, []);

  const handleAddFieldTrip = () => {
    const newFieldTrip = {
      id: fieldtrips.length + 1,
      title: `Field Trip ${fieldtrips.length + 1}`,
    };
    const updatedFieldTrips = [...fieldtrips, newFieldTrip];
    setFieldTrips(updatedFieldTrips);
    localStorage.setItem("fieldTrips", JSON.stringify(updatedFieldTrips));
  };

  return (
    <Container>
      <Header>
        <Headline>Fieldtrip List</Headline>
      </Header>
      <List>
        {fieldtrips.map((fieldtrip) => (
          <ListItem key={fieldtrip.id}>
            <Link
              href={`/outcroplist/${fieldtrip.id}`}
              as={`/outcroplist/${fieldtrip.id}`}
            >
              <Button>{fieldtrip.title}</Button>
            </Link>
          </ListItem>
        ))}
      </List>
      <Button onClick={handleAddFieldTrip}>Add Field Trip</Button>
    </Container>
  );
};

export default FieldTripListPage;
