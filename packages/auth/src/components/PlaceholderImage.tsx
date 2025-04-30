import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface PlaceholderImageProps {
  width: number;
  height: number;
  text?: string;
  backgroundColor?: string;
  textColor?: string;
}

/**
 * A component that renders a placeholder image with customizable size, color, and text
 */
const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  width,
  height,
  text = 'Placeholder',
  backgroundColor = '#1E88E5',
  textColor = '#FFFFFF',
}) => {
  return (
    <View
      style={[
        styles.container,
        {width, height, backgroundColor},
      ]}>
      <Text style={[styles.text, {color: textColor}]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 8,
  },
});

export default PlaceholderImage;
