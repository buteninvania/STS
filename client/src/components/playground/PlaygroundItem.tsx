import React, {useEffect} from "react";
import p from "./playground.module.css";
import {PlaygroundsDataType} from "../../redux/playgrounds-page";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserName} from "../../redux/user-data-selector";
import {addFavoritePlayground} from "../../redux/user-data-page";

const PlaygroundItem: React.FC<PropsDataType> = ({playground}) => {

    const history = useHistory()
    const userName = useSelector(getUserName)
    const dispatch = useDispatch()

    const handleOnClick = (playgroundId: string) => {
        history.push(`/playground/${playgroundId}`)
    }

    const onClickPlayground = (playgroundId: string, userName: string | undefined) => {
        dispatch(addFavoritePlayground(userName, playgroundId))
    }

    return (
        <li className={p.item} onClick={() => handleOnClick(playground._id)}>
            <div className={p.name}>
                <div>{playground.playgroundName}</div>
                <div>({playground.institution})</div>
            </div>
            <div className={p.gameWrapper}>
                {
                    playground.game.length > 0 ? playground.game.map((item, index) => {
                        return <GameItem key={index} gameId={item}/>
                    }) : null
                }
            </div>
            {userName !== undefined ? <button
                onClick={() => onClickPlayground(playground._id, userName)}>+</button> : null}
        </li>
    )
}

export default PlaygroundItem;

type PropsDataType = {
    playground: PlaygroundsDataType
}

const GameItem:React.FC<GameItemPropsType> = ({gameId}) => {

    const dispatch = useDispatch()

    useEffect(() => {
        
    }, [])

    return (
        <div>
            {gameId}
        </div>
    )
}

type GameItemPropsType = {
    gameId: string
}