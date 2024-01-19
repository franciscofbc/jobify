import { useAllJobsContext } from "../pages/AllJobs";

const PageBtnContainer = () => {
  const {
    data: { totalPages, currentPage },
  } = useAllJobsContext();

  return <div>PageBtnContainer</div>;
};
export default PageBtnContainer;
