import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPlayersThunk} from "../../redux/players-page";
import {getPlayersSelector} from "../../redux/players-data-selector";
import {NavLink, useHistory} from 'react-router-dom';
import {getUserData} from "../../redux/user-data-selector";

const Players = () => {

    const userData = useSelector(getUserData)
    const players = useSelector(getPlayersSelector)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleOnClick = (userId: string) => {
        history.push(`/home/${userId}`)
    }

    console.log('render Players')


    useEffect(() => {
        dispatch(getPlayersThunk())
    }, [])

    return (
        <div>
            {
                players.length > 0
                    ? <div>
                        {players.map((player, index) => {
                            if (userData && userData.userName === player.name) {
                                return <NavLink to="/home" key={index}>{player.name}</NavLink>
                            }
                            return <div onClick={() => handleOnClick(player.id)} key={index}>{player.name}</div>
                        })}
                    </div>
                    : <div>нет</div>
            }
        </div>
    )
}

export default Players;