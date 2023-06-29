import React, { useState, useEffect } from "react";
import Link from "next/link";

import {
  Container,
  Headline,
  Header,
  List,
  ListItem,
  Button,
  Dialog,
} from "../component.styled";

const FieldTripListPage = () => {
  const [fieldtrips, setFieldTrips] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newFieldTripTitle, setNewFieldTripTitle] = useState("");

  useEffect(() => {
    const storedFieldTrips = localStorage.getItem("fieldTrips");
    if (storedFieldTrips) {
      setFieldTrips(JSON.parse(storedFieldTrips));
    }
  }, []);

  const handleAddFieldTrip = () => {
    if (newFieldTripTitle.trim() !== "") {
      const newFieldTrip = {
        id: fieldtrips.length + 1,
        title: newFieldTripTitle,
      };
      const updatedFieldTrips = [...fieldtrips, newFieldTrip];
      setFieldTrips(updatedFieldTrips);
      localStorage.setItem("fieldTrips", JSON.stringify(updatedFieldTrips));
      setNewFieldTripTitle("");
      setShowPopup(false);
    }
  };

  const handleTitleChange = (e) => {
    setNewFieldTripTitle(e.target.value);
  };

  const handleCancelAddFieldTrip = () => {
    setNewFieldTripTitle("");
    setShowPopup(false);
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
              href={{
                pathname: "outcroplist/[fieldtripId]",
                query: {
                  fieldtripTitle: fieldtrip.title,
                },
              }}
              as={`/outcroplist/${fieldtrip.id}`}
            >
              <Button>{fieldtrip.title}</Button>
            </Link>
          </ListItem>
        ))}
      </List>
      <Button onClick={() => setShowPopup(true)}>Add Field Trip</Button>

      {showPopup && (
        <Dialog open>
          <h2>Add Field Trip</h2>
          <input
            type="text"
            value={newFieldTripTitle}
            onChange={handleTitleChange}
            placeholder="Enter field trip title"
          />
          <Button onClick={handleCancelAddFieldTrip}>Cancel</Button>
          <Button onClick={handleAddFieldTrip}>Add</Button>
        </Dialog>
      )}
    </Container>
  );
};

export default FieldTripListPage;
