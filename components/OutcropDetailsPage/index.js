import React, { useState, useEffect } from "react";
import { capitalizeFirstLetter } from "../../helper/functions";
import { useRouter } from "next/router";
import {
  Form,
  FormField,
  Input,
  TextArea,
  InputRow,
  Label,
  MultilineField,
} from "./OutcropDetailsPage.styled";

import {
  Container,
  Headline,
  Header,
  List,
  ListItem,
  Button,
} from "../component.styled";

const OutcropDetailsPage = () => {
  const [fieldTripId, setFieldTripId] = useState("");
  const [outcropId, setOutcropId] = useState("");
  const [formState, setFormState] = useState({});
  const [currentOutcrop, setCurrentOutcrop] = useState({});
  const [submittedData, setSubmittedData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedFieldTrips = getStoredFieldTrips();
      const currentFieldTripId = localStorage.getItem("currentFieldTripId");
      const currentOutcropId = localStorage.getItem("currentOutcropId");
      setFieldTripId(currentFieldTripId);
      const outcropIdFromStorage = parseInt(currentOutcropId);
      const currentFieldTrip = storedFieldTrips.find(
        (fieldTrip) => fieldTrip.id === parseInt(currentFieldTripId)
      );

      const outcrop =
        currentFieldTrip &&
        currentFieldTrip.outcrops &&
        currentFieldTrip.outcrops.find(
          (outcrop) => outcrop.id === parseInt(currentOutcropId)
        );

      setCurrentOutcrop(outcrop);

      if (outcropIdFromStorage) {
        setOutcropId(outcropIdFromStorage);
      } else {
        console.error(
          "Invalid outcropId stored in local storage:",
          currentOutcropId
        );
      }

      if (outcrop && outcrop.details) {
        setSubmittedData(outcrop.details);
      }
    } catch (error) {
      console.error(
        "Error retrieving outcrop details from local storage:",
        error
      );
    }
  }, []);

  const handleBack = () => {
    router.back();
  };

  const dataKeys = [
    "Gesteinsart",
    "Gesteinsklasse",
    "Schichtung",
    "Faltung",
    "Mineralien",
    "Allgemeines",
    "Interpretation",
  ];

  const getStoredFieldTrips = () => {
    try {
      const storedData = localStorage.getItem("fieldTrips");
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error("Error parsing stored field trips data:", error);
      return [];
    }
  };

  const setStoredFieldTrips = (data) => {
    try {
      localStorage.setItem("fieldTrips", JSON.stringify(data));
    } catch (error) {
      console.error("Error setting stored field trips data:", error);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newData = {};

    for (const key of dataKeys) {
      newData[key] = formData.get(key);
    }

    try {
      const storedFieldTrips = getStoredFieldTrips();
      const updatedFieldTrips = storedFieldTrips.map((fieldTrip) => {
        if (fieldTrip.id === parseInt(fieldTripId)) {
          const updatedOutcrops = fieldTrip.outcrops.map((outcrop) => {
            if (outcrop.id === parseInt(outcropId)) {
              const updatedDetails = outcrop.details
                ? [...outcrop.details, newData]
                : [newData];
              return {
                ...outcrop,
                details: updatedDetails,
              };
            }
            return outcrop;
          });

          return {
            ...fieldTrip,
            outcrops: updatedOutcrops,
          };
        }
        return fieldTrip;
      });

      setStoredFieldTrips(updatedFieldTrips);
      setSubmittedData((prevSubmittedData) => [...prevSubmittedData, newData]);
      setFormState({});
    } catch (error) {
      console.error("Error updating stored field trips data:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Header>
        <Headline>{currentOutcrop ? currentOutcrop.name : ""}</Headline>
      </Header>
      <Container>
        <Form onSubmit={handleFormSubmit}>
          {dataKeys.map((key) => (
            <FormField key={key}>
              <Label htmlFor={key}>{capitalizeFirstLetter(key)}:</Label>
              {key === "Allgemeines" || key === "Interpretation" ? (
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
        {submittedData.length > 0 && (
          <List>
            {submittedData.map((data, index) => (
              <ListItem key={index}>
                <List>
                  {dataKeys.map((key) => (
                    <ListItem key={key}>
                      <strong>{capitalizeFirstLetter(key)}:</strong> {data[key]}
                    </ListItem>
                  ))}
                </List>
              </ListItem>
            ))}
          </List>
        )}

        <Button onClick={handleBack}>Go Back</Button>
      </Container>
    </>
  );
};

export default OutcropDetailsPage;
