import {instance} from './api'
import {EventGamesDataType} from "../redux/games-page";

export const gamesAPI = {
    getGames() {
        return instance.get(`api/games/sync`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                debugger
                 return res.data.data
            })
    },

    addGames(eventAddedGames: EventGamesDataType) {
        return instance.post(`/api/adminevent/add`, {data: eventAddedGames}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log(res.data)
            })
    },

    deleteGame(playgroundID: string, gamesID: string) {
        return instance.delete(`api/playground/${playgroundID}&${gamesID}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                debugger
            })
    }
}