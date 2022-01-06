import {instance} from './api'

export const notificationApi = {
    deleteNotification(userName: string, notificationID: string) {
        return instance.delete(`api/notification/${userName}&${notificationID}`, {})
            .then(res => res)
    }
}