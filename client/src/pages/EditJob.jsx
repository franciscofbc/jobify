import { Form, redirect, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { useQuery } from "@tanstack/react-query";

const singleJobQuery = (id) => {
  return {
    queryKey: ["job", id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/jobs/${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(singleJobQuery(params.id));
      return params.id;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      console.log(error);
      return redirect("../all-jobs");
    }
  };

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      const response = await customFetch.patch(`/jobs/${params.id}`, data);
      queryClient.invalidateQueries(["jobs"]);
      toast.success(response?.data?.msg);
      return redirect("../all-jobs");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      console.log(error);
      return error;
    }
  };

const EditJob = () => {
  const id = useLoaderData();
  const {
    data: {
      job: { position, company, jobLocation, jobStatus, jobType },
    },
  } = useQuery(singleJobQuery(id));

  return (
    <Wrapper>
      <Form method="PATCH" className="form">
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={position} />
          <FormRow type="text" name="company" defaultValue={company} />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="job location"
            defaultValue={jobLocation}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            list={Object.values(JOB_STATUS)}
            defaultValue={jobStatus}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            list={Object.values(JOB_TYPE)}
            defaultValue={jobType}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;
