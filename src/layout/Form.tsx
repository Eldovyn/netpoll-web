import React from "react";
import LoginForm from "./Auth/Login";
import RegisterForm from "./Auth/Register";
import ResetPasswordForm from "./Auth/ResetPassword";
import AddPoll from "./Auth/AddPoll";
import SearchPoll from "./home/SearchPoll";

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
    } else if (category === 'add-poll') {
        return <AddPoll />;
    } else if (category === 'search-poll') {
        return <SearchPoll />;
    }
};

export default Form;