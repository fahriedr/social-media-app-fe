
import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Topbar from "@/components/shared/Topbar";
import { INITIAL_USER, useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { Outlet, useNavigate } from "react-router-dom";

const RootLayout = () => {

  const navigate = useNavigate();

  const { setIsAuthenticated, setUser } = useUserContext();

  const { mutateAsync: signOutAccount} = useSignOutAccount();


  const handleLogout = async () => {
    await signOutAccount()

    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in")
  }

  return (
    <div className="w-full md:flex">
      <Topbar/>
      <LeftSidebar/>

      <section className="flex flex-1 h-full">
        <Outlet/>
      </section>

      <Bottombar/>
    </div>
  )
}

export default RootLayout