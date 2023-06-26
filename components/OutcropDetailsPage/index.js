import React from "react";
import {
  Container,
  Form,
  Input,
  TextArea,
  Button,
  List,
  ListItem,
  Headline,
} from "./OutcropDetailsPage.styled";

const OutcropDetailsPage = ({
  formState,
  onFormSubmit,
  onInputChange,
  submittedData,
  title,
}) => {
  const dataKeys = [
    "gesteinsart",
    "gesteinsklasse",
    "schichtung",
    "faltung",
    "mineralien",
    "allgemeines",
    "interpretation",
  ];

  return (
    <>
      <header>
        <Headline>Aufschluss 1 Titel</Headline>
      </header>
      <Container>
        <Form onSubmit={onFormSubmit}>
          {dataKeys.map((key) => (
            <div
              className={`form-field${
                key === "allgemeines" || key === "interpretation"
                  ? " multiline"
                  : ""
              }`}
              key={key}
            >
              <label htmlFor={key}>{capitalizeFirstLetter(key)}:</label>
              {key === "allgemeines" || key === "interpretation" ? (
                <TextArea
                  id={key}
                  name={key}
                  value={formState?.[key] || ""}
                  onChange={onInputChange}
                  rows={5}
                />
              ) : (
                <Input
                  type="text"
                  id={key}
                  name={key}
                  value={formState?.[key] || ""}
                  onChange={onInputChange}
                />
              )}
            </div>
          ))}

          <Button type="submit">Erstellen</Button>
        </Form>

        {/* Submitted data */}
        {submittedData && submittedData.length > 0 && (
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
      </Container>
    </>
  );
};

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default OutcropDetailsPage;
