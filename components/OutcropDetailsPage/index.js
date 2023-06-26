import React from "react";

const OutcropDetailsPage = ({ formState, onFormSubmit, onInputChange }) => {
  const { location, notes, submittedData } = formState;

  return (
    <div>
      <h1>Outcrop Details</h1>

      <form onSubmit={onFormSubmit}>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={onInputChange}
          />
        </div>

        <div>
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            name="notes"
            value={notes}
            onChange={onInputChange}
          />
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
  );
};

export default OutcropDetailsPage;
