import {
    ADMIN_ACTIONS_TYPE,
    AdminEventsStateType,
    SetAdminEventsActionType,
    SetLoaderActionType
} from './events-admin-reducer.types';

export const setAdminEventsAC = (events:any): SetAdminEventsActionType => {
    return {
        type: ADMIN_ACTIONS_TYPE.SET_ADMIN_EVENTS,
        payload: {
            playgroundEvents: events.playgroundEvents,
            teamEvents: events.teamEvents,
            gameEvents: events.gameEvents
        }
    }
}
export const setLoaderAC = (value: boolean): SetLoaderActionType => {
    return {
        type: ADMIN_ACTIONS_TYPE.SET_LOADER,
        payload: {value}
    }
}

