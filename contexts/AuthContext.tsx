import { loginUser } from "@/services/authService";
import pb from "@/services/pocketbase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children } : {children: ReactNode}) => {
    const [user, setUser ] = useState(null)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const load = async() => {
            const token = await AsyncStorage.getItem('pb_token');
            if (token) {
                pb.authStore.save(token,{});
                setUser(pb.authStore.model);
            }
        }
        load();
    },[])

    const login = async (email:string, password:string) => {
        const auth = await loginUser(email,password);
        if (auth.success){
            setUser(auth.user.authRecord)
            return true 
        }
        return false 
    }
    const logout = async () => {
        await AsyncStorage.removeItem('pb_token');
        pb.authStore.clear()
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider> 
    )

}
export function useAuth() {
    return useContext(AuthContext);
}