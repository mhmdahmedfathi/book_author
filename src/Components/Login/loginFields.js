import { useState, useContext } from "react";
import { loginFields } from "../../Constants/FormFields";
import FormAction from "../Input/FormAction";
import Input from "../Input/input";
import Helpers from "../../helpers";
import { AuthContext } from "../../StateManagment/AuthContext";
import { useNavigate } from "react-router-dom";
const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);
  const [error, setError] = useState(false);
  const helper = new Helpers();
  const { login, User } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  if (User) {
    if (User.role === "author") {
      return navigate("/dashboard");
    } else if (User.role === "reader") {
      return navigate("/");
    }
  }

  //Handle Login API Integration here
  const authenticateUser = () => {
    if (loginState.role === "" || loginState.role === undefined) {
      return setError(
        <p style={{ textAlign: "center" }}>
          Role: Role is required, are you a reader or an author?
        </p>
      );
    }
    helper.login(loginState).then((res) => {
      if (!res.data) {
        const objKeys = Object.keys(res);
        setError(
          objKeys.map((key) => {
            return (
              <p style={{ textAlign: "center" }}>
                {key}: {res[key]}
              </p>
            );
          })
        );
      } else {
        setError(false);
        login(res.data.user);
        if (res.data.user.role === "author") {
          return navigate("/dashboard");
        }
        navigate("/");
      }
    });
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="text-red-500">{error}</div>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <label htmlFor="role" className="flex items-center">
          <input
            name="role"
            value="author"
            type="radio"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            onClick={(e) => {
              loginState.role = e.target.value;
            }}
          />
          <span className="ml-2 text-sm text-gray-600">Author</span>
        </label>
        <label htmlFor="role" className="flex items-center">
          <input
            name="role"
            type="radio"
            value="reader"
            onClick={(e) => {
              loginState.role = e.target.value;
            }}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-600">Reader</span>
        </label>
      </div>
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}
