import { useRouter } from "next/router";
import OutcropDetailsPage from "../../../../components/OutcropDetailsPage";

const OutcropPage = () => {
  const router = useRouter();
  const { outcropId } = router.query;

  return <OutcropDetailsPage outcropId={outcropId} />;
};

export default OutcropPage;
