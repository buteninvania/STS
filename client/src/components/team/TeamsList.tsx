import React from "react";
import {TeamDataType} from '../../redux/team-page';
import TeamItem from './TeamItem';

interface TeamsListType {
    teams: Array<TeamDataType>
}

export const TeamsList: React.FC<TeamsListType> = ({teams}) => {
    return (
        <div>
            {teams.length > 0 && teams.map(t => {
                return <TeamItem key={t._id} teamData={t}/>
            })}
        </div>
    )
}