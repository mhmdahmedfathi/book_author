import React, { useState } from "react";
import AxiosConfiged from "../axiosConfig";

export const AuthContext = React.createContext();

const AuthProvider = (props) => {
	
    const [user, setUser] = useState();
    const [isAuth, setIsAuth] = useState(false);
    const loginHandler = (user) => {
        setUser(user);
        setIsAuth(true);
    };
    const logoutHandler = () => {
        setUser({});
        setIsAuth(false);
        localStorage.removeItem("token");
    };

    


	return (
		<AuthContext.Provider
            value={{
                logout: logoutHandler,
                login: loginHandler,
                User: user,
                isAuth: isAuth,
            }}
        >
            {props.children}
        </AuthContext.Provider>
	);
};

export default AuthProvider;
