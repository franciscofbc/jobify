import { useAllJobsContext } from "../pages/AllJobs";
import Wrapper from "../assets/wrappers/JobsContainer";
import Job from "./Job";
import PageBtnContainer from "./PageBtnContainer";
import PageBtnContainerComplex from "./PageBtnContainerComplex";

const JobsContainer = () => {
  const {
    data: { jobs, totalJobs, totalPages },
  } = useAllJobsContext();

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>no jobs to display</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {totalPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default JobsContainer;
