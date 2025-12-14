import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

type LoadingProps = {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
};

export const Loading = ({ message = 'Loading...', size = 'large', color = '#007AFF' }: LoadingProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {message ? <Text style={styles.text}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject, // full screen overlay
    backgroundColor: 'rgba(0,0,0,0.2)', // semi-transparent overlay
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
});
