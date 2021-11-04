import React  from "react";
import p from "./playground.module.css";
import {PlaygroundsDataType} from "../../redux/playgrounds-page";
import {useHistory} from "react-router-dom";

const PlaygroundItem: React.FC<PropsDataType> = ({playground}) => {

    const history = useHistory()

    const handleOnClick = (playgroundId: string) => {
        history.push(`/playground/${playgroundId}`)
    }

    return (
        <li className={p.item} onClick={() => handleOnClick(playground._id)}>
            <div className={p.name}>
                <div>{playground.playgroundName}</div>
                <div>({playground.institution})</div>
            </div>
            <div className={p.gameWrapper}>
                { playground.game.length > 0 ? playground.game.map((item, index) => <GameItem key={index} date={item.date} VS={item.VS} gameType={item.gameType}/>) : null }
            </div>
        </li>
    )
}

export default PlaygroundItem;

type PropsDataType = {
    playground: PlaygroundsDataType
}

const GameItem:React.FC<GameItemPropsType> = ({VS, date, gameType}) => {

    return (
        <div className={gameType==="training" ? p.gameDot : p.gameDot + ' ' + p.attack}>
            {VS}
        </div>
    )
}

type GameItemPropsType = {
    VS: string,
    date: string
    gameType: string
}