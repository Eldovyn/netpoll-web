import React from "react";
import LoginForm from "./Auth/Login";

interface FormProps {
    category: string;
}

const Form: React.FC<FormProps> = ({ category }) => {
    if (category === "login") {
        return <LoginForm />;
    }
};

export default Form;