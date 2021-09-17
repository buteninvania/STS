import {BaseThunkType, InferActionsTypes} from './redux-store'
import {teamsAPI} from "../api/teams-api";
import {TeamDataFormType} from "../forms/AddTeamForm";

const initialState : {teams: TeamDataType[]} = {
    teams: [],
}

export const teamDataReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "ButInProject/team-page/SET-TEAMS":
            return {
                ...state,
                teams: [...action.teams]
            }
        default:
            return state
    }
}

export const teamsActions = {
    setTeams: (teams: []) => ({
        type: "ButInProject/team-page/SET-TEAMS",
        teams
    } as const),
}

export const getTeamsThunk = ():ThunkType => async (dispatch) => {
        await teamsAPI.getTeams()
            .then(res => {
                const teams = res.teams
                dispatch(teamsActions.setTeams(teams))
            })
            .catch(err => console.log(err))
}

export const addTeamsThunk = (teamData: TeamDataFormType):ThunkType => async (dispatch) => {
    await teamsAPI.sendEventTeamAdmin(teamData)
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
}

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof teamsActions>
type ThunkType = BaseThunkType<ActionsType>
type TeamDataType = {
    _id: string,
    name: string,
    fullName: string
}