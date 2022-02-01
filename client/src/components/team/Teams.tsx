import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTeamsThunk, TeamDataType} from '../../redux/team-page';
import AddTeamForm, {TeamDataFormType} from '../../forms/AddTeamForm';
import {getTeamsSelector} from "../../redux/team-data-selector";
import {getUserName, getUserTeam} from "../../redux/user-data-selector";
import {addFavoriteTeams} from "../../redux/user-data-page";
import {useHistory} from "react-router-dom";
import t from "./team-list.module.css";
import {AppStateType} from '../../redux/redux-store';
import {TeamsList} from './TeamsList';

const Teams = () => {

    const history = useHistory()
    const teams = useSelector<AppStateType, Array<TeamDataType>>(getTeamsSelector)
    const userName = useSelector(getUserName)
    const userTeam = useSelector(getUserTeam)
    const dispatch = useDispatch()

    const handleOnClick = (teamId: string) => {
        history.push(`/team/${teamId}`)
    }

    useEffect(() => {
        dispatch(getTeamsThunk())
        return
    }, [])

    return (
        <div>
            <AddTeamForm userName={userName}/>
            <TeamsList teams={teams}/>
        </div>
    )
}

export default Teams;