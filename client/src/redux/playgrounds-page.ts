import {BaseThunkType, InferActionsTypes} from './redux-store'
import {playgroundsAPI} from "../api/playgrounds-api";
import {AddPlaygroundFormType} from "../forms/AddPlaygroundForm";

const ActionType = {
    SET_PLAYGROUNDS_DATA: 'ButInProject/playground-page/SET-PLAYGROUNDS-DATA',
    SET_PLAYGROUND_DATA: "ButInProject/playground-page/SET-PLAYGROUND-DATA",
} as const

const initialState : {playgrounds: PlaygroundsDataType[], playgroundData: any} = {
    playgrounds: [],
    playgroundData: null as PlaygroundsDataType | null
}

export const playgroundDataReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ActionType.SET_PLAYGROUNDS_DATA:
            return {
                ...state,
                playgrounds: [...action.playgrounds],
                
            }
        case ActionType.SET_PLAYGROUND_DATA:
            return {
                ...state,
                playgroundData: action.playgroundData
            }
        default:
            return state
    }
}

export const playgroundActions = {
    setPlaygrounds: (playgrounds: []) => ({
        type: ActionType.SET_PLAYGROUNDS_DATA,
        playgrounds
    } as const),
    setPlaygroundData: (playgroundData: PlaygroundsDataType) => ({
        type: ActionType.SET_PLAYGROUND_DATA,
        playgroundData
    } as const),
}

export const getPlaygroundsThunk = ():ThunkType => async (dispatch) => {
        await playgroundsAPI.getPlaygrounds()
            .then(res => {
                const playgrounds = res.playgrounds
                dispatch(playgroundActions.setPlaygrounds(playgrounds))
            })
            .catch(err => console.log(err))
}

export const getPlaygroundDataThunk = (playgroundId: string):ThunkType => async (dispatch) => {
    await playgroundsAPI.getPlaygroundData(playgroundId)
        .then(res => {
            dispatch(playgroundActions.setPlaygroundData(res))
        })
        .catch(err => console.log(err))
}

export const addPlaygroundThunk = (playgroundData: AddPlaygroundFormType):ThunkType => async (dispatch) => {
   await playgroundsAPI.sendEventPlaygroundAdmin(playgroundData)
       .then(res => {
           console.log(res)
       })
       .catch(err => console.log(err))
}

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof playgroundActions>
type ThunkType = BaseThunkType<ActionsType>
export type GameDataType = {
    _id: string
    playground: string
    gameType: string
    userTeam: string
    VS: string
    enemyTeam: string
    date: string
}
export type PlaygroundsDataType = {
    playgroundName: string,
    city: string,
    address: string,
    institution: string | null,
    type: string | null,
    _id: string
    game: GameDataType[],
    position: string
}
