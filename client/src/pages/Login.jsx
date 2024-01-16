import { Form, Link, redirect, useNavigate } from "react-router-dom"
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { FormRow, Logo, SubmitBtn } from '../components'
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
    const navigate = useNavigate()

    const loginTestUser = async () => {
        const data = {
            email: 'test@test.com',
            password: 'secret123'
        }

        try {
            const response = await customFetch.post('/auth/login', data)
            toast.success(response?.data?.msg)
            navigate('/dashboard')
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.msg)
        }
    }

    return (
        <Wrapper>
            <Form method="POST" className="form">
                <Logo />
                <h4>login</h4>
                <FormRow
                    type='email'
                    name='email'
                />
                <FormRow
                    type='password'
                    name='password'
                />
                <SubmitBtn />
                <button type="button"
                    className="btn btn-block"
                    onClick={loginTestUser}>
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