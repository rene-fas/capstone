import React, { useState } from "react";
import styled from "styled-components";
import useSWR, { mutate } from "swr";
import Image from "next/image";
import "leaflet/dist/leaflet.css";
import ExifReader from "exifreader";
import { Form, Preview, StyledButton } from "./ImageUploadForm.styled";
import { PopupHeadline } from "../component.styled";

function ImageUploadForm({ onUpload }) {
  const { mutate } = useSWR("/api/images/");
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState(undefined);
  const [showMapMessage, setShowMapMessage] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  async function submitImage(event) {
    event.preventDefault();
    setUploadStatus("Uploading...");
    setShowMapMessage(false); // Reset the map message state
    const formData = new FormData(event.target);
    const currentOutcropId = localStorage.getItem("currentOutcropId");
    const currentFieldTripId = localStorage.getItem("currentFieldTripId");

    try {
      const response = await fetch(
        `/api/upload?currentOutcropId=${currentOutcropId}&currentFieldTripId=${currentFieldTripId}`,
        {
          method: "post",
          body: formData,
        }
      );
      if (response.status === 201) {
        // After successful upload, read EXIF data (if image is jpeg/jpg)
        const fileInput = event.target.querySelector('input[type="file"]');
        const file = fileInput.files[0];
        if (file.type === "image/jpeg" || file.type === "image/jpg") {
          const reader = new FileReader();
          reader.onload = function (e) {
            const exifData = ExifReader.load(e.target.result);

            // Extract GPS data from EXIF
            const latitude = exifData["GPSLatitude"]
              ? exifData["GPSLatitude"].description
              : null;
            const longitude = exifData["GPSLongitude"]
              ? exifData["GPSLongitude"].description
              : null;
            if (latitude !== null && longitude !== null) {
              // Save latitude and longitude in localStorage
              const fieldTrips = JSON.parse(localStorage.getItem("fieldTrips"));
              if (fieldTrips) {
                const fieldTripIndex = fieldTrips.findIndex(
                  (trip) => trip.id === parseInt(currentFieldTripId, 10)
                );
                if (fieldTripIndex !== -1) {
                  const outcropIndex = fieldTrips[
                    fieldTripIndex
                  ].outcrops.findIndex(
                    (o) => o.id === parseInt(currentOutcropId, 10)
                  );
                  if (outcropIndex !== -1) {
                    // Update the latitude and longitude of the corresponding outcrop
                    fieldTrips[fieldTripIndex].outcrops[outcropIndex].latitude =
                      latitude;
                    fieldTrips[fieldTripIndex].outcrops[
                      outcropIndex
                    ].longitude = longitude;
                  }
                }
                localStorage.setItem("fieldTrips", JSON.stringify(fieldTrips));
              }
            } else {
              // Show the map message when latitude or longitude is null
              setShowMapMessage(true);
            }
          };
          reader.readAsArrayBuffer(file);
        } else {
          // Show the map message when latitude or longitude is null
          setShowMapMessage(true);
        }
        setTimeout(() => {
          setUploadStatus("Upload complete!");
          setSelectedFile(null); // Clear the selected file
          mutate("/api/images"); // Trigger revalidation of the image list data
          onUpload();
        }, 3000); // 3-second delay
      }
    } catch (error) {
      setError(error);
    }
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    setSelectedFile(file);
  }

  return (
    <>
      <PopupHeadline>Image Upload</PopupHeadline>
      <Form onSubmit={submitImage}>
        <input type="file" name="file" required onChange={handleFileChange} />
        {selectedFile && (
          <Preview>
            <Image
              src={URL.createObjectURL(selectedFile)}
              layout="responsive"
              height={300}
              width={300}
              alt={"Preview of uploaded image"}
            />
          </Preview>
        )}
        <StyledButton type="submit">Upload</StyledButton>
        <p>{uploadStatus}</p>
        {error && <p>{error.message}</p>}
        {showMapMessage && (
          <p>Please upload an image with available GPS data.</p>
        )}
      </Form>
    </>
  );
}

export default ImageUploadForm;
