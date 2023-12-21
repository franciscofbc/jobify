import { Link } from "react-router-dom"
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { FormRow, Logo } from '../components'

const Register = () => {
    return (
        <Wrapper>
            <form className="form">
                <Logo />
                <h4>register</h4>
                <FormRow
                    type='text'
                    name='name'
                    defaultValue='francisco' />
                <FormRow
                    type='text'
                    name='lastName'
                    labelText='last name'
                    defaultValue='da cruz' />
                <FormRow
                    type='text'
                    name='location'
                    defaultValue='ijui' />
                <FormRow
                    type='email'
                    name='email'
                    defaultValue='fbc@live.com' />
                <FormRow
                    type='password'
                    name='password'
                    defaultValue='secret' />
                <button type="submit"
                    className="btn btn-block">
                    submit
                </button>
                <p>
                    already a member?
                    <Link to='/login' className="member-btn">
                        login
                    </Link>
                </p>
            </form >
        </Wrapper >
    )
}
export default Register