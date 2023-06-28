import React from "react";
import { useRouter } from "next/router";
import OutcropListPage from "../components/OutcropListPage";
import OutcropDetailsPage from "../components/OutcropDetailsPage";

const Home = () => {
  const router = useRouter();
  const { outcropId } = router.query;

  return (
    <>
      {outcropId ? (
        <OutcropDetailsPage outcropId={outcropId} />
      ) : (
        <OutcropListPage />
      )}
    </>
  );
};

export default Home;
