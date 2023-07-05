import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Container,
  Headline,
  Header,
  List,
  ListItem,
  Button,
  Dialog,
  ButtonGroup,
} from "../component.styled";
import { fieldtrips as mockFieldtrips } from "../../db/mocked/index.js";
import useLocalStorageState from "use-local-storage-state";

const FieldTripListPage = () => {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [newFieldTripName, setNewFieldTripName] = useState("");
  const [newFieldTripDate, setNewFieldTripDate] = useState("");
  const [fieldtrips, setFieldtrips] = useLocalStorageState("fieldTrips", {
    defaultValue: mockFieldtrips,
  });

  const handleAddFieldTrip = () => {
    if (newFieldTripName.trim() !== "" && newFieldTripDate.trim() !== "") {
      const newDate = formatDate(newFieldTripDate);

      const newFieldTrip = {
        id: fieldtrips.length + 1,
        fieldtripname: newFieldTripName,
        fieldtripdate: newDate,
        outcrops: [],
      };
      setFieldtrips([...fieldtrips, newFieldTrip]);
      setNewFieldTripName("");
      setNewFieldTripDate("");
      setShowPopup(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const handleCancelAddFieldTrip = () => {
    setNewFieldTripName("");
    setNewFieldTripDate("");
    setShowPopup(false);
  };

  const handleFieldTripLinkClick = (fieldTripId) => {
    localStorage.setItem("currentFieldTripId", fieldTripId);
  };

  const handleDeleteFieldTrip = (fieldTripId) => {
    const updatedFieldTrips = fieldtrips.filter(
      (fieldtrip) => fieldtrip.id !== fieldTripId
    );
    setFieldtrips(updatedFieldTrips);
    localStorage.setItem("fieldTrips", JSON.stringify(updatedFieldTrips));
  };

  return (
    <Container>
      <Header>
        <Headline>Field Trip List</Headline>
      </Header>
      <List>
        {fieldtrips.map((fieldtrip) => (
          <ListItem key={fieldtrip.id}>
            <ButtonGroup>
              <Link href={`/outcroplist/${fieldtrip.id}`} passHref>
                <Button onClick={() => handleFieldTripLinkClick(fieldtrip.id)}>
                  {fieldtrip.fieldtripname} {fieldtrip.fieldtripdate}
                </Button>
              </Link>
              <Button onClick={() => handleDeleteFieldTrip(fieldtrip.id)}>
                -
              </Button>
            </ButtonGroup>
          </ListItem>
        ))}
      </List>
      <Button onClick={() => setShowPopup(true)}>Add Field Trip</Button>

      {showPopup && (
        <Dialog>
          <h2>Add Field Trip</h2>
          <input
            type="text"
            value={newFieldTripName}
            onChange={(e) => setNewFieldTripName(e.target.value)}
            placeholder="Field Trip Name"
          />
          <input
            type="date"
            value={newFieldTripDate}
            onChange={(e) => setNewFieldTripDate(e.target.value)}
            placeholder="Select a date"
          />
          <ButtonGroup>
            <Button onClick={handleCancelAddFieldTrip}>Cancel</Button>
            <Button onClick={handleAddFieldTrip}>Add</Button>
          </ButtonGroup>
        </Dialog>
      )}
    </Container>
  );
};

export default FieldTripListPage;
