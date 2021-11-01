import React, {useEffect} from "react";
import t from "./team-list.module.css";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getTeamDataThunk} from "../../redux/team-page";
import {getTeamDataSelector} from "../../redux/team-data-selector";
import Preloader from "../preloader/Preloader";

const TeamPage:React.FC = () => {

    const teamId: any = useParams()
    const dispatch = useDispatch()
    const teamData = useSelector(getTeamDataSelector)

    useEffect(() => {
        dispatch(getTeamDataThunk(teamId.teamId))
    },[])

    if(teamData === null) return <Preloader/>

    return (
        <div>
            {teamData.fullName}
        </div>
    )
}

export default TeamPage;

