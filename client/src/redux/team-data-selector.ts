import {AppStateType} from "./redux-store";

export const getTeamsSelector = (state: AppStateType) => {
    return state.teamPage.teams
}