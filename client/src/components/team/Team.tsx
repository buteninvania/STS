import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTeamsThunk} from "../../redux/team-page";
import AddTeamForm from "../../forms/AddTeamForm";
import {getTeamsSelector} from "../../redux/team-data-selector";
import {getUserName} from "../../redux/user-data-selector";
import {addFavoriteTeams} from "../../redux/user-data-page";

const Team = () => {

    const teams = useSelector(getTeamsSelector)
    const userName = useSelector(getUserName)

    const dispatch = useDispatch()

    const onClickTeam = (userName: string | undefined, teamId: string) => {
            dispatch(addFavoriteTeams(userName, teamId))
    }

    useEffect(() => {
        dispatch(getTeamsThunk())
    }, [])

    return (
        <div>
            <AddTeamForm/>
            {
                teams.length > 0 &&
                <ul>
                    {teams.map((team, id) => {
                        return (
                            <li key={id}>
                                {team.fullName}
                                {userName !== undefined ? <button onClick={() => onClickTeam(userName, team._id)}>Выбрать команду</button> : null}
                            </li>
                        )
                    })}
                </ul>
            }
        </div>
    )
}

export default Team;