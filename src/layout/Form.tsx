import React from "react";
import LoginForm from "./Auth/Login";
import RegisterForm from "./Auth/Register";
import ResetPasswordForm from "./Auth/ResetPassword";
import SearchPoll from "./Polling/SearchPoll";
import AddPoll from "./Polling/AddPoll";
import Comment from "./Polling/Comment";
import { FormikHelpers } from 'formik'
import { FormikProps } from "formik";

interface FormData {
    title: string;
}

interface FormikData {
    initialValues: FormData;
}

interface FormProps {
    category: string;
    formik?: FormikProps<FormData>
}

const Form: React.FC<FormProps> = ({ category, formik }) => {
    if (category === "login") {
        return <LoginForm />;
    } else if (category === "register") {
        return <RegisterForm />;
    } else if (category === "reset-password") {
        return <ResetPasswordForm />;
    } else if (category === 'add-poll') {
        return <AddPoll />;
    } else if (category === 'search-poll') {
        return <SearchPoll formik={formik} />;
    } else if (category === 'comment') {
        return <Comment />;
    }
};

export default Form;