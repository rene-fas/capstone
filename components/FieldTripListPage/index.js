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
} from "../component.styled";
import { fieldtrips as mockFieldtrips } from "../../db/mocked/index.js";
import useLocalStorageState from "use-local-storage-state";

const FieldTripListPage = () => {
  const router = useRouter();
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [newFieldTripName, setNewFieldTripName] = useState("");
  const [newFieldTripDate, setNewFieldTripDate] = useState("");
  const [fieldtrips, setFieldtrips] = useLocalStorageState("fieldTrips", {
    defaultValue: mockFieldtrips,
  });

  const [editingFieldTripId, setEditingFieldTripId] = useState(null);
  const [editedFieldTripName, setEditedFieldTripName] = useState("");
  const [editedFieldTripDate, setEditedFieldTripDate] = useState("");

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
      setShowAddPopup(false);
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
    setShowAddPopup(false);
  };

  const handleUpdateFieldTrip = () => {
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

      setFieldtrips(updatedFieldTrips);
      setEditingFieldTripId(null);
      setEditedFieldTripName("");
      setEditedFieldTripDate("");
      setShowEditPopup(false);
    }
  };

  const handleCancelEditFieldTrip = () => {
    setEditingFieldTripId(null);
    setEditedFieldTripName("");
    setEditedFieldTripDate("");
    setShowEditPopup(false);
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
              <CustomLink href={`/outcroplist/${fieldtrip.id}`} passHref>
                <LinkButton>
                  {fieldtrip.fieldtripname} {fieldtrip.fieldtripdate}
                </LinkButton>
              </CustomLink>
              <RemoveButton onClick={() => handleDeleteFieldTrip(fieldtrip.id)}>
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
      <Button onClick={() => setShowAddPopup(true)}>Add Field Trip</Button>

      {showAddPopup && !showEditPopup && (
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

      {showEditPopup && (
        <Dialog>
          <h2>Edit Field Trip</h2>
          <input
            type="text"
            value={editedFieldTripName}
            onChange={(e) => setEditedFieldTripName(e.target.value)}
            placeholder="Field Trip Name"
          />
          <input
            type="date"
            value={editedFieldTripDate}
            onChange={(e) => setEditedFieldTripDate(e.target.value)}
            placeholder="Select a date"
          />
          <ButtonGroup>
            <Button onClick={handleCancelEditFieldTrip}>Cancel</Button>
            <Button onClick={handleUpdateFieldTrip}>Update</Button>
          </ButtonGroup>
        </Dialog>
      )}
    </Container>
  );
};

export default FieldTripListPage;
