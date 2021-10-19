import React, {useState} from "react";
import g from "./games.module.css";
import TeamList from "../team/TeamList";
import {useForm, SubmitHandler} from "react-hook-form";
import {useDispatch} from "react-redux";
import {addGamesThunk} from "../../redux/games-page";

const GameCreation: React.FC<GameCreationPropsType> = ({cancelCreateGame, userTeam}) => {

    const { register, handleSubmit, setValue} = useForm();
    const dispatch = useDispatch()

    const [numberPlayers, setNumberPlayers] = useState('3 X 3')
    const [teamName, setTeamName] = useState('Выберите команду противника')
    const [showTeamList, setShowTeamList] = useState(false)

    const changeNumberPlayers = () => numberPlayers === '3 X 3' ? setNumberPlayers('5 X 5') : setNumberPlayers('3 X 3')
    const selectEnemyTeam = (teamName: string) =>  setValue('enemyTeam', teamName)
    const onSubmit: SubmitHandler<GameCreationFormValuesInterface> = (gamesData) => dispatch(addGamesThunk(gamesData))

    return (
        <form className={g.wrapper} onSubmit={handleSubmit(onSubmit)}>
            <div className={g.header}>Создание игры</div>
            <div className={g.creator}>
                <select {...register("gameType")} className={g.creatorType}>
                    <option value="training">Тренировачная</option>
                    <option value="rating">Соревновательная</option>
                </select>
                <div className={g.creatorTeamWrapper}>
                    <input {...register("myTeam")} type="text" value={userTeam} className={g.creatorTeam}/>
                    <input {...register("VS")} className={g.creatorVS}  value={numberPlayers} onClick={() => changeNumberPlayers()}/>
                    <input {...register("enemyTeam")} type="text" className={g.creatorTeam + ' ' + g.enemy} value={teamName} onClick={() => setShowTeamList(true)}/>
                </div>
                <div className={g.creatorDate}>Выбрать дату</div>
            </div>
            <input type="submit"/>
            <button onClick={() => cancelCreateGame()}>Отменить</button>
            {showTeamList ? <TeamList selectTeam={selectEnemyTeam}/> : null}
        </form>
    )
}

export default GameCreation;

type GameCreationPropsType = {
    cancelCreateGame: () => void,
    userTeam: string,
}

interface GameCreationFormValuesInterface {
    gameType: string
    myTeam: string
    VS: string
    enemyTeam: string
}