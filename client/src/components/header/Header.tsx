import React from "react";
import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserName} from "../../redux/user-data-selector";
import {authActions} from "../../redux/user-data-page";
import h from "./header.module.css";

const Header:React.FC<HeaderPropsType> = ({position}) => {

    const dispatch = useDispatch()

    const userId: paramsType = useParams()

    const logoutButtonHandler = () => {
        localStorage.removeItem('token')
        dispatch(authActions.logout())
    }
    const userName = useSelector(getUserName)

    console.log('header render')

    return (
        <div className={position ? h.header+ " " + h.abs : h.header} >
            <div className={h.logo}><NavLink to="/home"/></div>
            <div className={h.navbar}>
                {userName !== undefined ? null : <NavLink activeClassName={h.active} to="/register">Регистрация</NavLink>}
                {userId.name !== undefined ? <NavLink activeClassName={h.active} to="/home">----</NavLink>: null}
                <NavLink activeClassName={h.active} to="/home">Домой</NavLink>
                <NavLink activeClassName={h.active} to="/playground">Площадки</NavLink>
                <NavLink activeClassName={h.active} to="/team">Команды</NavLink>
                <NavLink activeClassName={h.active} to="/players">Игроки</NavLink>
                {(userName === "admin") ? <NavLink activeClassName={h.active} to="/adminevent">Мои события</NavLink> : null}
            </div>
            <div className={h.authorization}>
                {(userName !== undefined) ? <div className={h.login}> {userName}</div> : null}
                {(userName !== undefined) ? <button className={h.button} onClick={logoutButtonHandler}>Выйти</button> : <NavLink to="/register">LOGIN</NavLink>}
            </div>
        </div>
    )
}

export default Header;

type HeaderPropsType = {
    position: boolean
}

type paramsType = {
    name: string | undefined
}