import { Form, Link, redirect } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await customFetch.post("/auth/register", data);
    toast.success(response?.data?.msg);
    return redirect("/login");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg)
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form method="POST" className="form">
        <Logo />
        <h4>register</h4>
        <FormRow type="text" name="name" />
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
        />
        <FormRow type="text" name="location" />
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <SubmitBtn />
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
