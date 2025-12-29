import { queryClient } from '@/app/providers/QueryClient';
import { SplashScreenController } from '@/components/splash';
import { SessionProvider, useSession } from '@/contexts/AuthContext';
import { QueryClientProvider } from '@tanstack/react-query';


import { Stack } from 'expo-router';

// export const unstable_settings = {
//   anchor: '(tabs)',
// };

function RootNavigator(){
  const { session } = useSession();
  return (
    <Stack>
        <Stack.Protected guard={!!session}>
            {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}
            <Stack.Screen name="(app)" options= {{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!session}>
          <Stack.Screen name ="(auth)" options={{ headerShown:false }} />
        </Stack.Protected>
    </Stack>
  )

}

export default function Root(){
  return(
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <SplashScreenController/>
        <RootNavigator/>
      </SessionProvider>
      </QueryClientProvider>
  )
}
