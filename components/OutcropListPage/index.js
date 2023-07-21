import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import {
  Container,
  Headline,
  Header,
  List,
  ListItem,
  Button,
  Dialog,
  ButtonGroup,
  LinkButton,
  RemoveButton,
  CustomLink,
  EditButton,
  StyledInput,
  PopupHeadline,
  StyledBack,
  StyledBackButton,
  HeaderContainer,
  StyledSubHeaderDate,
} from "../component.styled";

// Import Leaflet and react-leaflet components dynamically
const OutcropListMap = dynamic(() => import("../LeafletMap"), {
  ssr: false, // Disable server-side rendering
});
const OutcropListPage = ({ fieldtripId }) => {
  const router = useRouter();
  const [parsedFieldtrip, setParsedFieldtrip] = useState(null);
  const [currentFieldTripId, setCurrentFieldTripId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [newOutcropTitle, setNewOutcropTitle] = useState("");
  const [editingOutcropId, setEditingOutcropId] = useState(null);
  const [editedOutcropTitle, setEditedOutcropTitle] = useState("");

  useEffect(() => {
    try {
      const fieldTrips = JSON.parse(localStorage.getItem("fieldTrips")); // set fieldTrips from local storage

      const storedCurrentFieldTripId = JSON.parse(
        localStorage.getItem("currentFieldTripId")
      );

      const currentFieldTrip = fieldTrips.find(
        (fieldtrip) => fieldtrip.id === storedCurrentFieldTripId
      );

      setParsedFieldtrip(currentFieldTrip);
      setCurrentFieldTripId(storedCurrentFieldTripId);
    } catch (error) {
      console.error("Error accessing field trips from local storage:", error);
    }
  }, []);

  const handleBack = () => {
    // Go back to previous page
    router.back();
  };
  const handleAddOutcrop = () => {
    // Add new outcrop to current field trip
    if (newOutcropTitle.trim() !== "") {
      // Check if new outcrop title is not empty
      try {
        const fieldTrips = JSON.parse(localStorage.getItem("fieldTrips"));
        const currentFieldTrip = fieldTrips.find(
          // Find current field trip
          (fieldtrip) => fieldtrip.id === currentFieldTripId
        );
        let newOutcrop; // Declare newOutcrop variable
        if (currentFieldTrip.outcrops.length > 0) {
          // Check if current outcrops array is not empty if it is not do a calculation for the id
          newOutcrop = {
            // Create new outcrop with following properties
            id:
              currentFieldTrip.outcrops[currentFieldTrip.outcrops.length - 1]
                .id + 1,
            name: newOutcropTitle,
            details: [],
          };
        } else {
          // If current outcrop is empty just use id 1
          newOutcrop = { id: 1, name: newOutcropTitle, details: [] };
        }
        const updatedOutcrops = [...currentFieldTrip.outcrops, newOutcrop]; // Add new outcrop to current field trip using spread syntax
        currentFieldTrip.outcrops = updatedOutcrops; // Update the outcrops array in the current field trip

        localStorage.setItem("fieldTrips", JSON.stringify(fieldTrips));

        setParsedFieldtrip((prevFieldtrip) => ({
          ...prevFieldtrip,
          outcrops: [...prevFieldtrip.outcrops, newOutcrop],
        }));
        setNewOutcropTitle("");
        setShowPopup(false);
      } catch (error) {
        console.error("Error adding new outcrop:", error);
      }
    }
  };

  const handleCancelAddOutcrop = () => {
    //close popup on clicking cancel button
    setNewOutcropTitle("");
    setEditingOutcropId(null); // Reset the editingOutcropId back to null
    setShowPopup(false);
  };

  const handleDeleteOutcrop = (outcropId, event) => {
    event.preventDefault(); // Prevent the default link behavior

    try {
      const storedFieldTrips = JSON.parse(localStorage.getItem("fieldTrips"));

      const updatedFieldTrips = storedFieldTrips.map((fieldTrip) => {
        // Update field trip with outcrop removed
        if (fieldTrip.id === parseInt(currentFieldTripId)) {
          const updatedOutcrops = fieldTrip.outcrops.filter(
            (outcrop) => outcrop.id !== parseInt(outcropId)
          );

          return {
            ...fieldTrip,
            outcrops: updatedOutcrops,
          };
        }
        return fieldTrip;
      });

      localStorage.setItem("fieldTrips", JSON.stringify(updatedFieldTrips));

      // Update the local state if the current field trip is affected
      if (parseInt(currentFieldTripId) === parseInt(fieldtripId)) {
        const updatedOutcrops = parsedFieldtrip.outcrops.filter(
          (outcrop) => outcrop.id !== parseInt(outcropId)
        );
        setParsedFieldtrip((prevFieldtrip) => ({
          ...prevFieldtrip,
          outcrops: updatedOutcrops,
        }));
      }
    } catch (error) {
      console.error("Error deleting outcrop:", error);
    }
  };

  const handleEditOutcrop = (outcropId) => {
    setEditingOutcropId(outcropId); // Set editing outcrop id
    const outcrop = parsedFieldtrip.outcrops.find(
      // get the fitting outcrop to edit
      (outcrop) => outcrop.id === outcropId
    );
    setEditedOutcropTitle(outcrop.name);
    setShowPopup(true);
  };

  const handleSaveEditedOutcrop = () => {
    if (editedOutcropTitle.trim() !== "") {
      try {
        const storedFieldTrips = JSON.parse(localStorage.getItem("fieldTrips"));

        const updatedFieldTrips = storedFieldTrips.map((fieldTrip) => {
          if (fieldTrip.id === parseInt(currentFieldTripId)) {
            // If current field trip is affected
            const updatedOutcrops = fieldTrip.outcrops.map((outcrop) => {
              //edit in local storage
              if (outcrop.id === editingOutcropId) {
                return {
                  ...outcrop,
                  name: editedOutcropTitle,
                };
              }
              return outcrop;
            });

            return {
              ...fieldTrip, // Update field trip with outcrop edited
              outcrops: updatedOutcrops,
            };
          }
          return fieldTrip;
        });

        localStorage.setItem("fieldTrips", JSON.stringify(updatedFieldTrips));

        // Update the local state if the current field trip is affected
        if (parseInt(currentFieldTripId) === parseInt(fieldtripId)) {
          const updatedOutcrops = parsedFieldtrip.outcrops.map((outcrop) => {
            if (outcrop.id === editingOutcropId) {
              return {
                ...outcrop,
                name: editedOutcropTitle,
              };
            }
            return outcrop;
          });
          setParsedFieldtrip((prevFieldtrip) => ({
            ...prevFieldtrip,
            outcrops: updatedOutcrops,
          }));
        }

        setEditingOutcropId(null); // Reset the editingOutcropId back to null
        setEditedOutcropTitle("");
        setShowPopup(false);
      } catch (error) {
        console.error("Error updating outcrop:", error);
      }
    }
  };

  if (!parsedFieldtrip) {
    return <div>Something went terribly wrong</div>;
  }

  const handleOutcropLinkClick = (outcropId) => {
    localStorage.setItem("currentOutcropId", outcropId); // Set current outcrop id for navigation
  };

  const outcropLatLngs = parsedFieldtrip.outcrops.map((outcrop) => ({
    latitude: outcrop.latitude, // Replace 'latitude' with the actual property name that stores the latitude for each outcrop
    longitude: outcrop.longitude, // Replace 'longitude' with the actual property name that stores the longitude for each outcrop
  }));

  return (
    <Container>
      <StyledBackButton onClick={handleBack}>
        <StyledBack
          src="/back-arrow-svgrepo-com.svg"
          alt="Back button"
          width={30}
          height={30}
        />
      </StyledBackButton>
      <Header>
        <Headline>{parsedFieldtrip.fieldtripname}</Headline>
        <StyledSubHeaderDate>
          {parsedFieldtrip.fieldtripdate}
        </StyledSubHeaderDate>
      </Header>
      <List>
        {parsedFieldtrip.outcrops.map((outcrop) => (
          <ListItem key={outcrop.id}>
            <ButtonGroup>
              <CustomLink
                href={`/outcroplist/${fieldtripId}/outcrop/${outcrop.id}`}
                passHref
              >
                <LinkButton onClick={() => handleOutcropLinkClick(outcrop.id)}>
                  {outcrop.name}
                </LinkButton>
              </CustomLink>
              <RemoveButton onClick={(e) => handleDeleteOutcrop(outcrop.id, e)}>
                -
              </RemoveButton>
              <EditButton onClick={() => handleEditOutcrop(outcrop.id)}>
                Edit
              </EditButton>
            </ButtonGroup>
          </ListItem>
        ))}
      </List>
      <ButtonGroup>
        <Button onClick={() => setShowPopup(true)}>Add Outcrop</Button>
      </ButtonGroup>
      <OutcropListMap outcropLatLngs={outcropLatLngs} />

      {showPopup && (
        <Dialog>
          {editingOutcropId ? (
            <PopupHeadline>Edit Outcrop</PopupHeadline>
          ) : (
            <PopupHeadline>Add Outcrop</PopupHeadline>
          )}
          <StyledInput
            type="text"
            value={editingOutcropId ? editedOutcropTitle : newOutcropTitle}
            onChange={(e) => {
              if (editingOutcropId) {
                setEditedOutcropTitle(e.target.value);
              } else {
                setNewOutcropTitle(e.target.value);
              }
            }}
            placeholder="Outcrop Title"
          />
          <ButtonGroup>
            {" "}
            <Button onClick={handleCancelAddOutcrop}>Cancel</Button>
            {editingOutcropId ? (
              <Button onClick={handleSaveEditedOutcrop}>Save</Button>
            ) : (
              <Button onClick={handleAddOutcrop}>Add</Button>
            )}
          </ButtonGroup>
        </Dialog>
      )}
    </Container>
  );
};

export default OutcropListPage;
