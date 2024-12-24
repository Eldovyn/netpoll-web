import React from "react";
import LoginForm from "./Auth/Login";
import RegisterForm from "./Auth/Register";
import ResetPasswordForm from "./Auth/ResetPassword";

interface FormProps {
    category: string;
}

const Form: React.FC<FormProps> = ({ category }) => {
    if (category === "login") {
        return <LoginForm />;
    } else if (category === "register") {
        return <RegisterForm />;
    } else if (category === "reset-password") {
        return <ResetPasswordForm />;
    }
};

export default Form;