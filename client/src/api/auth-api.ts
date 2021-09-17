import {instance} from './api'
import {RegisterFormsValuesType} from "../forms/RegisterForm";

export const authAPI = {
    register(values: RegisterFormsValuesType) {
        return instance.post(`api/auth/register`, values, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.data.data)
    },
    login(values: RegisterFormsValuesType) {
        return instance.post(`api/auth/login`, values, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.data.data)
    },
    checkAuth() {
        return instance.get(`api/auth/data`, {
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then(res => res.data.data)
    }
}