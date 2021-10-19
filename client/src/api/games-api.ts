import {instance} from './api'
import {TeamDataFormType} from "../forms/AddTeamForm";

export const gamesAPI = {
    getGames() {
        return instance.get(`api/games/sync`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.data.data)
    },

    addGames(gamesData: TeamDataFormType) {
        return instance.post(`api/adminevent/add`, {data: gamesData}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log(res)
            })
    },
}