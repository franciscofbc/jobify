import { redirect } from "react-router-dom";
import { toast } from "react-toastify"
import customFetch from "../utils/customFetch";

export const action = async ({ params }) => {
    try {
        const response = await customFetch.delete(`/jobs/${params.id}`)
        toast.success(response?.data?.msg)
        return redirect('../all-jobs')
    } catch (error) {
        toast.error(error?.response?.data?.msg)
        console.log(error);
        return error
    }
}

const DeleteJob = () => {
    return (
        <div>DeleteJob</div>
    )
}
export default DeleteJob
