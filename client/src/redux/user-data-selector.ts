import {AppStateType} from "./redux-store";

export const getUserName = (state: AppStateType) => {
    return state.userData.userData?.userName
}

export const getUserData = (state: AppStateType) => {
    return state.userData.userData
}

export const getUserPlayground = (state: AppStateType) => {
    return state.userData.userData?.userPlayground
}