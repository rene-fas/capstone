import React, { useState, useEffect } from "react";
import OutcropDetailsPage from "../components/OutcropDetailsPage";

const Home = () => {
  const [formState, setFormState] = useState({
    location: "",
    notes: "",
    submittedData: [],
  });

  // Load submitted data from local storage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("submittedData");
    if (storedData) {
      setFormState((prevState) => ({
        ...prevState,
        submittedData: JSON.parse(storedData),
      }));
    }
  }, []);

  const handleFormSubmit = () => {
    const { location, notes } = formState;
    const newData = {
      location,
      notes,
    };

    // Update submitted data and store in local storage
    setFormState((prevState) => ({
      ...prevState,
      submittedData: [...prevState.submittedData, newData],
      location: "",
      notes: "",
    }));
    localStorage.setItem(
      "submittedData",
      JSON.stringify([...formState.submittedData, newData])
    );
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
