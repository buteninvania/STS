import axios from 'axios'

export const instance = axios.create({
    headers:{},
    baseURL: `http://localhost:5000/`
})