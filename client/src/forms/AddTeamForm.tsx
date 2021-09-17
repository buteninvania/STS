import React from "react";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {addTeamsThunk} from "../redux/team-page";

const AddTeamForm: React.FC<any> = () => {

    const dispatch = useDispatch()

    const submit = (values: TeamDataFormType) => {
        dispatch(addTeamsThunk(values))
    }

    const formik = useFormik({
        initialValues: {name: '', fullName: '', type: 'team'},
        onSubmit: ((values: TeamDataFormType) => {
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
            <input type="text"
                   name="fullName"
                   id="fullName"
                   onChange={formik.handleChange}
                   value={formik.values.fullName}/>
            <button type="submit">Отправить</button>
        </form>
    )
}

export default AddTeamForm

export type TeamDataFormType = {
    name: string,
    fullName: string,
    type: "team"
}