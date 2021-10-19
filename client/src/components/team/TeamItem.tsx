import React from "react";
import t from "./team-list.module.css";

const TeamItem:React.FC<TeamItemPropsType> = ({teamName, teamId, selectEnemyTeam}) => {

    const itemHandler = (teamName: string) => {
        selectEnemyTeam(teamName)
    }

    return (
        <div onClick={() => itemHandler(teamName)} className={t.item}>
            <div className={t.itemHeader}>{teamName}</div>
        </div>
    )
}

export default TeamItem;

type TeamItemPropsType = {
    teamName: string,
    teamId: string,
    selectEnemyTeam: (teamName: string) => void
}