import { loginUser } from '@/services/authService';
import { LoginCredential } from '@/types/user';

import { User } from '@/types/user';
import { createContext, useContext, useState, type PropsWithChildren } from 'react';

import { useStorageState } from '@/hooks/useStorageState';



const AuthContext = createContext<{
  signIn: (loginCredential: LoginCredential) => void;
  signOut: () => void;
  session?: string | null;
  user? : User | null;
  isLoading: boolean;
}>({
  signIn: (loginCredential: LoginCredential ) => null,
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

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [ user , setUser ] = useState<User | null>(null);

  // useEffect(() => {
  //   if (!session) return; 

  //   pb.authStore.save(session,null);
  //   if (pb.authStore.isValid) {
  //     const currentUser = pb.authStore.model as User;
  //     setUser(currentUser);
  //   }
  // },[session])

  return (
    <AuthContext.Provider
      value={{
        signIn: async (loginCredential: LoginCredential) => {
          const result = await loginUser(loginCredential)
          
          if (result.success){
            setSession(result.data.token);
            setUser(result.data.user)
            return  ({ success: true })
          }
          if (!result.success){
            console.log(result.data.error)
            return ({ success: false , error: result.data.error }) 
          }
          
        },
        signOut: () => {
          setSession(null);
          setUser(null);
        },
        session,
        user,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
