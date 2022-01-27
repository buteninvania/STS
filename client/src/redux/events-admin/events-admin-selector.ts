import {AppStateType} from '../redux-store';

export const getAdminEventsLoaderSelector = (state: AppStateType) => {
    return state.adminEventsPage.loader
}