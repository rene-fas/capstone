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
  EditButton,
  PopupHeadline,
  StyledInput,
  StyledLinkButtonText,
  StyledLinkButtonDate,
} from "../component.styled";

import useLocalStorageState from "use-local-storage-state";
// Conditionally import the mock data
let mockFieldtrips = null;

// Check if the mock data file exists
const hasMockData = process.env.NODE_ENV === "development";
if (hasMockData) {
  import("../../db/mocked/index.js").then((module) => {
    mockFieldtrips = module.fieldtrips;
  });
}

const FieldTripListPage = () => {
  const router = useRouter();
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [newFieldTripName, setNewFieldTripName] = useState("");
  const [newFieldTripDate, setNewFieldTripDate] = useState("");
  const [fieldtrips, setFieldtrips] = useLocalStorageState("fieldTrips", {
    defaultValue: mockFieldtrips || [], // Use mockFieldtrips if it exists, otherwise fallback to an empty array
  });

  const [editingFieldTripId, setEditingFieldTripId] = useState(null);
  const [editedFieldTripName, setEditedFieldTripName] = useState("");
  const [editedFieldTripDate, setEditedFieldTripDate] = useState("");

  const handleFieldTripLinkClick = (fieldTripId) => {
    localStorage.setItem("currentFieldTripId", fieldTripId); // set currentFieldTripId in local storage for navigation
  };

  const handleAddFieldTrip = () => {
    // handle add field trip which happens when user clicks on add button
    if (newFieldTripName.trim() !== "" && newFieldTripDate.trim() !== "") {
      const newDate = formatDate(newFieldTripDate);
      let newFieldTrip;

      if (fieldtrips.length > 0) {
        newFieldTrip = {
          id: fieldtrips[fieldtrips.length - 1].id + 1, // added fieldtrip id is dependent on the length of fieldtrips
          fieldtripname: newFieldTripName, // added fieldtrip name from input
          fieldtripdate: newDate, // added fieldtrip date from input
          outcrops: [],
        };
      } else {
        newFieldTrip = {
          id: 1, // set the new fieldtrip id as 1 if fieldtrips array is empty
          fieldtripname: newFieldTripName, // added fieldtrip name from input
          fieldtripdate: newDate, // added fieldtrip date from input
          outcrops: [],
        };
      }

      setFieldtrips([...fieldtrips, newFieldTrip]); // add new fieldtrip to fieldtrips array in local storage
      setNewFieldTripName(""); // clear input field
      setNewFieldTripDate(""); // clear input field
      setShowAddPopup(false); // close popup
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
    // close popup when user clicks on cancel button
    setNewFieldTripName("");
    setNewFieldTripDate("");
    setShowAddPopup(false);
  };

  const handleUpdateFieldTrip = () => {
    // handle update field trip which happens when user clicks on update button to update fieldtrips array in local storage
    if (
      editedFieldTripName.trim() !== "" &&
      editedFieldTripDate.trim() !== ""
    ) {
      const updatedFieldTrips = fieldtrips.map((fieldTrip) => {
        if (fieldTrip.id === editingFieldTripId) {
          return {
            ...fieldTrip,
            fieldtripname: editedFieldTripName,
            fieldtripdate: formatDate(editedFieldTripDate),
          };
        }
        return fieldTrip;
      });

      setFieldtrips(updatedFieldTrips); // update fieldtrips array in local storage with the inpuut values
      setEditingFieldTripId(null);
      setEditedFieldTripName("");
      setEditedFieldTripDate("");
      setShowEditPopup(false);
    }
  };

  const handleCancelEditFieldTrip = () => {
    // close popup when user clicks on cancel button
    setEditingFieldTripId(null);
    setEditedFieldTripName("");
    setEditedFieldTripDate("");
    setShowEditPopup(false);
  };

  const handleDeleteFieldTrip = (fieldTripId) => {
    // handle delete field trip which happens when user clicks on delete button
    const updatedFieldTrips = fieldtrips.filter(
      //filter fieldtrips array in local storage to remove fieldTripId
      (fieldtrip) => fieldtrip.id !== fieldTripId
    );
    setFieldtrips(updatedFieldTrips);
    localStorage.setItem("fieldTrips", JSON.stringify(updatedFieldTrips)); // update fieldtrips array in local storage with the updated fieldtrips
  };

  return (
    <Container>
      <Header>
        <Headline>Exkursionsliste</Headline>
      </Header>
      {fieldtrips.length > 0 ? (
        <List>
          {fieldtrips.map((fieldtrip) => (
            <ListItem key={fieldtrip.id}>
              <ButtonGroup>
                <CustomLink href={`/outcroplist/${fieldtrip.id}`} passHref>
                  <LinkButton
                    onClick={() => handleFieldTripLinkClick(fieldtrip.id)}
                  >
                    <StyledLinkButtonText>
                      {fieldtrip.fieldtripname}
                    </StyledLinkButtonText>
                    <StyledLinkButtonDate>
                      {fieldtrip.fieldtripdate}
                    </StyledLinkButtonDate>
                  </LinkButton>
                </CustomLink>
                <RemoveButton
                  onClick={() => handleDeleteFieldTrip(fieldtrip.id)}
                >
                  -
                </RemoveButton>
                <EditButton
                  onClick={() => {
                    setEditingFieldTripId(fieldtrip.id);
                    setEditedFieldTripName(fieldtrip.fieldtripname);
                    setEditedFieldTripDate(fieldtrip.fieldtripdate);
                    setShowEditPopup(true);
                  }}
                  disabled={editingFieldTripId !== null}
                >
                  Edit
                </EditButton>
              </ButtonGroup>
            </ListItem>
          ))}
        </List>
      ) : (
        <></>
      )}
      <Button onClick={() => setShowAddPopup(true)}>
        Exkursion hinzufügen
      </Button>

      {showAddPopup && !showEditPopup && (
        <Dialog>
          <PopupHeadline>Exkursion hinzufügen</PopupHeadline>
          <StyledInput
            type="text"
            value={newFieldTripName}
            onChange={(event) => setNewFieldTripName(event.target.value)}
            placeholder="z.B. Eifel"
          />
          <StyledInput
            type="date"
            value={newFieldTripDate}
            onChange={(event) => setNewFieldTripDate(event.target.value)}
            placeholder="Select a date"
          />
          <ButtonGroup>
            <Button onClick={handleCancelAddFieldTrip}>Cancel</Button>
            <Button onClick={handleAddFieldTrip}>Add</Button>
          </ButtonGroup>
        </Dialog>
      )}

      {showEditPopup && (
        <Dialog>
          <PopupHeadline>Exkursion bearbeiten</PopupHeadline>
          <StyledInput
            type="text"
            value={editedFieldTripName}
            onChange={(event) => setEditedFieldTripName(event.target.value)}
            placeholder="Field Trip Name"
          />
          <StyledInput
            type="date"
            value={editedFieldTripDate}
            onChange={(event) => setEditedFieldTripDate(event.target.value)}
            placeholder="Select a date"
          />
          <ButtonGroup>
            <Button onClick={handleCancelEditFieldTrip}>Abbrechen</Button>
            <Button onClick={handleUpdateFieldTrip}>Bearbeiten</Button>
          </ButtonGroup>
        </Dialog>
      )}
    </Container>
  );
};

export default FieldTripListPage;
