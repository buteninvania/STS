import {Action, applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {userDataReducer} from "./user-data-page";
import {playgroundDataReducer} from "./playgrounds-page";
import {teamDataReducer} from "./team-page";
import {eventDataReducer} from "./events-page";
import {playersDataReducer} from "./players-page";
import {gamesDataReducer} from "./games-page";
import {adminEventsReducer} from './events-admin/events-admin-reducer';

const rootReducer = combineReducers({
    userData: userDataReducer,
    playgroundPage: playgroundDataReducer,
    teamPage: teamDataReducer,
    eventPage: eventDataReducer,
    playerPage: playersDataReducer,
    gamesPage: gamesDataReducer,
    adminEventsPage: adminEventsReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store