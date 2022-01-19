import {BaseThunkType} from '../redux-store';

export enum ADMIN_ACTIONS_TYPE {
    SET_ADMIN_EVENTS = 'AdminInterface/SET_ADMIN_EVENTS_TYPE',
    SET_LOADER = 'AdminInterface/SET_LOADER'
}

export type AdminEventsStateType = {
    playgroundEvents: Array<PlaygroundAdminEventType>
    teamEvents: Array<TeamAdminEventType>
    gameEvents: Array<GameAdminEventType>
    loader: boolean
}
export type PlaygroundAdminEventType = {
    id: string
    type: string
    city: string
    address: string
    institution: string
    name: string
    position: string
}
export type TeamAdminEventType = {
    id: string
    type: string
    name: string
    fullName: string
    users: Array<string>
    leader: string
}
export type GameAdminEventType = {
    id: string
    playground: string
    gameType: string
    userTeam: string
    VS: string
    enemyTeam: string
    date: string
    type: string
}

export type SetAdminEventsActionType = {
    type: ADMIN_ACTIONS_TYPE.SET_ADMIN_EVENTS,
    payload: {
        playgroundEvents: Array<PlaygroundAdminEventType>
        teamEvents: Array<TeamAdminEventType>
        gameEvents: Array<GameAdminEventType>
    }
}
export type SetLoaderActionType = {
    type: ADMIN_ACTIONS_TYPE.SET_LOADER,
    payload: { value: boolean}
}

export type AdminActionsType = SetAdminEventsActionType | SetLoaderActionType

export type AdminEventsThunkType = BaseThunkType<AdminActionsType>