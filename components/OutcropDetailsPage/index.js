import React, { useState, useEffect } from "react";
import { capitalizeFirstLetter } from "../../helper/functions";
import { useRouter } from "next/router";

import {
  Container,
  Form,
  FormField,
  Input,
  TextArea,
  Button,
  List,
  ListItem,
  Headline,
  Header,
} from "./OutcropDetailsPage.styled";

const OutcropDetailsPage = () => {
  const router = useRouter();
  const { query } = router;
  const outcropId = query.id;

  const handleBack = () => {
    router.push("/");
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
  const [outcropTitle, setOutcropTitle] = useState("");

  useEffect(() => {
    const storedSubmittedData = getStoredSubmittedData();
    if (
      storedSubmittedData &&
      storedSubmittedData[outcropId] &&
      storedSubmittedData[outcropId].length > 0
    ) {
      const [firstData] = storedSubmittedData[outcropId];
      setOutcropTitle(firstData?.title || "");
    }
  }, [outcropId]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newData = {};

    for (const key of dataKeys) {
      newData[key] = formData.get(key);
    }

    const storedSubmittedData = getStoredSubmittedData();
    const dataForOutcropId = storedSubmittedData[outcropId] || [];
    const updatedData = {
      ...storedSubmittedData,
      [outcropId]: [...dataForOutcropId, newData],
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
          storedSubmittedData[outcropId] &&
          storedSubmittedData[outcropId].length > 0 && (
            <List>
              {storedSubmittedData[outcropId].map((data, index) => (
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
              ))}
            </List>
          )}
        <button onClick={handleBack}>Go Back</button>
      </Container>
    </>
  );
};

export default OutcropDetailsPage;
