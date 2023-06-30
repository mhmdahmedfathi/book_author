import { useState } from "react";
import FormAction from "../Input/FormAction";
import { signupFields } from "../../Constants/FormFields";
import Input from "../Input/input";
import Helpers from "../../helpers";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Signup() {
  const helper = new Helpers();
  const [signupState, setSignupState] = useState(fieldsState);
  const [error, setError] = useState(false);

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupState);
    createAccount();
  };

  const createAccount = async () => {
    if (signupState.name.length < 3) {
      setError(
        <p style={{ textAlign: "center" }}>
          Username should be at least 3 characters long
        </p>
      );
      return;
    }

    if (signupState.password !== signupState["confirm-password"]) {
      setError(
        <p style={{ textAlign: "center" }}>
          Password and Confirm Password do not match
        </p>
      );
      return;
    }
    if (signupState.password.length < 8) {
      setError(
        <p style={{ textAlign: "center" }}>
          Password should be at least 8 characters long
        </p>
      );
      return;
    }
    if (signupState.role === null) {
      setError(<p style={{ textAlign: "center" }}>Please select a role</p>);
      return;
    }

    let res = await helper.signup(signupState);
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
      window.location.href = "/login";
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="text-red-500">{error}</div>
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <div className="flex items-center justify-between">
          <label htmlFor="role" className="flex items-center">
            <input
              id="role"
              name="role"
              value="author"
              type="radio"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              onClick={(e) => {
                signupState.role = e.target.value;
              }}
            />
            <span className="ml-2 text-sm text-gray-600">Author</span>
          </label>
          <label htmlFor="role" className="flex items-center">
            <input
              id="role"
              name="role"
              type="radio"
              value="reader"
              onClick={(e) => {
                signupState.role = e.target.value;
              }}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">Reader</span>
          </label>
        </div>

        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>
    </form>
  );
}
