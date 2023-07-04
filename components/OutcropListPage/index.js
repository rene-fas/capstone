import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Container,
  Headline,
  Header,
  List,
  ListItem,
  Button,
  Dialog,
} from "../component.styled";

const OutcropListPage = ({ fieldtripId }) => {
  const router = useRouter();
  const [parsedFieldtrip, setParsedFieldtrip] = useState(null);
  const [currentFieldTripId, setCurrentFieldTripId] = useState(null);

  useEffect(() => {
    try {
      const fieldTrips = JSON.parse(localStorage.getItem("fieldTrips"));

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

  const [showPopup, setShowPopup] = useState(false);
  const [newOutcropTitle, setNewOutcropTitle] = useState("");

  const handleBack = () => {
    router.back();
  };

  const handleAddOutcrop = () => {
    if (newOutcropTitle.trim() !== "") {
      try {
        const fieldTrips = JSON.parse(localStorage.getItem("fieldTrips"));

        const currentFieldTrip = fieldTrips.find(
          (fieldtrip) => fieldtrip.id === currentFieldTripId
        );

        const newOutcrop = {
          id: currentFieldTrip.outcrops.length + 1,
          name: newOutcropTitle,
          details: [],
        };

        currentFieldTrip.outcrops.push(newOutcrop);
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
    setNewOutcropTitle("");
    setShowPopup(false);
  };

  if (!parsedFieldtrip) {
    return <div>Loading...</div>;
  }
  const handleOutcropLinkClick = (outcropId) => {
    localStorage.setItem("currentOutcropId", outcropId);
  };

  return (
    <Container>
      <Header>
        <Headline>
          {parsedFieldtrip.fieldtripname} {parsedFieldtrip.fieldtripdate}
        </Headline>
      </Header>
      <List>
        {parsedFieldtrip.outcrops.map((outcrop) => (
          <ListItem key={outcrop.id}>
            <Link
              href={`/outcroplist/${fieldtripId}/outcrop/${outcrop.id}`}
              passHref
            >
              <Button onClick={() => handleOutcropLinkClick(outcrop.id)}>
                {outcrop.name}
              </Button>
            </Link>
          </ListItem>
        ))}
      </List>
      <Button onClick={() => setShowPopup(true)}>Add Outcrop</Button>

      {showPopup && (
        <Dialog>
          <h2>Add Outcrop</h2>
          <input
            type="text"
            value={newOutcropTitle}
            onChange={(e) => setNewOutcropTitle(e.target.value)}
            placeholder="Outcrop Title"
          />
          <Button onClick={handleCancelAddOutcrop}>Cancel</Button>
          <Button onClick={handleAddOutcrop}>Add</Button>
        </Dialog>
      )}

      <Button onClick={handleBack}>Go Back</Button>
    </Container>
  );
};

export default OutcropListPage;
