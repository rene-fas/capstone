import React, { useState, useEffect } from "react";
import { capitalizeFirstLetter } from "../../helper/functions";
import { useRouter } from "next/router";
import { TextArea, Label } from "./OutcropDetailsPage.styled";

import {
  Container,
  Headline,
  Header,
  StyledBack,
  StyledBackButton,
} from "../component.styled";

import ImageList from "../ImageList";
import ImageUploadForm from "../ImageUploadForm";

import dynamic from "next/dynamic";

// Import Leaflet and react-leaflet components dynamically
const LeafletMap = dynamic(() => import("../LeafletMap"), {
  ssr: false, // Disable server-side rendering
});

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
        setEditedData(outcrop.details[0] || {});
      }
    } catch (error) {
      console.error(
        "Error retrieving outcrop details from local storage:",
        error
      );
    }
  }, [uploadedImagesCount]); // Update currentOutcrop whenever uploadedImagesCount changes

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
    // Save changes in the edited textfield to local storage
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
        <StyledBackButton onClick={handleBack}>
          <StyledBack
            src="/back-arrow-svgrepo-com.svg"
            alt="Back button"
            width={1}
            height={1}
          />
        </StyledBackButton>
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
        <LeafletMap
          currentOutcrop={currentOutcrop}
          uploadedImagesCount={uploadedImagesCount}
        />
        <ImageList key={uploadedImagesCount} />

        <ImageUploadForm
          onUpload={() => setUploadedImagesCount((count) => count + 1)}
        />
      </Container>
    </>
  );
};

export default OutcropDetailsPage;
