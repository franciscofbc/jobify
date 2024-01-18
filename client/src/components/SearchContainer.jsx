import Wrapper from "../assets/wrappers/DashboardFormPage"
import { Form, Link } from "react-router-dom"
import { FormRow, FormRowSelect, SubmitBtn } from "./"
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from "../../../utils/constants"

const SearchContainer = () => {
    return (
        <Wrapper>
            <Form className="form">
                <h5 className="form-title">search form</h5>
                <div className="form-center">
                    <FormRow type='search' name='search' />
                    <FormRowSelect name='jobStatus' labelText='job status' list={['all', ...Object.values(JOB_STATUS)]} defaultValue='all' />
                    <FormRowSelect name='jobType' labelText='job type' list={['all', ...Object.values(JOB_TYPE)]} defaultValue='all' />
                    <FormRowSelect name='sort' labelText='sort' list={Object.values(JOB_SORT_BY)} defaultValue='newest' />
                    <Link to='/dashboard/all-jobs' className="btn form-btn delete-btn">clear</Link>
                    <SubmitBtn formBtn />
                </div>
            </Form>
        </Wrapper>
    )
}
export default SearchContainer 