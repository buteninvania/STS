import React from "react";
import h from "./home.module.css"

const HomeBody:React.FC<HomeBodyPropsType> = () => {
    return (
        <div className={h.bodyWrapper}>
            <div className={h.bodyNavbar}>
                <div className={h.navbarItem}>Уведомления</div>
                <div className={h.navbarItem}>Стена</div>
            </div>
            <div className={h.bodyListItems}>
                <div className={h.bodyItems}>adssad</div>
                <div className={h.bodyItems}>asddas</div>
                <div className={h.bodyItems}>asdasd</div>
                <div className={h.bodyItems}>sdaasd</div>
            </div>
        </div>
    )
}

export default HomeBody;

type HomeBodyPropsType = {

}

