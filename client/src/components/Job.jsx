import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Wrapper from "../assets/wrappers/Job";
dayjs.extend(advancedFormat);
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import JobInfo from "./JobInfo";
import { Form, Link } from "react-router-dom";

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  jobStatus,
}) => {
  const date = dayjs(createdAt).format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>
        <footer className="actions">
          {/* .. approach or /dashboard/edit-job */}
          <Link className="btn edit-btn" to={`../edit-job/${_id}`}>
            edit
          </Link>
          <Form method="DELETE" action={`../delete-job/${_id}`}>
            <button type="submit" className="btn delete-btn">
              delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Job;
