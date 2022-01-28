import {instance} from './api'
import {EventGamesDataType} from '../redux/games-page';

/**
 * Games API (get, add, delete)
 */
export const gamesAPI = {
    /**
     *  method that receives a list of games on the site from the server
     */
    getGames() {
        return instance.get(`api/games/sync`)
            .then(res => res.data.data)
    },

    /**
     * @param eventAddedGames new game data
     * method adds a new game to the playground
     */
    addGames(eventAddedGames: EventGamesDataType) {
        return instance.post(`/api/adminevent/add`, {data: eventAddedGames})
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