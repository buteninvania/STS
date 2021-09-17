import {instance} from './api'

export const playersAPI = {
    getPlayers() {
        return instance.get(`api/players/sync`, {})
            .then(res => res.data.data)
    },
    getPlayerData(userId: string) {
        return instance.get(`api/players/${userId}`, {})
            .then(res => res.data.data)
    }
}