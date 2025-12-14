import { Loading } from '@/components/ui/Loading';
import { useSession } from '@/contexts/AuthContext';
import { router, Slot } from 'expo-router';
import { useEffect } from 'react';

export default function AuthLayout() {
  const { session, isLoading } = useSession();

  useEffect(() => {
    if (!isLoading) {
      if (!session) {
        router.replace('/(auth)/sign-in');
      } else {
        router.replace('/(app)'); 
      }
    }
  }, [session, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return <Slot />; 
}
