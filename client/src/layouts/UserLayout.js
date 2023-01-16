import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom"
import { AppContext } from "../components/Context";
import Header from "../components/Header";

function UserLayout() {

    const {state} = useContext(AppContext)

    if (state.user._id) {

        return ( 
            <div>
            <Header />
            <Outlet /> 

        </div>
     );
    } else {
        return <Navigate to='/'/>
    }
}

export default UserLayout;