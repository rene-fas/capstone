import React, { useState } from "react";
import OutcropDetailsPage from "./OutcropDetailsPage";

const IndexPage = () => {
  const [submittedData, setSubmittedData] = useState([]);

  const handleFormSubmit = (data) => {
    setSubmittedData([...submittedData, data]);
  };

  return (
    <>
      <OutcropDetailsPage
        onSubmit={handleFormSubmit}
        submittedData={submittedData}
      />
    </>
  );
};

export default IndexPage;
