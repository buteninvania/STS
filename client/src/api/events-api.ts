import {instance} from './api'

/**
 * Admin events API (all events for admin, send response from admin)
 */
export const eventsAPI = {
    /**
     * Get all events for admin decision
     */
    getEvents() {
        return instance.get(`api/adminevent/sync`)
            .then(res => ({
                playgroundEvents: res.data.data.filter((e: {type:string}) => e.type === 'playground'),
                teamEvents: res.data.data.filter((e: {type:string}) => e.type === 'team'),
                gameEvents:res.data.data.filter((e: {type:string}) => e.type === 'game')
            }))
    },

    /**
     * @param eventId - eventID: string
     * @param response - admin decision to create an event
     * This method sends a decision to the server whether to create events.
     */
    sendResponseEventAdmin(eventId: string, response: boolean) {
        return instance.post(`api/adminevent/response`, {eventId, response}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.data.data)
    }
}