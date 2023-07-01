import AxiosConfiged from "./axiosConfig";

class Helpers {
    async login(user)  {
        try {
            if (user.role === "author") {
                return await this.login_Author(user);
            }
            const res = await AxiosConfiged.post("/reader/login", user)
            if(res.status === 200){
                localStorage.setItem("token", res.data.token);
                AxiosConfiged.defaults.headers.common["Authorization"] = `bearer ${localStorage.getItem("token")}`;
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
                AxiosConfiged.defaults.headers.common["Authorization"] = `bearer ${localStorage.getItem("token")}`;
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
                AxiosConfiged.defaults.headers.common["Authorization"] = `bearer ${localStorage.getItem("token")}`;
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
                AxiosConfiged.defaults.headers.common["Authorization"] = `bearer ${localStorage.getItem("token")}`;
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
            if(res.status === 200){
                return res.data;
            }
            return false;
        } catch (error) {
            let error_msg = JSON.parse(error.request.response);
            let response = {
                status: error.response.status,
                data: error_msg
            }
            return response;
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
