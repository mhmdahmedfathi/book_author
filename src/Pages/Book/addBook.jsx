import Addbook from "../../Components/Book/Addbook"
import Dashboard from "../../Components/Dashboard/dashboard"
import Footer from "../../Components/Footer/footer"
import Navbar from "../../Components/navbar/navbar" 

export default function AddbookPage(){
    return(
        <>
            <Navbar/>
            <Addbook/>
            <Footer/>
        </>
    )
}