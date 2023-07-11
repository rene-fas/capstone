import React, { useState, useEffect } from "react";
import { capitalizeFirstLetter } from "../../helper/functions";
import { useRouter } from "next/router";
import { TextArea, Label } from "./OutcropDetailsPage.styled";

import { v4 as uuidv4 } from "uuid";
import { Image } from "cloudinary-react";

import {
  Container,
  Headline,
  Header,
  List,
  ListItem,
  Button,
  Dialog,
  ButtonGroup,
  LinkButton,
  RemoveButton,
  CustomLink,
  EditButton,
} from "../component.styled";

const OutcropDetailsPage = () => {
  const [fieldTripId, setFieldTripId] = useState("");
  const [outcropId, setOutcropId] = useState("");
  const [currentOutcrop, setCurrentOutcrop] = useState({});
  const [editedData, setEditedData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
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

  const handleEditField = (event) => {
    const { name, value } = event.target;
    setEditedData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    saveEditedDataToLocalStorage();
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
              updatedDetails[0] = editedData;
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
  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleCancelUpload = () => {
    setSelectedFile(null);
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile); // Append the file to the FormData object

    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const imageUrl = data.imageUrl;
        setUploadedImages((prevImages) => [...prevImages, imageUrl]);
        setSelectedFile(null);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const handleDeleteImage = (index) => {
    setUploadedImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });
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
            <TextArea
              rows={key === "Allgemeines" || key === "Interpretation" ? 5 : 2}
              id={key}
              name={key}
              value={editedData?.[key] || ""}
              onChange={handleEditField}
              onBlur={saveEditedDataToLocalStorage}
            />
          </div>
        ))}

        <div>
          <Button>
            <label htmlFor="photo-upload">Add Photo</label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={(event) => handleFileSelect(event.target.files[0])} // Update this line
              style={{ display: "none" }}
            />
          </Button>
          {selectedFile && (
            <>
              <div>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected file"
                  style={{ height: "200px" }}
                />
              </div>
              <Button onClick={handleCancelUpload}>Cancel</Button>
              <Button onClick={handleUpload}>Upload</Button>
            </>
          )}
        </div>

        {uploadedImages.map((imageUrl, index) => (
          <div key={uuidv4()}>
            <Image
              cloudName={process.env.CLOUDINARY_CLOUD_NAME}
              publicId={imageUrl}
              width="400"
              height="200"
              crop="fill"
            />
            <Button onClick={() => handleDeleteImage(index)}>Delete</Button>
          </div>
        ))}

        <Button onClick={handleBack}>Go Back</Button>
      </Container>
    </>
  );
};

export default OutcropDetailsPage;
