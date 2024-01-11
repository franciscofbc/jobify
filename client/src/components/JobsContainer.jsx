import { useAllJobsContext } from "../pages/AllJobs"
import Wrapper from "../assets/wrappers/JobsContainer"
import Job from "./Job"

const JobsContainer = () => {
    const { data: { jobs } } = useAllJobsContext()

    if (jobs.length === 0) {
        return <Wrapper>
            <h2>no jobs to display</h2>
        </Wrapper>
    }

    return (
        <Wrapper>
            <div className="jobs">
                {jobs.map(job => {
                    return <Job key={job._id} {...job} />
                })}
            </div>
        </Wrapper>
    )
}
export default JobsContainer