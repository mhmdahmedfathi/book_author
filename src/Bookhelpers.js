import AxiosConfiged from "./axiosConfig";

class BookHelpers {
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

    async GetBooks() {
        try {
            const res = await AxiosConfiged.get("/book/")
            if(res.status === 200){
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

    async GetBook(id) {
        try {
            const res = await AxiosConfiged.get(`/book/${id}`)
            if(res.status === 200){
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

    async UpdateBook(id, book) {
        try {
            const res = await AxiosConfiged.put(`/book/${id}`, book,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if(res.status === 200){
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

    async DeleteBook(id) {
        try {
            const res = await AxiosConfiged.delete(`/book/${id}`)
            if(res.status === 200){
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

    async Dashboard() {
        try {
            const res = await AxiosConfiged.get("/book/dashboard")
            if(res.status === 200){
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

    async AddPage(id, page) {
        try {
            const res = await AxiosConfiged.post(`/page/${id}/addpage`, page)
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

    async GetPage(book,id) {
        try {
            const res = await AxiosConfiged.get(`/page/${book}/${id-1}/`)
            if(res.status === 200){
                let response = {
                    status: res.status,
                    data: res.data
                }
                return response;
            }
            return false;
        } catch (error) {
            let error_msg = JSON.parse(error.request.response);
            console.log(error_msg);
            return error_msg;
        }
    }

    async UpdatePage(book,id, page) {
        try {
            const res = await AxiosConfiged.put(`/page/${book}/${id-1}/views`, page)
            if(res.status === 200){
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

    async DeletePage(book,id) {
        try {
            const res = await AxiosConfiged.delete(`/page/${book}/${id-1}/views`)
            if(res.status === 200){
                let response = {
                    status: res.status,
                    data: res.data
                }
                return response;
            }
            return false;
        } catch (error) {
            console.log(error);
            let error_msg = JSON.parse(error.request.response);
            return error_msg;
        }
    }

}

export default BookHelpers;
