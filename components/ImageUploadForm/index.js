import React, { useState } from "react";
import styled from "styled-components";
import useSWR, { mutate } from "swr";

function ImageUploadForm({ onUpload }) {
  const { mutate } = useSWR("/api/images/");
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState(undefined);

  async function submitImage(event) {
    event.preventDefault();
    setUploadStatus("Uploading...");
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

  return (
    <>
      <h2>Image Upload</h2>
      <Form onSubmit={submitImage}>
        <input type="file" name="file" />
        <StyledButton type="submit">Upload</StyledButton>
        <p>{uploadStatus}</p>
        {error && <p>{error.message}</p>}
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
