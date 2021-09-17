import {instance} from './api'
import {TeamDataFormType} from "../forms/AddTeamForm";

export const teamsAPI = {
    getTeams() {
        return instance.get(`api/team/sync`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.data.data)
    },
    addFavoriteTeam(userName: string | undefined, teamId: string) {
        return instance.post(`api/team/favorite`, {userName, teamId}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.data.data)
    },

    sendEventTeamAdmin(teamData: TeamDataFormType) {
        return instance.post(`api/adminevent/add`, {data: teamData}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log(res)
            })
    },
}