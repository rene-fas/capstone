import { useRouter } from "next/router";
import OutcropDetailsPage from "../../components/OutcropDetailsPage";

const OutcropPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <OutcropDetailsPage outcropId={id} />;
};

export default OutcropPage;
