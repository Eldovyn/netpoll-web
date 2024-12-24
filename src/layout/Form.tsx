import React from "react";
import LoginForm from "./Auth/Login";
import RegisterForm from "./Auth/Register";
import ResetPasswordForm from "./Auth/ResetPassword";
import SearchPoll from "./Polling/SearchPoll";
import AddPoll from "./Polling/AddPoll";

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