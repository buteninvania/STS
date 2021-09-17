import {AppStateType} from "./redux-store";

export const getPlaygroundsSelector = (state: AppStateType) => {
    return state.eventPage.events
}