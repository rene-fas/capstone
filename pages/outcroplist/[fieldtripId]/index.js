import OutcropListPage from "../../../components/OutcropListPage";
import { useRouter } from "next/router";

const OutcropList = () => {
  const router = useRouter();
  const { fieldtripId } = router.query;

  return <OutcropListPage fieldtripId={fieldtripId} />;
};

export default OutcropList;
