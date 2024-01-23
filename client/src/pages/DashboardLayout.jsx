import {
  Outlet,
  redirect,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSideBar, Loading, Navbar, SmallSideBar } from "../components";
import { createContext, useContext, useState } from "react";
import { checkDefaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const DashboardContext = createContext();

const userQuery = {
  queryKey: ['user'],
  queryFn: async () => {
    const { data } = await customFetch.get('/users/current-user')
    return data
  }
}

export const loader = (queryClient) => async () => {
  try {
    await queryClient.ensureQueryData(userQuery)
    return null;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
    return redirect("/");
  }
};

const DashboardLayout = ({ queryClient }) => {
  const navigate = useNavigate();
  const { data: { user } } = useQuery(userQuery)
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  const [showSideBar, setShowSideBar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  const logoutUser = async () => {
    navigate("/");
    const response = await customFetch.get("auth/logout");
    queryClient.invalidateQueries()
    toast.success(response?.data?.msg);
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSideBar,
        isDarkTheme,
        toggleSideBar,
        toggleDarkTheme,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSideBar />
          <BigSideBar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
