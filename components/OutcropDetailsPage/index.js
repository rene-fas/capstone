import React from "react";
import {
  Container,
  Heading,
  Form,
  Label,
  Input,
  TextArea,
  Button,
  List,
  ListItem,
} from "./OutcropDetailsPage.styled";

const OutcropDetailsPage = ({
  formState,
  onFormSubmit,
  onInputChange,
  submittedData,
}) => {
  const {
    gesteinsart,
    gesteinsklasse,
    schichtung,
    faltung,
    mineralien,
    allgemeines,
    interpretation,
  } = formState || {};

  return (
    <>
      <Container>
        <header>
          <Heading>Aufschluss 1 Tite</Heading>
        </header>

        <Form onSubmit={onFormSubmit}>
          <div>
            <Label htmlFor="gesteinsart">Gesteinsart:</Label>
            <Input
              type="text"
              id="gesteinsart"
              name="gesteinsart"
              value={gesteinsart || ""}
              onChange={onInputChange}
            />
          </div>

          <div>
            <Label htmlFor="gesteinsklasse">Gesteinsklasse:</Label>
            <Input
              type="text"
              id="gesteinsklasse"
              name="gesteinsklasse"
              value={gesteinsklasse || ""}
              onChange={onInputChange}
            />
          </div>

          <div>
            <Label htmlFor="schichtung">Schichtung:</Label>
            <Input
              type="text"
              id="schichtung"
              name="schichtung"
              value={schichtung || ""}
              onChange={onInputChange}
            />
          </div>

          <div>
            <Label htmlFor="faltung">Faltung:</Label>
            <Input
              type="text"
              id="faltung"
              name="faltung"
              value={faltung || ""}
              onChange={onInputChange}
            />
          </div>

          <div>
            <Label htmlFor="mineralien">Mineralien:</Label>
            <Input
              type="text"
              id="mineralien"
              name="mineralien"
              value={mineralien || ""}
              onChange={onInputChange}
            />
          </div>

          <div>
            <Label htmlFor="allgemeines">Allgemeines:</Label>
            <Input
              type="text"
              id="allgemeines"
              name="allgemeines"
              value={allgemeines || ""}
              onChange={onInputChange}
            />
          </div>

          <div>
            <Label htmlFor="interpretation">Interpretation:</Label>
            <Input
              type="text"
              id="interpretation"
              name="interpretation"
              value={interpretation || ""}
              onChange={onInputChange}
            />
          </div>

          <Button type="submit">Submit</Button>
        </Form>

        {submittedData && submittedData.length > 0 && (
          <div>
            <Heading>Submitted Data:</Heading>
            <List>
              {submittedData.map((data, index) => (
                <ListItem key={index}>
                  <p>
                    <strong>Gesteinsart:</strong> {data.gesteinsart}
                  </p>
                  <p>
                    <strong>Gesteinsklasse:</strong> {data.gesteinsklasse}
                  </p>
                  <p>
                    <strong>Schichtung:</strong> {data.schichtung}
                  </p>
                  <p>
                    <strong>Faltung:</strong> {data.faltung}
                  </p>
                  <p>
                    <strong>Mineralien:</strong> {data.mineralien}
                  </p>
                  <p>
                    <strong>Allgemeines:</strong> {data.allgemeines}
                  </p>
                  <p>
                    <strong>Interpretation:</strong> {data.interpretation}
                  </p>
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </Container>
    </>
  );
};

export default OutcropDetailsPage;
