import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import p from "./playground.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getPlaygroundDataSelector} from "../../redux/playground-data-selector";
import {getPlaygroundDataThunk} from "../../redux/playgrounds-page";
import Preloader from "../preloader/Preloader";
import GameCreation from "../games/GameCreation";
import {getUserData} from "../../redux/user-data-selector";

const Playground = () => {

    const dispatch = useDispatch()
    const playgroundId: any = useParams()
    const [showGamesCreationComponent, setShowGamesCreationComponent] = useState(false)
    useEffect(() => {
        dispatch(getPlaygroundDataThunk(playgroundId.name))
    }, [])

    const playgroundData = useSelector(getPlaygroundDataSelector)
    const userData = useSelector(getUserData)
    console.log('render Playground')
    if (playgroundData === null) {
        return <Preloader/>
    } else {
        return (
            <div className={p.playground}>
                <div className={p.header}>{playgroundData.playgroundName}</div>
                <div className={p.content}>
                    <div className={p.description}>
                        <div className={p.description__header}>
                            <div className={p.institution}>{playgroundData.institution}</div>
                            <div className={p.distance}><span>400</span> метров от вас</div>
                        </div>
                        <div className={p.data}>
                            <div>Подписчики: 12</div>
                            <div>Играют: 12</div>
                            <div>Тренировачные: 12</div>
                            <div>Соревновательные: 12</div>
                        </div>
                        <div className={p.actions}>
                            <button>Подойду</button>
                            <button onClick={() => setShowGamesCreationComponent(true)}>Создать игру</button>
                        </div>
                    </div>
                    <div className={p.maps}>Карта</div>
                </div>
                {showGamesCreationComponent && userData !== null
                                            && userData.userTeam !== null ? <GameCreation userTeam={userData.userTeam.teamName} cancelCreateGame={() => setShowGamesCreationComponent(false)}/> : null}
            </div>
        )
    }
}

export default Playground;
