import React from "react";

const OutcropDetailsPage = ({
  formState,
  onFormSubmit,
  onInputChange,
  submittedData,
}) => {
  const { location, notes } = formState || {};

  return (
    <>
      <header>
        <h1>Aufschluss 1 Titel</h1>
      </header>
      <section>
        <form onSubmit={onFormSubmit}>
          <div>
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={location || ""}
              onChange={onInputChange}
            />
          </div>

          <div>
            <label htmlFor="notes">Notes:</label>
            <textarea
              id="notes"
              name="notes"
              value={notes || ""}
              onChange={onInputChange}
            />
          </div>

          <button type="submit">Submit</button>
        </form>

        {submittedData && submittedData.length > 0 && (
          <div>
            <h2>Submitted Data:</h2>
            <ul>
              {submittedData.map((data, index) => (
                <li key={index}>
                  <p>
                    <strong>Location:</strong> {data.location}
                  </p>
                  <p>
                    <strong>Notes:</strong> {data.notes}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
};

export default OutcropDetailsPage;
