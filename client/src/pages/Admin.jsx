import { toast } from 'react-toastify';
import { redirect, useLoaderData } from 'react-router-dom'
import customFetch from '../utils/customFetch'
import Wrapper from '../assets/wrappers/StatsContainer'
import { StatItem } from '../components';
import { FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa';

export const loader = async () => {
    try {
        const { data } = await customFetch.get('/users/admin/app-stats')
        return data
    } catch (error) {
        toast.error(error?.response?.data?.msg)
        console.log(error);
        return redirect('/dashboard')
    }
}

const Admin = () => {
    const { users, jobs } = useLoaderData()

    return (
        <Wrapper>
            <StatItem count={users} title='current users' icon={<FaSuitcaseRolling />} color='#e9b949' bcg='#fcefc7' />
            <StatItem count={jobs} title='total jobs' icon={<FaCalendarCheck />} color='#647acb' bcg='#e0e8f9' />
        </Wrapper>
    )
}
export default Admin