import React from "react";
import h from "./home.module.css"
import {useSelector} from 'react-redux';
import {getUserNotifications} from '../../redux/user-data-selector';
import {NotificationItem} from './notification/NotificationItem';
import { getPlaygroundsSelector } from "../../redux/playground-data-selector";

const HomeBody:React.FC<HomeBodyPropsType> = ({team, deleteNotification, userName}) => {

    const notification = useSelector(getUserNotifications)
    const playgrounds = useSelector(getPlaygroundsSelector)

    return (
        <div className={h.bodyWrapper}>
            <div className={h.bodyNavbar}>
                <div className={h.navbarItem}>Уведомления</div>
                <div className={h.navbarItem}>Стена</div>
            </div>
            <div className={h.bodyListItems}>
                {notification && notification.map(n => <NotificationItem key={n._id}
                                                                         deleteNotification={deleteNotification}
                                                                         notification={n}
                                                                         userName={userName}
                                                                         playgrounds={playgrounds}
                                                                         team={team}/>)}
            </div>
        </div>
    )
}

export default HomeBody;

type HomeBodyPropsType = {
    userName: string
    team: string | undefined
    deleteNotification: (userName: string, notificationID: string) => void
}

