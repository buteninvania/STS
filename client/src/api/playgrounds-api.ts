import {instance} from './api'
import {AddPlaygroundFormType} from "../forms/AddPlaygroundForm";

export const playgroundsAPI = {
    getPlaygrounds() {
        return instance.get(`api/playground/sync`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.data.data)
    },

    addPlayground(playgroundData: AddPlaygroundFormType) {
        return instance.post(`api/playground/add`,{playgroundData}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.data.data)
    },

    addFavoritePlayground(userName: string | undefined, playgroundName: string) {
        return instance.put(`api/playground/favorite`,{userName, playgroundName}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.data.data)
    },

    sendEventPlaygroundAdmin(playgroundData: AddPlaygroundFormType) {
        return instance.post(`api/adminevent/add`,{data: playgroundData}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log(res)
            })
    },

    getPlaygroundData(playgroundId: string) {
        return instance.get(`api/playground/${playgroundId}`, {})
            .then(res => res.data.data)
    }
}