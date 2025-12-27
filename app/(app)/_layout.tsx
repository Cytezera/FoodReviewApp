import { Stack } from 'expo-router';

export default function AppLayout(){
    // return(
    //     <Stack>

    //         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    //         <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />

    //     </Stack>
    // )
    return (
        <Stack>
            <Stack.Screen name ="(tabs)" options = {{ headerShown: false }} />
            <Stack.Screen name="temp" options={{ headerShown: false }} />
            <Stack.Screen name ="settings" options = {{ headerShown: false }} />
            <Stack.Screen name = "edit-profile" options = {{ headerShown:false }}/>
            
        </Stack>
    )
}