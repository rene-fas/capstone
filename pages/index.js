import React from "react";
import { useRouter } from "next/router";
import FieldTripListPage from "../components/FieldTripListPage";
import OutcropListPage from "../components/OutcropListPage";
import OutcropDetailsPage from "../components/OutcropDetailsPage";

const Home = () => {
  const router = useRouter();
  const { fieldTripId, outcropId } = router.query;

  return <FieldTripListPage />;
};
export default Home;
