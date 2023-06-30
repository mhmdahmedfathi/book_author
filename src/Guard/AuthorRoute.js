import { useState } from "react";
import { useEffect } from "react";
import { Navigate,Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../StateManagment/AuthContext";
import Helpers from "../helpers";
import Spinner from "../Components/Loading/spinner";

const AuthorRoute = ({ children}) => {
    const { isAuth, User,login } = useContext(AuthContext);
    const [loading , setLoading] = useState(true);
    const helpers = new Helpers();
    useEffect(() => {
        if (localStorage.getItem("token") && !isAuth) {
            const getData = async () => {
                const res = await helpers.Me();
                if(res === false) {
                    setLoading(false);
                }
                login(res);
                setLoading(false);
            };
            getData();
        } else {
            setLoading(false);
        }
    }, [isAuth]);

   

    return (
        <> 
            {
                loading ? <Spinner/> : null
            }
            {!loading ? isAuth && User.role === "author" ? (
                <Outlet />
                ) : (
                <Navigate to={{ pathname: "/"}} />
                )
             : null}

        </>
    );
};

export default AuthorRoute;