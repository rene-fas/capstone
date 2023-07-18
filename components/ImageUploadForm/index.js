import React, { useState } from "react";
import styled from "styled-components";
import useSWR, { mutate } from "swr";
import "leaflet/dist/leaflet.css";
import ExifReader from "exifreader";

function ImageUploadForm({ onUpload }) {
  const { mutate } = useSWR("/api/images/");
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState(undefined);
  const [showMapMessage, setShowMapMessage] = useState(false);

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
              ? getDegreesFromExifRational(exifData["GPSLatitude"].value)
              : null;
            console.log("Latitude:", latitude);
            const longitude = exifData["GPSLongitude"]
              ? getDegreesFromExifRational(exifData["GPSLongitude"].value)
              : null;
            console.log("Longitude:", longitude);
            if (latitude !== null && longitude !== null) {
              // Save latitude and longitude in localStorage
              const fieldTrips = JSON.parse(localStorage.getItem("fieldTrips"));
              console.log("FieldTrips:", fieldTrips);
              if (fieldTrips) {
                const fieldTripIndex = fieldTrips.findIndex(
                  (trip) => trip.id === parseInt(currentFieldTripId, 10)
                );
                console.log("FieldTripIndex:", fieldTripIndex);
                if (fieldTripIndex !== -1) {
                  const outcropIndex = fieldTrips[
                    fieldTripIndex
                  ].outcrops.findIndex(
                    (o) => o.id === parseInt(currentOutcropId, 10)
                  );
                  console.log("OutcropIndex:", outcropIndex);
                  if (outcropIndex !== -1) {
                    // Update the latitude and longitude of the corresponding outcrop
                    fieldTrips[fieldTripIndex].outcrops[outcropIndex].latitude =
                      latitude;
                    fieldTrips[fieldTripIndex].outcrops[
                      outcropIndex
                    ].longitude = longitude;
                  }
                }
                console.log("FieldTrips:", fieldTrips);
                localStorage.setItem("fieldTrips", JSON.stringify(fieldTrips));
              }
            } else {
              // Show the map message when latitude or longitude is null
              setShowMapMessage(true);
            }

            console.log("EXIF Data:", exifData);
          };
          reader.readAsArrayBuffer(file);
        }

        setTimeout(() => {
          setUploadStatus("Upload complete!");
          mutate("/api/images"); // Trigger revalidation of the image list data
          onUpload();
        }, 3000); // 3 second delay
      }
    } catch (error) {
      setError(error);
    }
  }

  function getDegreesFromExifRational(rational) {
    if (!rational || rational.length < 1) {
      return null; // Return null if GPS data is missing or incomplete
    }

    // Check if the coordinate is an array of arrays in the format [[numerator, denominator], ...]
    if (
      Array.isArray(rational) &&
      rational.length >= 1 &&
      Array.isArray(rational[0]) &&
      rational[0].length === 2
    ) {
      const degrees = rational[0][0];
      const minutes = rational[1][0];
      const seconds = rational[2][0];

      // Convert degrees, minutes, and seconds to decimal degrees
      const decimalDegrees = degrees + minutes / 60 + seconds / 3600;

      return decimalDegrees;
    }

    return null; // Return null if the coordinate format is not as expected
  }

  return (
    <>
      <h2>Image Upload</h2>
      <Form onSubmit={submitImage}>
        <input type="file" name="file" required />
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

const Form = styled.form`
  margin: 2rem auto;
`;

const StyledButton = styled.button`
  background-color: green;
  margin-top: 0.5rem;
  border-radius: 0.5rem;
  padding: 0.25rem 1rem;
  color: white;
`;

export default ImageUploadForm;
