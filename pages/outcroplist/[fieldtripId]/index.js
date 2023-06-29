import OutcropListPage from "../../../components/OutcropListPage";
import { useRouter } from "next/router";

const OutcropList = () => {
  const router = useRouter();
  const { fieldtripID } = router.query;

  return <OutcropListPage fieldtripId={fieldtripID} />;
};

export default OutcropList;
