import { useLocationContext } from '@/contexts/LocationContext'
import { Text, View } from 'react-native'

export default function ExplorePage() {
  const { location, address, errorMsg, loading } = useLocationContext()

  return (
    <View style={{ padding: 20 }}>
      {errorMsg && <Text>{errorMsg}</Text>}
      {loading && <Text>Getting your location...</Text>}
      {address && (
        <>
          <Text>📍 You are at:</Text>
          <Text>
            {address.city ?? address.subregion ?? 'Unknown city'}, 
            {address.region ?? 'Unknown region'}, 
            {address.country ?? 'Unknown country'}
          </Text>
        </>
      )}
    </View>
  )
}
