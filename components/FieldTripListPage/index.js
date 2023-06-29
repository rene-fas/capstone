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
  const [newFieldTripDate, setNewFieldTripDate] = useState("");
  const [dateError, setDateError] = useState(false);

  useEffect(() => {
    const storedFieldTrips = localStorage.getItem("fieldTrips");
    if (storedFieldTrips) {
      setFieldTrips(JSON.parse(storedFieldTrips));
    }
  }, []);

  const handleAddFieldTrip = () => {
    if (newFieldTripTitle.trim() !== "" && !dateError) {
      const newFieldTrip = {
        id: fieldtrips.length + 1,
        title: newFieldTripTitle,
        date: newFieldTripDate,
      };
      const updatedFieldTrips = [...fieldtrips, newFieldTrip];
      setFieldTrips(updatedFieldTrips);
      localStorage.setItem("fieldTrips", JSON.stringify(updatedFieldTrips));
      setNewFieldTripTitle("");
      setNewFieldTripDate("");
      setShowPopup(false);
    }
  };

  const handleTitleChange = (e) => {
    setNewFieldTripTitle(e.target.value);
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setNewFieldTripDate(date);
    setDateError(!isValidDate(date));
  };

  const handleCancelAddFieldTrip = () => {
    setNewFieldTripTitle("");
    setNewFieldTripDate("");
    setDateError(false);
    setShowPopup(false);
  };

  const isValidDate = (date) => {
    const pattern = /^(0?[1-9]|[12][0-9]|3[01])\.(0?[1-9]|1[0-2])\.\d{4}$/;
    return pattern.test(date);
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
                  fieldtripDate: fieldtrip.date,
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
