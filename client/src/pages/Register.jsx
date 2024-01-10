import { Form, Link, redirect } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    return redirect("/login");
  } catch (error) {
    console.log(error);
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form method="POST" className="form">
        <Logo />
        <h4>register</h4>
        <FormRow type="text" name="name" defaultValue="francisco" />
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
          defaultValue="da cruz"
        />
        <FormRow type="text" name="location" defaultValue="ijui" />
        <FormRow type="email" name="email" defaultValue="fbc@live.com" />
        <FormRow type="password" name="password" defaultValue="secret123" />
        <button type="submit" className="btn btn-block">
          submit
        </button>
        <p>
          already a member?
          <Link to="/login" className="member-btn">
            login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;
