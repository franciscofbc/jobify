import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom"
import customFetch from "../utils/customFetch"
import { toast } from "react-toastify"
import Wrapper from "../assets/wrappers/DashboardFormPage"
import { FormRow, FormRowSelect } from "../components"
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants"

export const loader = async ({ params }) => {
    try {
        const { data } = await customFetch.get(`/jobs/${params.id}`)
        return data
    } catch (error) {
        toast.error(error?.response?.data?.msg)
        console.log(error);
        return redirect('../all-jobs')
    }
}

export const action = async ({ request, params }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try {
        const response = await customFetch.patch(`/jobs/${params.id}`, data)
        toast.success(response?.data?.msg)
        return redirect('../all-jobs')
    } catch (error) {
        toast.error(error?.response?.data?.msg)
        console.log(error);
        return error
    }
}

const EditJob = () => {
    const { job: { position, company, jobLocation, jobStatus, jobType } } = useLoaderData()
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'

    return (
        <Wrapper>
            <Form method="PATCH" className="form">
                <h4 className="form-title">edit job</h4>
                <div className="form-center">
                    <FormRow type='text' name='position' defaultValue={position} />
                    <FormRow type='text' name='company' defaultValue={company} />
                    <FormRow type='text' name='jobLocation' labelText='job location' defaultValue={jobLocation} />
                    <FormRowSelect name='jobStatus' labelText='job status' list={Object.values(JOB_STATUS)} defaultValue={jobStatus} />
                    <FormRowSelect name='jobType' labelText='job type' list={Object.values(JOB_TYPE)} defaultValue={jobType} />
                    <button type="submit" className="btn btn-block form-btn"
                        disabled={isSubmitting}>
                        {isSubmitting ? 'submitting...' : 'submit'}
                    </button>
                </div>
            </Form>
        </Wrapper>
    )
}

export default EditJob