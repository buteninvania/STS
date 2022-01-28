import React from 'react';
import {
    GameAdminEventType,
    PlaygroundAdminEventType,
    TeamAdminEventType
} from '../../redux/events-admin/events-admin-reducer.types';

type Props = {
    /** event block title */
    title: string
    /** array of admin events */
    events: PlaygroundAdminEventType[] | GameAdminEventType[] | TeamAdminEventType[]
    /** callback function with event id to send admin response */
    callBack: (eventID: string, res: boolean) => void
}

export const AdminEventsList: React.FC<Props> = ({title, events, callBack}) => {
    return (
        <div>
            <h2>{title}</h2>
            {events.map((e:any, index: any) => {
                return (
                    <div key={index}>
                        <span>{e.id}</span>
                        <button onClick={() => callBack(e.id, true)}>+</button>
                        <button onClick={() => callBack(e.id, false)}>-</button>
                    </div>
                )
            })}
        </div>
    )
}