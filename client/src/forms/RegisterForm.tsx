import React from "react";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {registerThunk} from "../redux/user-data-page";

const RegisterForm: React.FC<any> = () => {

    const dispatch = useDispatch()

    const submit = (values: RegisterFormsValuesType) => {
        dispatch(registerThunk(values))
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

                   onChange={formik.handleChange}
                   value={formik.values.name}/>
            <input type="password"
                   name="password"

                   onChange={formik.handleChange}
                   value={formik.values.password}/>
            <button type="submit">Зарегистрироваться</button>
        </form>
    )
}

export default RegisterForm

export type RegisterFormsValuesType = {
    name: string,
    password: string
}