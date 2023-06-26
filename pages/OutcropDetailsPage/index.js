import React from "react";

const OutcropDetailsPage = ({ onSubmit, submittedData }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newData = {
      location: formData.get("location"),
      notes: formData.get("notes"),
    };
    onSubmit(newData);
  };

  return (
    <>
      <div>
        <h1>Aufschluss 1</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" />
          </div>

          <div>
            <label htmlFor="notes">Notes:</label>
            <textarea id="notes" />
          </div>

          <button type="submit">Submit</button>
        </form>

        <h2>Submitted Data:</h2>
        <ul>
          {submittedData.map((data, index) => (
            <li key={index}>
              <strong>Location:</strong> {data.location}
              <br />
              <strong>Notes:</strong> {data.notes}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default OutcropDetailsPage;
