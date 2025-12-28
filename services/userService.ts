
import { UpdateUser } from '@/types/user'
const API_URL = process.env.EXPO_PUBLIC_API_URL

export async function updateUser (user:UpdateUser ){
    console.log(user)
    try{
        const res = await fetch(`${API_URL}/api/users/update/${user.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(user)
        })
        const data = await res.json()
        if (!res.ok){
            return { success: false, data }
        }
        return { success: true , data }

    }catch(e: any){
        console.error("Failed to update user ", e )

        return ({
            success: false,
            errors: e.data
        })
    }

}