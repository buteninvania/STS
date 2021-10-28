import React from "react";
import t from "./team-list.module.css";
import {useParams} from "react-router-dom";

const TeamPage:React.FC = () => {

    const teamId: any = useParams()

    return (
        <div>
            {teamId.teamId}
        </div>
    )
}

export default TeamPage;

