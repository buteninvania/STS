import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTeamsThunk} from "../../redux/team-page";
import AddTeamForm from "../../forms/AddTeamForm";
import {getTeamsSelector} from "../../redux/team-data-selector";
import {getUserName} from "../../redux/user-data-selector";
import {addFavoriteTeams} from "../../redux/user-data-page";
import {useHistory} from "react-router-dom";
import t from "./team-list.module.css";

const Team = () => {

    const history = useHistory()
    const teams = useSelector(getTeamsSelector)
    const userName = useSelector(getUserName)
    const dispatch = useDispatch()

    const handleOnClick = (teamId: string) => {
        history.push(`/team/${teamId}`)
    }

    const onClickTeam = (userName: string | undefined, teamId: string) => {
        dispatch(addFavoriteTeams(userName, teamId))
    }

    useEffect(() => {
        dispatch(getTeamsThunk())
    }, [])

    return (
        <div>
            <AddTeamForm userName={userName}/>
                {teams.length > 0 &&
                    <ul>
                        {teams.map((team, id) => {
                            return (
                                <li className={t.teamItem} onClick={() => handleOnClick(team._id)} key={id}>
                                    {team.fullName}
                                    {userName !== undefined ? <button onClick={() => onClickTeam(userName, team._id)}>+</button> : null}
                                </li>
                            )
                        })}
                    </ul>
                }
        </div>
    )
}

export default Team;