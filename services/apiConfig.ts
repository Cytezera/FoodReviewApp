import Constants, { ExecutionEnvironment } from "expo-constants";

const configuredApiUrl = process.env.EXPO_PUBLIC_API_URL?.trim();

export function getApiBaseUrl() {
  if (!configuredApiUrl) {
    throw new Error(
      "EXPO_PUBLIC_API_URL is not set. Set it to the backend URL reachable from your device, e.g. http://10.0.2.2:9000 for the Android emulator or http://<your-lan-ip>:9000 for Expo Go on a physical device.",
    );
  }

  return configuredApiUrl.replace(/\/$/, "");
}

export function apiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}

export function getNetworkErrorMessage(target = "server") {
  let apiBaseUrl = "the configured API URL";

  try {
    apiBaseUrl = getApiBaseUrl();
  } catch (error) {
    return error instanceof Error ? error.message : `Unable to reach ${target}`;
  }

  const isExpoGo =
    Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
  const expoGoHint = isExpoGo
    ? " In Expo Go, localhost points at the phone, not your computer; use your machine LAN IP and make sure the backend listens on 0.0.0.0."
    : "";

  return `Unable to reach ${target} at ${apiBaseUrl}. Check that the backend is running and that EXPO_PUBLIC_API_URL is reachable from this device.${expoGoHint}`;
}
