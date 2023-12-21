import { Outlet } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Dashboard'
import { BigSideBar, Navbar, SmallSideBar } from '../components'
import { createContext, useContext, useState } from 'react'
import { checkDefaultTheme } from '../App'

const DashboardContext = createContext()

const DashboardLayout = () => {
    //temp
    const user = { name: 'fbc' }

    const [showSideBar, setShowSideBar] = useState(false)
    const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme())

    const toggleSideBar = () => {
        setShowSideBar(!showSideBar)
    }

    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme
        setIsDarkTheme(newDarkTheme)
        document.body.classList.toggle('dark-theme', newDarkTheme)
        localStorage.setItem('darkTheme', newDarkTheme)
    }

    const logoutUser = async () => {
        console.log('logoutUser');
    }

    return (
        <DashboardContext.Provider value={{ user, showSideBar, isDarkTheme, toggleSideBar, toggleDarkTheme, logoutUser }}>
            <Wrapper>
                <main className="dashboard">
                    <SmallSideBar />
                    <BigSideBar />
                    <div>
                        <Navbar />
                        <div className='dashboard-page'>
                            <Outlet />
                        </div>
                    </div>
                </main>
            </Wrapper>
        </DashboardContext.Provider>
    )
}

export const useDashboardContext = () => useContext(DashboardContext)

export default DashboardLayout