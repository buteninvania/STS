import {AppStateType} from "./redux-store";

export const getGamesPlayground = (state: AppStateType) => {
    return state.userData.userData?.userPlayground
}