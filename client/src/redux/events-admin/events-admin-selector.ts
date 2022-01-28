import {AppStateType} from '../redux-store';

export const getAdminEventsLoaderSelector = (state: AppStateType) => {
    return state.adminEventsPage.loader
}

export const getAdminEventsPlaygroundSelector = (state: AppStateType) => {
    return state.adminEventsPage.playgroundEvents
}

export const getAdminEventsGamesSelector = (state: AppStateType) => {
    return state.adminEventsPage.gameEvents
}

export const getAdminEventsTeamsSelector = (state: AppStateType) => {
    return state.adminEventsPage.teamEvents
}