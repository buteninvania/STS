import {BaseThunkType, InferActionsTypes} from './redux-store'
import {playersAPI} from "../api/players-api";

const initialState : {players: PlayersDataType[], playerData: any} = {
    players: [],
    playerData: {}
}

export const playersDataReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "ButInProject/players-page/SET-PLAYERS-DATA":
            return {
                ...state,
                players: [...action.players]
            }
        case "ButInProject/players-page/SET-PLAYER-DATA":
            return {
                ...state,
                playerData: {...action.playerData}
            }
        default:
            return state
    }
}

export const playersActions = {
    setPlayers: (players: []) => ({
        type: "ButInProject/players-page/SET-PLAYERS-DATA",
        players
    } as const),
    setPlayerData: (playerData: {}) => ({
        type: "ButInProject/players-page/SET-PLAYER-DATA",
        playerData
    } as const),
}

export const getPlayersThunk = ():ThunkType => async (dispatch) => {
        await playersAPI.getPlayers()
            .then(res => {
                dispatch(playersActions.setPlayers(res))
            })
            .catch(err => console.log(err))
}

export const getPlayerDataThunk = (userId: string):ThunkType => async (dispatch) => {
    await playersAPI.getPlayerData(userId)
        .then(res => {
            dispatch(playersActions.setPlayerData(res))
        })
        .catch(err => console.log(err))
}

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof playersActions>
type ThunkType = BaseThunkType<ActionsType>
type PlayersDataType = {
    name: string
    id: string,
    playground: string
    team: string
}
type PlayerDataType = {
    name: string
    playground: string | undefined
    team: string | undefined
}
