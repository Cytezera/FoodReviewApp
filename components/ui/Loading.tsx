import { Colors } from '@/constants/theme'; // adjust path
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

type LoadingProps = {
  message?: string;
  size?: 'small' | 'large';
};

export const Loading = ({
  message = 'Loading...',
  size = 'large',
}: LoadingProps) => {
  const theme = useColorScheme();
  const colors = Colors[theme ?? 'light'];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background }, // white or dark
      ]}
    >
      <ActivityIndicator size={size} color={colors.tint} />
      {message ? (
        <Text style={[styles.text, { color: colors.tint }]}>
          {message}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
  },
});