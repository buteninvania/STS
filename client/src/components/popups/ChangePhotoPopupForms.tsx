import React from "react";
import p from "./popups.module.css";
import {useFormik} from "formik";

const ChangePhotoPopupForms: React.FC<ChangePhotoPopupFormsValueType> = ({closePopup}) => {

    const submit = (values: formPopupImageUrlValueType) => {
        debugger
    }

    const formik = useFormik({
        initialValues: {
            imgUrl: ''
        },
        onSubmit: ((values: formPopupImageUrlValueType) => {
            submit(values)
        })
    })

    return (
        <div className={p.changePhoto}>
            <form onSubmit={formik.handleSubmit}>
                <input type="text"
                       name="imgUrl"
                       id="imgUrl"
                       onChange={formik.handleChange}
                       placeholder="Вставьте URL-адрес фото"
                       value={formik.values.imgUrl}/>
                <div className={p.buttonsWrapper}>
                    <button type="submit">Отправить</button>
                    <div className={p.closePopup} onClick={closePopup}>Отменить</div>
                </div>
            </form>
        </div>
    )
}

export default ChangePhotoPopupForms;

type ChangePhotoPopupFormsValueType = {
    closePopup: () => void
}

type formPopupImageUrlValueType = {
    imgUrl: string
}
