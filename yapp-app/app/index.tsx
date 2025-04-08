import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import AudioRecorder from '../components/AudioRecorder';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AudioRecorder />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
