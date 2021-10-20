import {instance} from './api'
import {EventGamesDataType} from "../redux/games-page";

export const gamesAPI = {
    getGames() {
        return instance.get(`api/games/sync`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.data.data)
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
}