import pb from '@/services/pocketbase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser = async(email:String, password: String ) => {
    try{
        const authData = await pb.collection('users').authWithPassword(email,password);
        await AsyncStorage.setItem('pb_token', pb.authStore.token);
        await AsyncStorage.setItem('user_id', authData.record.id);
        return { success : true , user: authData.recordl}
    }catch (err){
        console.log("Login failed", err)
        return { success: false }
    }

}