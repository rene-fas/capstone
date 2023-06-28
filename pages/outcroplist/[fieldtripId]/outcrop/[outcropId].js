import OutcropDetailsPage from "../../../../components/OutcropDetailsPage";
import { useRouter } from "next/router";

const OutcropPage = () => {
  const router = useRouter();
  const { fieldtripId, outcropId } = router.query;

  return <OutcropDetailsPage fieldtripId={fieldtripId} outcropId={outcropId} />;
};

export default OutcropPage;
