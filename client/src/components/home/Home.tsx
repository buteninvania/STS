import React, {useEffect} from "react";
import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserData} from "../../redux/user-data-selector";
import h from "./home.module.css"
import userImg from "./../../img/user-image.png"
import teamImg from "./../../img/anonymous-logo-1-1280x720.jpg"
import playground from "./../../img/stadium.png"
import {getPlayerDataThunk} from "../../redux/players-page";
import {getPlayerDataSelector} from "../../redux/players-data-selector";

const Home = () => {

    const userData = useSelector(getUserData)
    const userId: paramsType = useParams()

    if (userId.name === undefined && userData) {
        return (
            <div className={h.header}>
                <div className={h.avatar}><img src={userImg} alt="userImg"/></div>
                <div className={h.description}>
                    <div className={h.login}>{userData.userName}</div>
                    {userData.userTeam
                        ? <div className={h.team}>
                            <img src={teamImg} alt="team-logo"/>
                            <div>{userData.userTeam}</div>
                        </div>
                        : <NavLink to={"/team"}>Выберите команду</NavLink>
                    }
                </div>
                <div>
                    {userData.userPlayground
                        ? <div className={h.playground}>
                            <img src={playground} alt="playground"/>
                            <div className={h.name}>{userData.userPlayground}</div>
                        </div>
                        : <NavLink to={"/playground"}>Выберите площадку</NavLink>
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

export default Home;

const UserPage: React.FC<any> = (userId: any) => {

    const dispatch = useDispatch()
    const playerData = useSelector(getPlayerDataSelector)

    useEffect(() => {
        dispatch(getPlayerDataThunk(userId.userId))
    },[])

    if (playerData.name !== undefined) {
        return (
            <div className={h.header}>
                <div className={h.avatar}><img src={userImg} alt="userImg"/></div>
                <div className={h.description}>
                    <div className={h.login}>{playerData.name}</div>
                    {playerData.team
                        ? <div className={h.team}>
                            <img src={teamImg} alt="team-logo"/>
                            <div>{playerData.team}</div>
                        </div>
                        : null
                    }
                </div>
                <div>
                    {playerData.playground
                        ? <div className={h.playground}>
                            <img src={playground} alt="playground"/>
                            <div className={h.name}>{playerData.playground}</div>
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