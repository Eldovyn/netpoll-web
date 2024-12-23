import React from "react";
import LoginForm from "./Auth/Login";
import RegisterForm from "./Auth/Register";

interface FormProps {
    category: string;
}

const Form: React.FC<FormProps> = ({ category }) => {
    if (category === "login") {
        return <LoginForm />;
    } else if (category === "register") {
        return <RegisterForm />;
    }
};

export default Form;