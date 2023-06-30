import Header from "../../Components/Header/header";
import Signup from "../../Components/Signup/signupFields";

export default function SignupPage(){
    return(
        <div className="max-w-md" style={{margin:"auto"}}>
            <Header
              heading="Signup to create an account"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/login"
            />
            <Signup/>
        </div>
    )
}