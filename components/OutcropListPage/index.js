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

const OutcropListPage = () => {
  const [outcropsData, setOutcropsData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newOutcropTitle, setNewOutcropTitle] = useState("");

  useEffect(() => {
    const storedOutcrops = localStorage.getItem("outcrops");
    if (storedOutcrops) {
      setOutcropsData(JSON.parse(storedOutcrops));
    }
  }, []);

  const handleAddOutcrop = () => {
    if (newOutcropTitle.trim() !== "") {
      const newOutcrop = {
        id: outcropsData.length + 1,
        title: newOutcropTitle,
      };
      const updatedOutcrops = [...outcropsData, newOutcrop];
      setOutcropsData(updatedOutcrops);
      localStorage.setItem("outcrops", JSON.stringify(updatedOutcrops));
      setShowPopup(false);
      setNewOutcropTitle("");
    }
  };

  const handleTitleChange = (e) => {
    setNewOutcropTitle(e.target.value);
  };

  const handleCancelAddOutcrop = () => {
    setShowPopup(false);
    setNewOutcropTitle("");
  };

  const outcrops = outcropsData || [];

  const router = useRouter();
  const { query } = router;
  const { fieldtripId, fieldtripTitle } = query;

  const handleBack = () => {
    router.back();
  };

  return (
    <Container>
      <Header>
        <Headline>{fieldtripTitle} Field Trip</Headline>
      </Header>
      <List>
        {outcrops.map((outcrop) => (
          <ListItem key={outcrop.id}>
            <Link
              href={{
                pathname: "/outcroplist/[fieldtripId]/outcrop/[outcropId]",
                query: {
                  outcropId: outcrop.id,
                  title: outcrop.title,
                  fieldtripId: fieldtripId,
                },
              }}
              as={`/outcroplist/${fieldtripId}/outcrop/${outcrop.id}`}
            >
              <Button>{outcrop.title}</Button>
            </Link>
          </ListItem>
        ))}
      </List>
      <Button onClick={() => setShowPopup(true)}>Add Outcrop</Button>
      <Button onClick={handleBack}>Go Back</Button>

      {showPopup && (
        <Dialog open>
          <h2>Add Outcrop</h2>
          <input
            type="text"
            value={newOutcropTitle}
            onChange={handleTitleChange}
            placeholder="Outcrop Title"
          />
          <Button onClick={handleCancelAddOutcrop}>Cancel</Button>
          <Button onClick={handleAddOutcrop}>Add</Button>
        </Dialog>
      )}
    </Container>
  );
};

export default OutcropListPage;
