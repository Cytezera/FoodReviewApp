import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const discovery = { 
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenEndpoint: "https://oauth2.googleapps.com/token",
}

export function useGoogleOAuth() { 
    const redirectUri = AuthSession.makeRedirectUri({ scheme: "leftoversapp"})

    const [ request, response, promptAsync ] = AuthSession.useAuthRequest({
        clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID!,
        redirectUri, 
        responseType: AuthSession.ResponseType.Code,
        scopes: [ "openid", "email", "profile"],
        usePKCE: true,
    },
    discovery
    );
    return { request, response, promptAsync, redirectUri }

};

