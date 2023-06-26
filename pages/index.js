import React from "react";
import useLocalStorageState from "use-local-storage-state";
import OutcropDetailsPage from "../components/OutcropDetailsPage";

const Home = () => {
  const [submittedData, setSubmittedData] = useLocalStorageState(
    "submittedData",
    [] // Initialize with an empty array if it doesn't exist
  );

  const [formState, setFormState] = useLocalStorageState("formState", {
    defaultValue: { location: "", notes: "" }, // Set defaultValue object
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newData = {
      location: formData.get("location"),
      notes: formData.get("notes"),
    };
    setSubmittedData((prevData) => {
      if (prevData) {
        return [...prevData, newData];
      } else {
        return [newData];
      }
    });
    setFormState({ location: "", notes: "" });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <OutcropDetailsPage
        formState={formState}
        onFormSubmit={handleFormSubmit}
        onInputChange={handleInputChange}
        submittedData={submittedData}
      />
    </>
  );
};

export default Home;
