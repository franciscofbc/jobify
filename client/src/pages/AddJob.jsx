import { useNavigation, useOutletContext, Form, redirect } from "react-router-dom"
import Wrapper from "../assets/wrappers/DashboardFormPage"
import { FormRow, FormRowSelect } from "../components"
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants"
import customFetch from "../utils/customFetch"
import { toast } from "react-toastify"

export const action = async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try {
        const response = await customFetch.post('/jobs', data)
        toast.success('job created');
        return redirect('all-jobs')
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.msg)
        return error
    }
}

const AddJob = () => {
    const { user } = useOutletContext()
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'

    return (
        <Wrapper>
            <Form method="POST" className="form">
                <h4 className="form-title">add job</h4>
                <div className="form-center">
                    <FormRow type='text' name='position' />
                    <FormRow type='text' name='company' />
                    <FormRow type='text' name='jobLocation' labelText='job location'
                        defaultValue={user.location} />
                    <FormRowSelect name='jobStatus' labelText='job status' list={Object.values(JOB_STATUS)} defaultValue={JOB_STATUS.PENDING} />
                    <FormRowSelect name='jobType' labelText='job type' list={Object.values(JOB_TYPE)} defaultValue={JOB_TYPE.FULL_TIME} />
                    <button type="submit" className="btn btn-block form-btn"
                        disabled={isSubmitting}>
                        {isSubmitting ? 'submitting...' : 'submit'}
                    </button>
                </div>
            </Form>
        </Wrapper>
    )
}
export default AddJob