import pb from '@/services/pocketbase';

export const loginUser = async(email:string, password: string ) => {
    try{
        const authData = await pb.collection('users').authWithPassword(email,password);
        return { success : true , user: authData.record , token: pb.authStore.token }
    }catch (err){
        console.log("Login failed", err)
        return { success: false }
    }

}