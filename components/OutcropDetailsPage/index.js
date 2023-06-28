import React, { useState } from "react";
import { capitalizeFirstLetter } from "../../helper/functions";
import { useRouter } from "next/router";

import { Form, FormField, Input, TextArea } from "./OutcropDetailsPage.styled";

import {
  Container,
  Headline,
  Header,
  List,
  ListItem,
  Button,
} from "../component.styled";

const OutcropDetailsPage = () => {
  const router = useRouter();
  const { query } = router;
  const fieldTripId = query.fieldtripId;
  const outcropId = query.outcropId;
  const outcropTitle = query.title;
  console.log("QueryID", query);
  const handleBack = () => {
    router.back();
  };

  const dataKeys = [
    "gesteinsart",
    "gesteinsklasse",
    "schichtung",
    "faltung",
    "mineralien",
    "allgemeines",
    "interpretation",
  ];

  const getStoredSubmittedData = () => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("submittedData");
      return storedData ? JSON.parse(storedData) : {};
    }
    return {};
  };

  const setStoredSubmittedData = (data) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("submittedData", JSON.stringify(data));
    }
  };

  const [formState, setFormState] = useState({});

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newData = {};

    for (const key of dataKeys) {
      newData[key] = formData.get(key);
    }

    const storedSubmittedData = getStoredSubmittedData();
    const dataForFieldTrip = storedSubmittedData[fieldTripId] || {};
    const dataForOutcropId = dataForFieldTrip[outcropId] || [];
    const updatedData = {
      ...storedSubmittedData,
      [fieldTripId]: {
        ...dataForFieldTrip,
        [outcropId]: [...dataForOutcropId, newData],
      },
    };
    setStoredSubmittedData(updatedData);

    setFormState({});
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const storedSubmittedData = getStoredSubmittedData();

  return (
    <>
      <Header>
        <Headline>{outcropTitle}</Headline>
      </Header>
      <Container>
        <Form onSubmit={handleFormSubmit}>
          {dataKeys.map((key) => (
            <FormField key={key}>
              <label htmlFor={key}>{capitalizeFirstLetter(key)}:</label>
              {key === "allgemeines" || key === "interpretation" ? (
                <TextArea
                  id={key}
                  name={key}
                  value={formState?.[key] || ""}
                  onChange={handleInputChange}
                  rows={5}
                />
              ) : (
                <Input
                  type="text"
                  id={key}
                  name={key}
                  value={formState?.[key] || ""}
                  onChange={handleInputChange}
                />
              )}
            </FormField>
          ))}

          <Button type="submit">Erstellen</Button>
        </Form>

        {/* Submitted data */}
        {storedSubmittedData &&
          storedSubmittedData[fieldTripId] &&
          storedSubmittedData[fieldTripId][outcropId] &&
          storedSubmittedData[fieldTripId][outcropId].length > 0 && (
            <List>
              {storedSubmittedData[fieldTripId][outcropId].map(
                (data, index) => (
                  <ListItem key={index}>
                    <List>
                      {dataKeys.map((key) => (
                        <ListItem key={key}>
                          <strong>{capitalizeFirstLetter(key)}:</strong>{" "}
                          {data[key]}
                        </ListItem>
                      ))}
                    </List>
                  </ListItem>
                )
              )}
            </List>
          )}
        <Button onClick={handleBack}>Go Back</Button>
      </Container>
    </>
  );
};

export default OutcropDetailsPage;
