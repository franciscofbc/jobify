import customFetch from '../utils/customFetch'
import { ChartsContainer, StatsContainer } from '../components'
import { useQuery } from '@tanstack/react-query'

const statsQuery = {
    queryKey: ['stats'],
    queryFn: async () => {
        const { data } = await customFetch.get('/jobs/stats')
        return data
    }
}

export const loader = (queryClient) => async () => {
    await queryClient.ensureQueryData(statsQuery)
    return null
}

const Stats = () => {
    const { data: { defaultStats, monthlyApplications } } = useQuery(statsQuery)

    return (
        <>
            <StatsContainer defaultStats={defaultStats} />
            {monthlyApplications?.length > 1 && <ChartsContainer data={monthlyApplications} />}
        </>
    )
}
export default Stats