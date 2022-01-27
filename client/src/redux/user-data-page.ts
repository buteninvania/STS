import {BaseThunkType, InferActionsTypes} from './redux-store'
import {RegisterFormsValuesType} from "../forms/RegisterForm";
import {authAPI} from "../api/auth-api";
import {playgroundsAPI} from "../api/playgrounds-api";
import {teamsAPI} from "../api/teams-api";
import {notificationApi} from '../api/notification-api';

const initialState = {
    userData: null as UserDataType | null,
}

export const userDataReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "ButInProject/user-data/SET-USER-DATA":
            return {
                ...state,
                userData: action.userData
            }
        case "ButInProject/user-data/LOGOUT":
            return {
                ...state,
                userData: action.userData
            }
        default:
            return state
    }
}

export const authActions = {
    setIsAuth: (userData: UserDataType) => ({
        type: "ButInProject/user-data/SET-USER-DATA",
        userData
    } as const),
    logout: () => ({
        type: "ButInProject/user-data/LOGOUT",
        userData: null
    } as const),
}

export const registerThunk = (values: RegisterFormsValuesType): ThunkType => async (dispatch) => {
    await authAPI.register(values)
        .then(res => {
            localStorage.setItem('token', res.token)
            dispatch(getDataUserThunk())
        })
        .catch(err => console.log(err))
}

export const loginThunk = (values: RegisterFormsValuesType): ThunkType => async (dispatch) => {
    await authAPI.login(values)
        .then(res => {
            localStorage.setItem('token', res.token)
            dispatch(getDataUserThunk())
        })
        .catch(err => console.log(err))
}

export const getDataUserThunk = (): ThunkType => async (dispatch) => {
    await authAPI.checkAuth()
        .then(res => {
            debugger
            const userData: UserDataType = {
                isAuth: true,
                userPlayground: res.playground,
                avatar: null,
                userTeam: {
                    teamName:res.team,
                    teamAvatar: null
                },
                userName: res.name,
                notifications: res.notifications
            }
            dispatch(authActions.setIsAuth(userData))
        })
        .catch(err => console.log(err))
}

export const addFavoritePlayground = (userName: string | undefined, playgroundName: string): ThunkType => async (dispatch) => {
    await playgroundsAPI.addFavoritePlayground(userName, playgroundName)
        .then(res => {
            console.log(res)
            dispatch(getDataUserThunk())
        })
        .catch(err => console.log(err))
}

export const addFavoriteTeams = (userName: string | undefined, teamId: string): ThunkType => async (dispatch) => {
    await teamsAPI.addFavoriteTeam(userName, teamId)
        .then(res => {
            console.log(res)
            dispatch(getDataUserThunk())
        })
        .catch(err => console.log(err))
}

export const deleteNotificationThunk = (userName:string, notificationID: string): ThunkType => async (dispatch) => {
    await notificationApi.deleteNotification(userName, notificationID)
        .then(res => {
            dispatch(getDataUserThunk())
        })
        .catch(err => {

        })
}

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof authActions>
type ThunkType = BaseThunkType<ActionsType>
export type UserDataType = {
    isAuth: true,
    userPlayground: string | null,
    avatar: string | null,
    userTeam: UserTeamType | null
    userName: string
    notifications: Array<NotificationType>
}
type UserTeamType = {
    teamAvatar: string | null,
    teamName: string
}

export type NotificationType = {
    VS: string
    date: string
    enemyTeam: string
    gameType: string
    playground: string
    userTeam: string
    _id: string
}
