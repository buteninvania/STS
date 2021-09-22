import {AppStateType} from "./redux-store";
import {PlaygroundsDataType} from "./playgrounds-page";

export const getPlaygroundsSelector = (state: AppStateType) => {
    return state.playgroundPage.playgrounds
}

/* Селектор возвращает данные площадки по ID из редакса - пока не работает */
export const getReduxPlaygroundDataSelector = (state: AppStateType, id: string) => {
    const playgrounds = state.playgroundPage.playgrounds
    playgrounds.filter(playground => playground._id === id)
    return playgrounds[0]
}

/* Селектор берёт данные площадки после того, как прошел запрос на сервер */

export const getPlaygroundDataSelector = (state: AppStateType) :PlaygroundsDataType => {
    return state.playgroundPage.playgroundData
}
