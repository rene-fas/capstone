import React, { useState, useEffect } from "react";
import { capitalizeFirstLetter } from "../../helper/functions";
import { useRouter } from "next/router";
import { TextArea, Label } from "./OutcropDetailsPage.styled";

import { Container, Headline, Header, Button } from "../component.styled";

import ImageList from "../ImageList";
import ImageUploadForm from "../ImageUploadForm";

const OutcropDetailsPage = () => {
  const [fieldTripId, setFieldTripId] = useState("");
  const [outcropId, setOutcropId] = useState("");
  const [currentOutcrop, setCurrentOutcrop] = useState({});
  const [editedData, setEditedData] = useState({});
  const [uploadedImagesCount, setUploadedImagesCount] = useState(0);

  const router = useRouter();

  useEffect(() => {
    try {
      const storedFieldTrips = getStoredFieldTrips();
      const currentFieldTripId = localStorage.getItem("currentFieldTripId");
      const currentOutcropId = localStorage.getItem("currentOutcropId");
      setFieldTripId(currentFieldTripId); // set the fieldTripId we are working with from local storage
      const outcropIdFromStorage = parseInt(currentOutcropId); // set the outcropId we are working with from local storage
      const currentFieldTrip = storedFieldTrips.find(
        (fieldTrip) => fieldTrip.id === parseInt(currentFieldTripId) // find the field trip we are working with
      );

      const outcrop =
        currentFieldTrip &&
        currentFieldTrip.outcrops &&
        currentFieldTrip.outcrops.find(
          (outcrop) => outcrop.id === parseInt(currentOutcropId) // find the outcrop we are working with
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
        setEditedData(outcrop.details[0] || {});
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
  ]; // Data keys for the outcrop details page

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

  const handleEditField = (event) => {
    const { name, value } = event.target;
    setEditedData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    saveEditedDataToLocalStorage(); // Save changes to local storage
  };

  const saveEditedDataToLocalStorage = () => {
    try {
      const storedFieldTrips = getStoredFieldTrips();
      const updatedFieldTrips = storedFieldTrips.map((fieldTrip) => {
        if (fieldTrip.id === parseInt(fieldTripId)) {
          const updatedOutcrops = fieldTrip.outcrops.map((outcrop) => {
            if (outcrop.id === parseInt(outcropId)) {
              const updatedDetails = outcrop.details
                ? [...outcrop.details]
                : [];
              updatedDetails[0] = editedData; // Update the first item with the edited data
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
    } catch (error) {
      console.error("Error updating stored field trips data:", error);
    }
  };

  return (
    <>
      <Header>
        <Headline>{currentOutcrop ? currentOutcrop.name : ""}</Headline>
      </Header>
      <Container>
        {dataKeys.map((key) => (
          <div key={key}>
            <Label htmlFor={key}>{capitalizeFirstLetter(key)}:</Label>
            {
              <TextArea
                rows={key === "Allgemeines" || key === "Interpretation" ? 5 : 2}
                id={key}
                name={key}
                value={editedData?.[key] || ""}
                onChange={handleEditField}
                onBlur={saveEditedDataToLocalStorage}
              />
            }
          </div>
        ))}
        <ImageList key={uploadedImagesCount} />

        <ImageUploadForm
          onUpload={() => setUploadedImagesCount((count) => count + 1)}
        />

        <Button onClick={handleBack}>Go Back</Button>
      </Container>
    </>
  );
};

export default OutcropDetailsPage;
