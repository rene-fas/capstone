import React from "react";
import { capitalizeFirstLetter } from "../../helper/functions";
import Link from "next/link";

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
      <Header>
        <Headline>{title}</Headline>
      </Header>
      <Container>
        <Form onSubmit={onFormSubmit}>
          {dataKeys.map((key) => (
            <FormField key={key}>
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
            </FormField>
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
        <Link href="/outcrops">
          <Button>Back</Button>
        </Link>
      </Container>
    </>
  );
};

export default OutcropDetailsPage;
