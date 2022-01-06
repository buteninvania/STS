import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import p from "./playground.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getPlaygroundDataSelector} from "../../redux/playground-data-selector";
import {getPlaygroundDataThunk} from "../../redux/playgrounds-page";
import Preloader from "../preloader/Preloader";
import GameCreation from "../games/GameCreation";
import {getUserData} from "../../redux/user-data-selector";
import {YMaps, Map, Placemark} from 'react-yandex-maps';
import {ListGames} from '../games/ListGames';
import {deleteGamesThunk} from '../../redux/games-page';

const Playground = () => {

    const dispatch = useDispatch()
    const playgroundId: any = useParams()

    const deleteGame = (playgroundID: string, gameID: string) => {
        dispatch(deleteGamesThunk(playgroundID, gameID))
    }

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
                            <div>Играют: 12</div>
                        </div>
                        <div className={p.actions}>
                            <button>Подойду</button>
                            <button onClick={() => setShowGamesCreationComponent(true)}>Создать игру</button>
                        </div>
                        {playgroundData.game.length > 0 && <ListGames deleteGame={deleteGame} games={playgroundData.game}/>}
                    </div>
                    <div className={p.mapsWrapper}><PlaygroundMap position={playgroundData.position}/></div>
                </div>
                {showGamesCreationComponent && userData !== null
                && userData.userTeam !== null ? <GameCreation userTeam={userData.userTeam.teamName}
                                                              cancelCreateGame={() => setShowGamesCreationComponent(false)}
                                                              playgroundId={playgroundId}/> : null}
            </div>
        )
    }
}

export default Playground;

const PlaygroundMap: React.FC<PlaygroundMapPropsType> = ({position}) => {

    const playgroundPosition = position.split(', ').map(item => Number(item))

    console.log("Playground render")

    if (playgroundPosition) {
        return (
            <YMaps>
                <Map width={700} height={500} defaultState={{center: playgroundPosition, zoom: 17}}>
                    <Placemark geometry={playgroundPosition}/>
                </Map>
            </YMaps>
        )
    } else {
        return <Preloader/>
    }

}

// const Accordion:React.FC<AccordionPropsType> = ({list}) => {
//
//     if (list.length > 0) {
//         list.map((item, index) => {
//             return(
//                 <div key={index}>
//                     {item}
//                 </div>
//             )
//         })
//     } else {
//         return <Preloader/>
//     }
//
//
// }

type AccordionPropsType = {
    list: string[]
}

type PlaygroundMapPropsType = {
    position: string
}

