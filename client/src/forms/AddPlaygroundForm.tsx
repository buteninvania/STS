import React from "react";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {addPlaygroundThunk} from "../redux/playgrounds-page";

const AddPlaygroundForm: React.FC<any> = () => {

    const dispatch = useDispatch()

    const submit = (values:AddPlaygroundFormType) => {
        dispatch(addPlaygroundThunk(values))
    }

    const formik = useFormik({
        initialValues: {city: '', address: '', institution: '', playgroundName: '', type: 'playground'},
        onSubmit: ((values: AddPlaygroundFormType) => {
            submit(values)
        })
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <input type="text"
                   name="city"
                   id="city"
                   onChange={formik.handleChange}
                   value={formik.values.city}/>
            <input type="text"
                   name="address"
                   id="address"
                   onChange={formik.handleChange}
                   value={formik.values.address}/>
            <input type="text"
                   name="institution"
                   id="institution"
                   onChange={formik.handleChange}
                   value={formik.values.institution}/>
            <input type="text"
                   name="playgroundName"
                   id="playgroundName"
                   onChange={formik.handleChange}
                   value={formik.values.playgroundName}/>
            <button type="submit">Отправить</button>
        </form>
    )
}

export default AddPlaygroundForm

export type AddPlaygroundFormType = {
    city: string,
    address: string,
    institution: string | null,
    playgroundName: string,
    type: string | null
}