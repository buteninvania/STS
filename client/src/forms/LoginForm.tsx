import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk} from "../redux/user-data-page";
import Preloader from "../components/preloader/Preloader";
import {getUserName} from "../redux/user-data-selector";
import {useHistory} from "react-router-dom";

const LoginForm: React.FC<any> = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const name = useSelector(getUserName)

    useEffect(() => {
        if (name !== undefined) {
            history.push(`/home`)
        }
    })

    const [showPreloader, setShowPreloader] = useState(false)

    const submit = (values: RegisterFormsValuesType) => {
        setShowPreloader(true)
        dispatch(loginThunk(values))
    }

    const formik = useFormik({
        initialValues: {name: '', password: ''},
        onSubmit: (values => {
            submit(values)
        })
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <input type="text"
                   name="name"
                   id="name"
                   onChange={formik.handleChange}
                   value={formik.values.name}/>
            <input type="password"
                   name="password"
                   id="password"
                   onChange={formik.handleChange}
                   value={formik.values.password}/>
            <button type="submit">Войти</button>
            {showPreloader ? <Preloader/> : null}
        </form>
    )
}

export default LoginForm

export type RegisterFormsValuesType =
{
    name: string,
        password
:
    string
}