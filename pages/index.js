import React from "react";
import { useRouter } from "next/router";
import FieldTripListPage from "../components/FieldTripListPage";
import OutcropListPage from "../components/OutcropListPage";
import OutcropDetailsPage from "../components/OutcropDetailsPage";

const Home = () => {
  const router = useRouter();
  const { fieldTripId, outcropId } = router.query;

  switch (true) {
    case fieldTripId && outcropId:
      return (
        <OutcropDetailsPage fieldTripId={fieldTripId} outcropId={outcropId} />
      );
    case fieldTripId:
      return <OutcropListPage fieldTripId={fieldTripId} />;
    default:
      return <FieldTripListPage />;
  }
};

export default Home;
