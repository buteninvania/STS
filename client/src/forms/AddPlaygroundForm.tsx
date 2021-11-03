import React from "react";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {addPlaygroundThunk} from "../redux/playgrounds-page";


const AddPlaygroundForm: React.FC<any> = () => {

    const dispatch = useDispatch()

    const submit = (values: AddPlaygroundFormType) => {
        dispatch(addPlaygroundThunk(values))
    }

    const formik = useFormik({
        initialValues: {
            city: '',
            address: '',
            institution: '',
            name: '',
            type: 'playground',
            position: ''
        },
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
                   placeholder="Введите город"
                   value={formik.values.city}/>
            <input type="text"
                   name="address"
                   id="address"
                   onChange={formik.handleChange}
                   placeholder="Введите улицу"
                   value={formik.values.address}/>
            <input type="text"
                   name="institution"
                   id="institution"
                   onChange={formik.handleChange}
                   placeholder="Введите учреждение"
                   value={formik.values.institution}/>
            <input type="text"
                   name="name"
                   id="name"
                   onChange={formik.handleChange}
                   placeholder="Введите имя каким его обычно называют"
                   value={formik.values.name}/>
            <input type="text"
                   name="position"
                   id="position"
                   onChange={formik.handleChange}
                   placeholder="Введите скопированные координаты для быстрой проверки"
                   value={formik.values.position}/>
            <a target="blank" href="https://yandex.ru/maps/12/smolensk/?ll=32.045251%2C54.782635&z=12">
                <img width={100}
                     src="https://w7.pngwing.com/pngs/458/516/png-transparent-yandex-maps-google-play-map-text-logo-map-thumbnail.png"
                     alt="a"/>
            </a>
            <button type="submit">Отправить</button>
        </form>
    )
}

export default AddPlaygroundForm

export type AddPlaygroundFormType = {
    city: string,
    address: string,
    institution: string | null,
    name: string,
    type: string | null
    position: string | null
}