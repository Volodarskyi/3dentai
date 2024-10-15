import {configClient} from "../configClient/configClient";

class FetchService {
    headers = undefined

    constructor() {
        this.headers = {"Content-Type": "application/json"}
    }

    get = async (requestUrl) => {
        const headers = this.headers
        const token = localStorage.getItem(configClient.TOKEN_ITEM_NAME)
        if(token){
            headers.Authorization = `Bearer ${token}`
        }
        const method = "GET"

        const res = await fetch(requestUrl, {method, headers})

        if(res.status === 401){

        }

        return res
    }

    post = async (requestUrl, reqObj) => {
        const headers = this.headers
        const token = localStorage.getItem(configClient.TOKEN_ITEM_NAME)
        if(token){
            headers.Authorization = `Bearer ${token}`
        }
        const method = "POST"
        const body = JSON.stringify(reqObj)

        return await fetch(requestUrl, {method, body, headers})
    }

    put = async (requestUrl, reqObj) => {
        const headers = this.headers
        const token = localStorage.getItem(configClient.TOKEN_ITEM_NAME)
        if(token){
            headers.Authorization = `Bearer ${token}`
        }
        const method = "PUT"
        const body = JSON.stringify(reqObj)

        return await fetch(requestUrl, {method, body, headers})
    }

    delete = async (requestUrl) => {
        const headers = this.headers
        const token = localStorage.getItem(configClient.TOKEN_ITEM_NAME)
        if(token){
            headers.Authorization = `Bearer ${token}`
        }
        const method = "DELETE"

        return await fetch(requestUrl, {method, headers})
    }
}

export const fetchService = new FetchService();
