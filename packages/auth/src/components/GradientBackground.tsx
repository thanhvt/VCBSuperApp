import React from 'react';
import {StyleSheet, View} from 'react-native';

interface GradientBackgroundProps {
  children: React.ReactNode;
  colors?: string[];
}

/**
 * A component that renders a background with the first color in the colors array
 * Note: This is a simplified version without actual gradient
 */
const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  colors = ['#0D47A1', '#1976D2', '#42A5F5'],
}) => {
  // Using the first color as the background color
  return (
    <View style={[styles.container, {backgroundColor: colors[0]}]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default GradientBackground;
