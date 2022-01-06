import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {gamesAPI} from "../api/games-api";
import {GameCreationFormValuesInterface} from "../components/games/GameCreation";
import {getDataUserThunk} from './user-data-page';
import {getPlaygroundsThunk} from './playgrounds-page';

const initialState : {games: GamesDataType[]} = {
    games: [],
}

export const gamesDataReducer = (state = initialState, action: ActionsType): InitialStateType => {
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
    setGames: (games: []) => ({
        type: "ButInProject/games-page/SET-GAMES",
        games
    } as const),
}

export const getGamesThunk = ():ThunkType => async (dispatch) => {
        await gamesAPI.getGames()
            .then(res => {
                dispatch(gamesActions.setGames(res))
            })
            .catch(err => console.log(err))
}

export const sendEventAddedGamesThunk = (gamesData: GameCreationFormValuesInterface, playgroundId: any):ThunkType => async (dispatch) => {
    const eventAddedGames: EventGamesDataType = {
        type: "game",
        playground: playgroundId.name,
        gameType: gamesData.gameType,
        userTeam: gamesData.myTeam,
        VS: gamesData.VS,
        enemyTeam: gamesData.enemyTeam,
        date: gamesData.date
    }

    await gamesAPI.addGames(eventAddedGames)
       .then(res => {
           console.log(res)
       })
       .catch(err => console.log(err))
}

export const deleteGamesThunk = (playgroundID: string, gameID: string): ThunkType => async (dispatch) => {
    await gamesAPI.deleteGame(playgroundID, gameID)
        .then(res => {
            debugger
            dispatch(getPlaygroundsThunk())
        })
}

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof gamesActions>
type ThunkType = BaseThunkType<ActionsType>
type GamesDataType = {
    _id: string,
    gameType: string
    myTeam: string
    VS: string
    enemyTeam: string
}
export type EventGamesDataType = {
    type: string,
    playground: string,
    gameType: string,
    userTeam: string,
    VS: string,
    enemyTeam: string,
    date: string
}
