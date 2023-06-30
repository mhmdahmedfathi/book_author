import Login from "../../Components/Login/loginFields"
import Header from "../../Components/Header/header"

export default function LoginPage(){
    return(
        <div className="max-w-md" style={{margin:"auto"}}>
             <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
                />
            <Login/>
        </div>
    )
}