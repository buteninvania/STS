import {AppStateType} from "./redux-store";

export const getPlayersSelector = (state: AppStateType) => {
    return state.playerPage.players
}

export const getPlayerDataSelector = (state: AppStateType) => {
    return state.playerPage.playerData
}