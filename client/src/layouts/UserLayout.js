import Header from "../components/Header";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../components/Context";

function UserLayout() {

    const {state} = useContext(AppContext)

    if (state.user._id) {

        return ( 
            <>
                <Header/>
                <Outlet />
            </>
         );
    } else {
        return <Navigate to='/'/>
    }
}

export default UserLayout;