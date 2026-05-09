import { LoginCredential } from "@/types/user"

const API_URL = process.env.EXPO_PUBLIC_API_URL

export type OAuthProvider = "google" | "apple"

type OAuthLoginParams = {
    provider: OAuthProvider
    idToken: string
    name?: string
}

export const loginUser = async(loginCredential: LoginCredential ) => {
    try{
        const res = await fetch(`${API_URL}/api/users/login`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginCredential)
        })

        const data = await res.json()
        if(!res.ok){
            return { success: false, data, error: data?.error || data?.message }
        }
        return { success: true , data }

    }catch (err){
        console.log("Login failed", err)
        return { success: false, error: "Unable to reach login server" }
    }

}

export const loginWithOAuth = async({ provider, idToken, name }: OAuthLoginParams) => {
    try{
        const res = await fetch(`${API_URL}/api/users/oauth/login`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ provider, idToken, name })
        })

        const data = await res.json()
        if(!res.ok){
            return { success: false, data, error: data?.error || data?.message }
        }
        return { success: true , data }

    }catch (err){
        console.log("OAuth login failed", err)
        return { success: false, error: "Unable to reach OAuth login server" }
    }
}

export const fetchOAuthConfig = async() => {
    try{
        const res = await fetch(`${API_URL}/api/users/oauth/config`)
        const data = await res.json()
        if(!res.ok){
            return { success: false, data, error: data?.error || data?.message }
        }
        return { success: true , data }
    }catch(err){
        console.log("OAuth config fetch failed", err)
        return { success: false, error: "Unable to fetch OAuth config" }
    }
}

export const fetchUserJWT = async(session: string ) => {
    try{
        const res = await fetch(`${API_URL}/api/users/me`,  {
            method: 'POST',
            headers:{
                'Authorization': `${session}`,
            }
        })
        const data = await res.json()
        if(!res.ok){
            return{ success: false, data, error: data?.error || data?.message }
        }
        return { success: true , data}
    }catch(err){
        console.log("Login thourgh jwt failed ", err)
        return { success: false, error: "Unable to fetch session" }
    }
}
