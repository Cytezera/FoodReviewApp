import { LoginCredential } from "@/types/user";
const API_URL = process.env.EXPO_PUBLIC_API_URL


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
            return { success: false, data}
        }
        return { success: true , data }

    }catch (err){
        console.log("Login failed", err)
        return { success: false }
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
            return{ success: false, data}
        }
        return { success: true , data}
    }catch(err){
        console.log("Login thourgh jwt failed ", err)
        return { success: false }
    }
}

export const loginWithhGoogleOAuthCode = async ({ 
    code, 
    redirectUri,
    codeVerfier, 
}:{ 
    code: String;
    redirectUri: String;
    codeVerfier: String;}) => { 

    const res = await fetch(`${API_URL}/api/users/oauth/google`,{ 
        method: 'POST',
        headers:{ 
            'Content-Type' : "application/json",
        },
        body: JSON.stringify({ 
            code, redirectUri, codeVerfier}),
        
    })
    
    const data = await res.json();

    if (!res.ok){ 
        return { success: false, data};
    }
    return { success: true, data};
    
}