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
    dateError: false,
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
    if (
      fieldtripData.newFieldTripTitle.trim() !== "" &&
      !fieldtripData.dateError
    ) {
      const newFieldTrip = {
        id: fieldtripData.fieldtrips.length + 1,
        title: fieldtripData.newFieldTripTitle,
        date: fieldtripData.newFieldTripDate,
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
      dateError: !isValidDate(date),
    }));
  };

  const handleCancelAddFieldTrip = () => {
    setFieldtripData((prevData) => ({
      ...prevData,
      newFieldTripTitle: "",
      newFieldTripDate: "",
      dateError: false,
      showPopup: false,
    }));
  };

  const isValidDate = (date) => {
    const pattern = /^(0?[1-9]|[12][0-9]|3[01])\.(0?[1-9]|1[0-2])\.\d{4}$/;
    return pattern.test(date);
  };

  const {
    fieldtrips,
    showPopup,
    newFieldTripTitle,
    newFieldTripDate,
    dateError,
  } = fieldtripData;

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
            placeholder="Enter field trip title"
          />
          <input
            type="text"
            value={newFieldTripDate}
            onChange={handleDateChange}
            placeholder="Enter date (dd.mm.yyyy)"
            className={dateError ? "error" : ""}
          />
          {dateError && (
            <p className="error-text">Please enter a valid date (dd.mm.yyyy)</p>
          )}
          <Button onClick={handleCancelAddFieldTrip}>Cancel</Button>
          <Button onClick={handleAddFieldTrip}>Add</Button>
        </Dialog>
      )}
    </Container>
  );
};

export default FieldTripListPage;
