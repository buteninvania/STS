import {AppStateType} from "./redux-store";

export const getPlaygroundsSelector = (state: AppStateType) => {
    return state.playgroundPage.playgrounds
}

export const getPlaygroundSelector = (state: AppStateType) => {

}