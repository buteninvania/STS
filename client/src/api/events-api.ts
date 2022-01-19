import {instance} from './api'

export const eventsAPI = {
    getEvents() {
        return instance.get(`api/adminevent/sync`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => ({
                playgroundEvents: res.data.data.filter((e: {type:string}) => e.type === 'playground'),
                teamEvents: res.data.data.filter((e: {type:string}) => e.type === 'team'),
                gameEvents:res.data.data.filter((e: {type:string}) => e.type === 'game')
            }))
    },

    sendResponseEventAdmin(eventId: string, response: boolean) {
        return instance.post(`api/adminevent/response`, {eventId, response}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.data.data)
    }
}