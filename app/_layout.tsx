import { queryClient } from "@/app/providers/QueryClient";
import { SplashScreenController } from "@/components/splash";
import { SessionProvider, useSession } from "@/contexts/AuthContext";
import { LocationProvider } from "@/contexts/LocationContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
// If using Expo Router, import your CSS file in the app/_layout.tsx file

// export const unstable_settings = {
//   anchor: '(tabs)',
// };

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

function RootNavigator() {
  const { session } = useSession();
  return (
    <Stack>
      <Stack.Protected guard={!!session}>
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <LocationProvider>
          <SplashScreenController />
          <RootNavigator />
        </LocationProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
