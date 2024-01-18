import { useLoaderData } from 'react-router-dom';
import { SearchContainer, JobsContainer } from '../components'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify';
import { createContext, useContext } from 'react';

export const loader = async ({ request }) => {
    const params = Object.fromEntries([...new URL(request.url).searchParams.entries()])

    try {
        const { data } = await customFetch.get('/jobs', { params })
        return { data }
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.msg)
        return error
    }
}

const AllJobsContext = createContext()

const AllJobs = () => {
    const { data } = useLoaderData()

    return (
        <AllJobsContext.Provider value={{ data }}>
            <SearchContainer />
            <JobsContainer />
        </AllJobsContext.Provider>
    )
}

export const useAllJobsContext = () => useContext(AllJobsContext)

export default AllJobs