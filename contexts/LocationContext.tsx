import * as Location from "expo-location";
import { createContext, useContext, useEffect, useState } from "react";

type LocationContextType = {
  location: Location.LocationObject | null;
  address: Location.LocationGeocodedAddress | null;
  errorMsg: string | null;
  loading: boolean;
  refetchLocation: () => void;
};

const LocationContext = createContext<LocationContextType>({
  location: null,
  address: null,
  errorMsg: null,
  loading: true,
  refetchLocation: () => {},
});

export const LocationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [address, setAddress] =
    useState<Location.LocationGeocodedAddress | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchLocation = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Location permission denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLocation(currentLocation);

      const [place] = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
      setAddress(place);
    } catch (err) {
      setErrorMsg("Failed to get Location");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  // useEffect(() => {
  //   let isMounted = true;
  //   (async () => {
  //     try {
  //       const { status } = await Location.requestForegroundPermissionsAsync();
  //       if (status !== "granted") {
  //         if (isMounted) setErrorMsg("Location permission denied ");
  //         return;
  //       }
  //       const currentLocation = await Location.getCurrentPositionAsync({
  //         accuracy: Location.Accuracy.Balanced,
  //       });

  //       if (!isMounted) return;
  //       setLocation(currentLocation);

  //       const [place] = await Location.reverseGeocodeAsync({
  //         latitude: currentLocation.coords.latitude,
  //         longitude: currentLocation.coords.longitude,
  //       });
  //       if (!isMounted) return;
  //       setAddress(place);
  //     } catch (err) {
  //       if (isMounted) setErrorMsg("Failed to get Location");
  //     } finally {
  //       if (isMounted) setLoading(false);
  //     }
  //   })();
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  return (
    <LocationContext.Provider
      value={{
        location,
        address,
        errorMsg,
        loading,
        refetchLocation: fetchLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => useContext(LocationContext);
