import React from "react";
import { useRouter } from "next/router";
import FieldTripListPage from "../components/FieldTripListPage";
import OutcropListPage from "../components/OutcropListPage";
import OutcropDetailsPage from "../components/OutcropDetailsPage";
import "leaflet/dist/leaflet.css";

const Home = () => {
  const router = useRouter();
  const { fieldTripId, outcropId } = router.query;

  return <FieldTripListPage />;
};
export default Home;
