import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
} from 'react-native';

type Props = {
  data: number[]; // normalized amplitudes
  progress: number; // playback progress (0 to 1)
  barColor?: string;
  barWidth?: number;
  barHeight?: number;
};

const WaveformVisualizer = ({
  data,
  progress,
  barColor = '#333',
  barWidth = 2,
  barHeight = 60,
}: Props) => {
  const animatedValues = useRef(data.map(() => new Animated.Value(1))).current;

  useEffect(() => {
    const currentIndex = Math.floor(progress * data.length);

    animatedValues.forEach((value, i) => {
      const targetScale = i === currentIndex ? 1.5 : 1;
      Animated.timing(value, {
        toValue: targetScale,
        duration: 100,
        useNativeDriver: true,
      }).start();
    });
  }, [progress]);

  return (
    <View style={styles.container}>
      {data.map((amplitude, i) => (
        <Animated.View
          key={i}
          style={{
            width: barWidth,
            height: barHeight,
            marginHorizontal: 1,
            backgroundColor: barColor,
            transform: [
              { scaleY: Animated.multiply(animatedValues[i], amplitude) },
            ],
            borderRadius: barWidth / 2,
          }}
        />
      ))}
    </View>
  );
};

export default WaveformVisualizer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
