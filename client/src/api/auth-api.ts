import {instance} from './api'
import {RegisterFormsValuesType} from '../forms/RegisterForm'
import {NotificationType} from '../redux/user-data-page'

interface ServerResponseDataRegistration {
    name: string
    message: string
    token: string
}

interface ServerResponseDataLogin extends ServerResponseDataRegistration {
    playground: string
}

interface ServerResponseDataAuthorization {
    avatar: string
    id: string
    name: string
    notifications: Array<NotificationType>
    team: string
    playground: string
}

/**
 * Authorization API (registration, login, authorization)
 */
export const authAPI = {
    /**
     * @param values - data from the form (password and login)
     * registration request and in the response we must receive user data
     */
    register(values: RegisterFormsValuesType) {
        return instance.post<ServerResponseDataRegistration>(`api/auth/register`, values)
            .then(res => res.data)
    },

    /**
     *
     * @param values - data from the form (password and login)
     * login request and in the response we must receive user data
     */
    login(values: RegisterFormsValuesType) {
        return instance.post<ServerResponseDataLogin>(`api/auth/login`, values)
            .then(res => res.data)
    },

    /**
     * Checking and getting user data by token
     */
    checkAuth() {
        return instance.get<ServerResponseDataAuthorization>(`api/auth/data`, {
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then(res => res.data)
    }
}