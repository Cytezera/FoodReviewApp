import { SplashScreenController } from '@/components/splash';
import { SessionProvider, useSession } from '@/contexts/AuthContext';
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
    <SessionProvider>
      <SplashScreenController/>
      <RootNavigator/>
    </SessionProvider>
  )
}
