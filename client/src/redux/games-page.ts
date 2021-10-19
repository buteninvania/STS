import {BaseThunkType, InferActionsTypes} from './redux-store'
import {gamesAPI} from "../api/games-api";


const initialState : {games: GamesDataType[]} = {
    games: [],
}

export const gameDataReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "ButInProject/games-page/SET-GAMES":
            return {
                ...state,
                games: [...action.games]
            }
        default:
            return state
    }
}

export const gamesActions = {
    setTeams: (games: []) => ({
        type: "ButInProject/games-page/SET-GAMES",
        games
    } as const),
}

export const getGamesThunk = ():ThunkType => async (dispatch) => {
        await gamesAPI.getGames()
            .then(res => {
                debugger
            })
            .catch(err => console.log(err))
}

export const addGamesThunk = (gamesData: any):ThunkType => async (dispatch) => {
    await gamesAPI.addGames(gamesData)
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
}

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof gamesActions>
type ThunkType = BaseThunkType<ActionsType>
type GamesDataType = {
    _id: string,
    name: string,
    fullName: string
}