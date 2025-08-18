import { INewUser } from "@/types";
import { fetchApi } from "@/lib/utils";


export const createUserAccount = async (user: INewUser) => {
    const response = await fetchApi('/auth/register', 'POST', user)

    return response
}

export const signInAccount = async (user: { username: string; password: string }) => {
    const response = await fetchApi('/auth/login', 'POST', user)

    return response
}

export const refreshToken = async () => {
    const response = await fetchApi('/auth/refresh', 'POST')

    return response
}


export const signOutAccount = async () => {
    const response = await fetchApi("/auth/logout", 'POST')

    return response
}

export const getCurrentUser = async (token?: string | null) => {
    const response = await fetchApi('/user/profile', 'GET', undefined, token)

    return response.data
}