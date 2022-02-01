import React from "react";
import t from "./team-list.module.css";
import {TeamDataType} from '../../redux/team-page';

interface TeamItemType {
    teamData: TeamDataType
}

const TeamItem:React.FC<TeamItemType> = ({teamData}) => {

    return (
        <div>
            <span>{teamData.fullName}</span>
        </div>
    )
}

export default TeamItem;
