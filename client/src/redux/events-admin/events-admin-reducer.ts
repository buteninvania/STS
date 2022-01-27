import {
    ADMIN_ACTIONS_TYPE,
    AdminActionsType,
    AdminEventsStateType,
    AdminEventsThunkType
} from './events-admin-reducer.types';
import {eventsAPI} from '../../api/events-api';
import {setAdminEventsAC, setLoaderAC} from './events-admin-actions';

let initialState: AdminEventsStateType = {
    playgroundEvents: [],
    teamEvents: [],
    gameEvents: [],
    loader: false
}

export const adminEventsReducer = (state: AdminEventsStateType = initialState, action: AdminActionsType) => {
    switch (action.type) {
        case ADMIN_ACTIONS_TYPE.SET_ADMIN_EVENTS:
            return {...state, teamEvents: [...action.payload.teamEvents],
                              gameEvents: [...action.payload.gameEvents],
                              playgroundEvents: [...action.payload.playgroundEvents]}
        case ADMIN_ACTIONS_TYPE.SET_LOADER:
            return {...state, loader: action.payload.value}
        default:
            return state
    }
}

/*request to server to get all admin events*/

export const getAdminEventsTC = ():AdminEventsThunkType => async (dispatch) => {
    dispatch(setLoaderAC(true))
    await eventsAPI.getEvents()
        .then((res) => {
            dispatch(setAdminEventsAC(res))
        })
        .catch(e => {
        })
    dispatch(setLoaderAC(false))
}
