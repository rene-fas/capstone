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
  const [fieldtripData, setFieldtripData] = useState({
    fieldtrips: [],
    showPopup: false,
    newFieldTripTitle: "",
    newFieldTripDate: "",
  });

  useEffect(() => {
    const storedFieldTrips = localStorage.getItem("fieldTrips");
    if (storedFieldTrips) {
      setFieldtripData((prevData) => ({
        ...prevData,
        fieldtrips: JSON.parse(storedFieldTrips),
      }));
    }
  }, []);

  const handleAddFieldTrip = () => {
    if (fieldtripData.newFieldTripTitle.trim() !== "") {
      const newFieldTrip = {
        id: fieldtripData.fieldtrips.length + 1,
        title: fieldtripData.newFieldTripTitle,
        date: formatDate(fieldtripData.newFieldTripDate),
      };
      const updatedFieldTrips = [...fieldtripData.fieldtrips, newFieldTrip];
      setFieldtripData((prevData) => ({
        ...prevData,
        fieldtrips: updatedFieldTrips,
        newFieldTripTitle: "",
        newFieldTripDate: "",
        showPopup: false,
      }));
      localStorage.setItem("fieldTrips", JSON.stringify(updatedFieldTrips));
    }
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  const handleTitleChange = (e) => {
    setFieldtripData((prevData) => ({
      ...prevData,
      newFieldTripTitle: e.target.value,
    }));
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setFieldtripData((prevData) => ({
      ...prevData,
      newFieldTripDate: date,
    }));
  };

  const handleCancelAddFieldTrip = () => {
    setFieldtripData((prevData) => ({
      ...prevData,
      newFieldTripTitle: "",
      newFieldTripDate: "",
      showPopup: false,
    }));
  };

  const { fieldtrips, showPopup, newFieldTripTitle, newFieldTripDate } =
    fieldtripData;

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
                  fieldtripDate: fieldtrip.date,
                },
              }}
              as={`/outcroplist/${fieldtrip.id}`}
            >
              <Button>
                {fieldtrip.title} {fieldtrip.date}
              </Button>
            </Link>
          </ListItem>
        ))}
      </List>
      <Button
        onClick={() =>
          setFieldtripData((prevData) => ({
            ...prevData,
            showPopup: true,
          }))
        }
      >
        Add Field Trip
      </Button>

      {showPopup && (
        <Dialog open>
          <h2>Add Field Trip</h2>
          <input
            type="text"
            value={newFieldTripTitle}
            onChange={handleTitleChange}
            placeholder="Exkursionsname"
          />
          <input
            type="date"
            value={newFieldTripDate}
            onChange={handleDateChange}
            placeholder="dd-mm-yyyy"
          />
          <Button onClick={handleCancelAddFieldTrip}>Cancel</Button>
          <Button onClick={handleAddFieldTrip}>Add</Button>
        </Dialog>
      )}
    </Container>
  );
};

export default FieldTripListPage;
