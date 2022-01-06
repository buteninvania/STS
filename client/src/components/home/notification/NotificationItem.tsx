/***********************NotificationItem**************************/
import React from 'react';
import {NotificationType} from '../../../redux/user-data-page';
import {PlaygroundsDataType} from '../../../redux/playgrounds-page';

export const NotificationItem: React.FC<NotificationItemPropsType> = React.memo(({playgrounds, notification, team, deleteNotification, userName}) => {

    return (
        <div>
            Новая игра!
            <span>Тип игры: {notification.gameType === "rating" ? "Рейтинговая" : "Тренировочная"}.</span>
            <span>Площадка: {notification.gameType === "rating" ? "Рейтинговая" : "Тренировочная"}.</span>
            <button onClick={() => deleteNotification(userName, notification._id)}>Удалить уведомление</button>
        </div>
    )
})

type NotificationItemPropsType = {
    playgrounds: Array<PlaygroundsDataType>
    notification: NotificationType
    team: string | undefined
    userName: string
    deleteNotification: (userName: string, notificationID: string) => void
}

/**********************************************************/


