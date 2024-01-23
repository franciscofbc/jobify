import { Form, redirect, useNavigation, useOutletContext } from "react-router-dom"
import Wrapper from "../assets/wrappers/DashboardFormPage"
import { FormRow } from "../components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = (queryClient) => async ({ request }) => {
    const formData = await request.formData()
    const file = formData.get('avatar')
    if (file && file.size > 500000) {
        toast.error('image size too large')
        return null
    }
    try {
        const response = await customFetch.patch('/users/update-user', formData)
        queryClient.invalidateQueries(['user'])
        toast.success(response?.data?.msg)
        return redirect('/dashboard')
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.msg)
        return null
    }
}

const Profile = () => {
    const { user: { name, lastName, email, location } } = useOutletContext()
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'

    return (
        <Wrapper>
            <Form method="PATCH" className="form" encType="multipart/form-data">
                <h4 className="form-title">profile</h4>
                <div className="form-center">
                    <div className="form-row">
                        <label htmlFor="avatar" className="form-label">
                            select an image file (max 0.5 MB)
                        </label>
                        <input type="file" id="avatar" name="avatar" className="form-input" accept="image/*" />
                    </div>
                    <FormRow type='text' name='name' defaultValue={name} />
                    <FormRow type='text' name='lastName' labelText='last name' defaultValue={lastName} />
                    <FormRow type='email' name='email' defaultValue={email} />
                    <FormRow type='text' name='location' defaultValue={location} />
                    <button type="submit" className="btn btn-block form-btn" disabled={isSubmitting}>
                        {isSubmitting ? "submitting..." : "submit"}
                    </button>
                </div>
            </Form>


        </Wrapper>
    )
}
export default Profile