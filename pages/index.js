import React from "react";
import useLocalStorageState from "use-local-storage-state";
import OutcropDetailsPage from "../components/OutcropDetailsPage";
import Outcrops from "./outcrops";

const Home = () => {
  const [submittedData, setSubmittedData] = useLocalStorageState(
    "submittedData",
    []
  );

  const [formState, setFormState] = useLocalStorageState("formState", {});

  const outcrops = [
    { title: "Outcrop 1" },
    { title: "Outcrop 2" },
    { title: "Outcrop 3" },
  ];

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newData = {
      gesteinsart: formData.get("gesteinsart"),
      gesteinsklasse: formData.get("gesteinsklasse"),
      schichtung: formData.get("schichtung"),
      faltung: formData.get("faltung"),
      mineralien: formData.get("mineralien"),
      allgemeines: formData.get("allgemeines"),
      interpretation: formData.get("interpretation"),
    };

    setSubmittedData((prevData) => {
      if (Array.isArray(prevData)) {
        return [...prevData, newData];
      } else {
        return [newData];
      }
    });

    setFormState({});
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
      <Outcrops outcrops={outcrops} />
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
