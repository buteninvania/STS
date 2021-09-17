import React from "react";
import RegisterForm from "../../forms/RegisterForm";
import LoginForm from "../../forms/LoginForm";
import a from "./authorization.module.css"

const Authorization: React.FC = () => {

    return (
        <div className={a.authorization}>
            <RegisterForm/>
            <LoginForm/>
        </div>
    )
}

export default Authorization;