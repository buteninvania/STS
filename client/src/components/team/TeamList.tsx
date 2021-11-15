import React, {useEffect} from "react";
import t from "./team-list.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getTeamsThunk} from "../../redux/team-page";
import {getTeamsSelector} from "../../redux/team-data-selector";
import Preloader from "../preloader/Preloader";
import TeamItem from "./TeamItem";

const TeamList:React.FC<TeamListPropsType> = ({selectTeam, userTeam}) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTeamsThunk())
    }, [])
    let teams = useSelector(getTeamsSelector)

    if (teams.length === 0) {
        return <Preloader/>
    } else {
        return (
            <div className={t.wrapper}>
                {teams.filter(item => item.fullName !== userTeam).map((team, index) => <TeamItem teamId={team._id}
                                                      teamName={team.fullName}
                                                      selectEnemyTeam={selectTeam}
                                                      key={index}
                />)}
            </div>
        )
    }

}

export default TeamList

type TeamListPropsType = {
    selectTeam: (teamName: string) => void
    userTeam: string
}
