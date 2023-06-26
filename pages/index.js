// pages/index.js
import React, { useState } from "react";
import OutcropDetailsPage from "../components/OutcropDetailsPage";

const Home = () => {
  const [formState, setFormState] = useState({
    location: "",
    notes: "",
    submittedData: [],
  });

  const handleFormSubmit = () => {
    const { location, notes } = formState;
    const newData = {
      location,
      notes,
    };

    setFormState((prevState) => ({
      ...prevState,
      submittedData: [...prevState.submittedData, newData],
      location: "",
      notes: "",
    }));
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
      />
    </>
  );
};

export default Home;
