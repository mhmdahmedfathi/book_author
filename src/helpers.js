import AxiosConfiged from "./axiosConfig";
import { useContext } from "react";
import { AuthContext } from "./StateManagment/AuthContext";

class Helpers {
    async login(user)  {
        try {
            if (user.role === "author") {
                return await this.login_Author(user);
            }
            const res = await AxiosConfiged.post("/reader/login", user)
            if(res.status === 200){
                localStorage.setItem("token", res.data.token);
                return res;
            }
            return false;
        } catch (error) {
            console.log(error.request.response);
            let error_msg = JSON.parse(error.request.response);
            return error_msg;
        }
    }
    async login_Author(user)  {
        try {
            const res = await AxiosConfiged.post("/author/login", user)
            if(res.status === 200){
                localStorage.setItem("token", res.data.token);
                return res;
            }
            return false;
        } catch (error) {
            console.log(error.request.response);
            let error_msg = JSON.parse(error.request.response);
            return error_msg;
        }
    }
    logout(){
        localStorage.removeItem("token");
    }
    async signup (user) {
        try {
            if (user.role === "author") {
                return await this.signup_Author(user);
            }
            const res = await AxiosConfiged.post("/reader/signup", user)
            if(res.status === 201){
                localStorage.setItem("token", res.data.token);
                return res;
            }
            return false;
        } catch (error) {
            console.log(error.request.response);
            let error_msg = JSON.parse(error.request.response);
            return error_msg;
        }
    }
    async signup_Author(user) {
        try {
            const res = await AxiosConfiged.post("/author/signup", user)
            if(res.status === 201){
                localStorage.setItem("token", res.data.token);
                let response = {
                    status: res.status,
                    data: res.data
                }
                return response;
            }
            return false;
        } catch (error) {
            console.log(error.request.response);
            let error_msg = JSON.parse(error.request.response);
            return error_msg;       
        }
    }

    async Me() {
        try {
            const res = await AxiosConfiged.get("/user/me")
            console.log(res);
            if(res.status === 200){
                return res.data;
            }
            return false;
        } catch (error) {
            let error_msg = JSON.parse(error.request.response);
            return error_msg;
        }
    }

    async AddBook(book) {
        try {
            const res = await AxiosConfiged.post("/book/addbook", book,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if(res.status === 201){
                let response = {
                    status: res.status,
                    data: res.data
                }
                return response;
            }
            return false;
        } catch (error) {
            let error_msg = JSON.parse(error.request.response);
            return error_msg;
        }
    }

    
}

export default Helpers;
