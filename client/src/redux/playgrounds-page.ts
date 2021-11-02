import {BaseThunkType, InferActionsTypes} from './redux-store'
import {playgroundsAPI} from "../api/playgrounds-api";
import {AddPlaygroundFormType} from "../forms/AddPlaygroundForm";

const initialState : {playgrounds: PlaygroundsDataType[], playgroundData: any} = {
    playgrounds: [],
    playgroundData: null as PlaygroundsDataType | null
}

export const playgroundDataReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "ButInProject/playground-page/SET-PLAYGROUNDS-DATA":
            return {
                ...state,
                playgrounds: [...action.playgrounds],
                
            }
        case "ButInProject/playground-page/SET-PLAYGROUND-DATA":
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
        type: "ButInProject/playground-page/SET-PLAYGROUNDS-DATA",
        playgrounds
    } as const),
    setPlaygroundData: (playgroundData: PlaygroundsDataType) => ({
        type: "ButInProject/playground-page/SET-PLAYGROUND-DATA",
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
type GameDataType = {
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
    playgroundPosition: string | null
}
