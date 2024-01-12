import { useLoaderData } from "react-router-dom"
import customFetch from "../utils/customFetch"
import { toast } from "react-toastify"
import Wrapper from "../assets/wrappers/DashboardFormPage"

export const loader = async ({ params }) => {
    try {
        const { data } = await customFetch.get(`/jobs/${params.id}`)
        return data
    } catch (error) {
        toast.error(error?.response?.data?.msg)
        console.log(error);
        return error
    }
}

export const action = async ({ request }) => {
    return 'action edit job'
}

const EditJob = () => {
    const { job } = useLoaderData()
    console.log(job);

    return (
        <div>EditJob</div>
    )
}

export default EditJob