import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function UnderConstructionScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/565/565547.png' }} // construction icon
        style={styles.image}
      />
      <Text style={styles.title}>🚧 Under Construction 🚧</Text>
      <Text style={styles.subtitle}>
        We're working hard to bring you something awesome! Stay tuned.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});
