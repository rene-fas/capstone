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
  LinkButton,
  RemoveButton,
  CustomLink,
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
      // if input is not empty
      const newDate = formatDate(newFieldTripDate); // format new date

      const newFieldTrip = {
        id: fieldtrips.length + 1, // add new fieldtrip id
        fieldtripname: newFieldTripName, // add new fieldtrip name
        fieldtripdate: newDate, // add new fieldtrip date
        outcrops: [], // add new fieldtrip outcrops
      };
      setFieldtrips([...fieldtrips, newFieldTrip]); // update local storage with
      setNewFieldTripName(""); // clear input
      setNewFieldTripDate(""); // clear input
      setShowPopup(false); // close popup
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}.${month}.${year}`; // return formatted date
  };

  const handleCancelAddFieldTrip = () => {
    setNewFieldTripName(""); // clear input
    setNewFieldTripDate(""); // clear input
    setShowPopup(false); // close popup
  };

  const handleFieldTripLinkClick = (fieldTripId) => {
    localStorage.setItem("currentFieldTripId", fieldTripId); // set currentFieldTripId in local storage
  };

  const handleDeleteFieldTrip = (fieldTripId) => {
    const updatedFieldTrips = fieldtrips.filter(
      (fieldtrip) => fieldtrip.id !== fieldTripId // filter out fieldtrips with the same id
    );
    setFieldtrips(updatedFieldTrips); // update local storage with
    localStorage.setItem("fieldTrips", JSON.stringify(updatedFieldTrips)); // updated fieldtrips
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
              <CustomLink href={`/outcroplist/${fieldtrip.id}`} passHref>
                <LinkButton
                  onClick={() => handleFieldTripLinkClick(fieldtrip.id)}
                >
                  {fieldtrip.fieldtripname} {fieldtrip.fieldtripdate}
                </LinkButton>
              </CustomLink>
              <RemoveButton onClick={() => handleDeleteFieldTrip(fieldtrip.id)}>
                -
              </RemoveButton>
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
