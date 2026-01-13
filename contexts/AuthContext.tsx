import { fetchUserJWT, loginUser } from '@/services/authService';
import { LoginCredential, User } from '@/types/user';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, type PropsWithChildren } from 'react';

import { useStorageState } from '@/hooks/useStorageState';



const AuthContext = createContext<{
  signIn: (loginCredential: LoginCredential) => Promise<any>;
  signOut: () => void;
  session?: string | null;
  user? : User | null;
  isLoading: boolean;
}>({
  signIn: (loginCredential: LoginCredential ) => {
    return Promise.resolve(null)
  },
  signOut: () => null,
  session: null,
  user: null,
  isLoading: false,
});

// Use this hook to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return value;
}
const useAuthUser = (token:string | null) => {
    return useQuery({
      queryKey: ['auth-user', token],
      queryFn: async () => {
        if (!token ) return null 
        const result = await fetchUserJWT(token)
        if (!result.success) throw new Error('Inavlid session')
        return result.data.user
      },
      enabled: !!token,
    })
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoadingStorage, session], setSession] = useStorageState('session');
  const { data:user, isLoading, isError } = useAuthUser(session)
  if (isError && session ){
    setSession(null)
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        user: user ?? null,
        isLoading: isLoadingStorage || isLoading,
        signIn: async (cred ) => {
          const result = await loginUser(cred)
          if (result.success){
            setSession(result.data.token)
          }
          return result 
        },
        signOut: () => setSession(null)
      }}
      > 
      {children}
      </AuthContext.Provider>
  )
}