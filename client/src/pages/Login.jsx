import { Form, Link, redirect, useNavigation } from "react-router-dom"
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { FormRow, Logo } from '../components'
import { toast } from "react-toastify"
import customFetch from "../utils/customFetch"

export const action = async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try {
        const response = await customFetch.post('/auth/login', data)
        toast.success(response?.data?.msg)
        return redirect('/dashboard')
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.msg)
        return error
    }
}

const Login = () => {
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'

    return (
        <Wrapper>
            <Form method="POST" className="form">
                <Logo />
                <h4>login</h4>
                <FormRow
                    type='email'
                    name='email'
                    defaultValue='fbc@live.com' />
                <FormRow
                    type='password'
                    name='password'
                    defaultValue='secret123' />
                <button type="submit"
                    className="btn btn-block" disabled={isSubmitting}>
                    {isSubmitting ? 'submitting...' : 'submit'}
                </button>
                <button type="button"
                    className="btn btn-block">
                    explore the app
                </button>
                <p>
                    not a member yet?
                    <Link to='/register' className="member-btn">
                        register
                    </Link>
                </p>
            </Form >
        </Wrapper >
    )
}
export default Login