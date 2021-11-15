import React, {useEffect, useState} from "react";
import {NavLink, Redirect, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserData} from "../../redux/user-data-selector";
import h from "./home.module.css"
import userImg from "./../../img/user-image.png"
import {getPlayerDataThunk} from "../../redux/players-page";
import {getPlayerDataSelector} from "../../redux/players-data-selector"
import ChangePhotoPopupForms from "../popups/ChangePhotoPopupForms";
import HomeBody from './HomeBody';

const Home = () => {

    const [showPopup, setShowPopup] = useState(false)

    const userData = useSelector(getUserData)
    const userId: paramsType = useParams()

    if (userId.name === undefined && userData) {
        return (
            <div>
                <div className={h.header}>
                    <div className={h.avatar} onClick={() => setShowPopup(true)}>
                        <img src={userImg} alt="userImg"/>
                    </div>
                    <div className={h.description}>
                        <div className={h.login}>{userData.userName}</div>
                        {userData.userTeam ? <div className={h.team}><div>{userData.userTeam.teamName}</div></div> : null}
                    </div>
                    {showPopup ? <ChangePhotoPopupForms closePopup={() => setShowPopup(false)}/> : null}
                </div>
                <HomeBody/>
            </div>

        )
    } else if (userId.name !== undefined) {
        return (
            <UserPage userId={userId.name}/>
        )
    } else {
        return <Redirect to="/register"/>
    }
}

export default Home;

const UserPage: React.FC<any> = (userId: any) => {

    const dispatch = useDispatch()
    const playerData = useSelector(getPlayerDataSelector)

    useEffect(() => {
        dispatch(getPlayerDataThunk(userId.userId))
    }, [])

    if (playerData.name !== undefined) {
        return (
            <div className={h.header}>
                <div className={h.avatar}><img src={userImg} alt="userImg"/></div>
                <div className={h.description}>
                    <div className={h.login}>{playerData.name}</div>
                    {playerData.team
                        ? <div className={h.team}>
                            <div>{playerData.team}</div>
                        </div>
                        : null
                    }
                </div>
            </div>
        )
    } else if (userId.name !== undefined) {
        return (
            <UserPage userId={userId.name}/>
        )
    } else {
        return <NavLink to="/register">Войдите или зарегистрируйтесь</NavLink>
    }
}

type paramsType = {
    name: string | undefined
}
