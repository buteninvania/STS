import React, {useState} from "react";
import g from "./games.module.css";
import TeamList from "../team/TeamList";

const GameCreation: React.FC<GameCreationPropsType> = ({cancelCreateGame, userTeam}) => {

    const [numberPlayers, setNumberPlayers] = useState('3 X 3')
    const [showTeamList, setShowTeamList] = useState(false)

    const changeNumberPlayers = () => numberPlayers === '3 X 3' ? setNumberPlayers('5 X 5') : setNumberPlayers('3 X 3')

    return (
        <div className={g.wrapper}>
            <div className={g.header}>Создание игры</div>
            <div className={g.creator}>
                <select className={g.creatorType}>
                    <option value="1">Тренировачная</option>
                    <option value="2">Соревновательная</option>
                </select>
                <div className={g.creatorTeamWrapper}>
                    <div className={g.creatorTeam}>{userTeam}</div>
                    <div className={g.creatorVS} onClick={() => changeNumberPlayers()}>{numberPlayers}</div>
                    <div className={g.creatorTeam} onClick={() => setShowTeamList(true)}>DpD</div>
                </div>
                <div className={g.creatorDate}>Выбрать дату</div>
            </div>
            <div className={g.footer}>
                <button>Добавить</button>
                <button onClick={cancelCreateGame}>Отменить</button>
            </div>
            {showTeamList !== false ? <TeamList/> : null}
        </div>
    )
}

export default GameCreation;

type GameCreationPropsType =
{
    cancelCreateGame: () => void,
        userTeam
:
    string
}