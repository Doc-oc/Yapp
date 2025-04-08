import React, {useEffect,  useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Audio, AVPlaybackStatus, AVPlaybackStatusSuccess } from 'expo-av';

const MAX_DURATION = 60; // seconds

const AudioRecorder = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ title: 'Yapp' });
  }, [navigation]);

  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [progress, setProgress] = useState(0)

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Request permission
  const requestPermission = async () => {
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to use microphone is required!');
    }
  };

  const startRecording = async () => {
    try {
      await requestPermission();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);

      // Limit recording to 60 seconds
      timerRef.current = setTimeout(() => {
        stopRecording();
      }, MAX_DURATION * 1000);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    try {
      if (recording) {
        clearTimeout(timerRef.current!);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setAudioUri(uri || null);
        setRecording(null);
        console.log('Recorded URI:', uri);
      }
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  const playSound = async () => {
    if (!audioUri) return;

    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true }
      );

      setSound(sound);
      setIsPlaying(true);

      sound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
        if (status.isLoaded) {
          const s = status as AVPlaybackStatusSuccess;
          const duration = s.durationMillis ?? 1; // avoid divide by 0
          setProgress(s.positionMillis / duration);
          if (!s.isPlaying) setIsPlaying(false);
        }
      });

      await sound.playAsync();
    } catch (err) {
      console.error('Failed to play sound', err);
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  return (
    <View style={styles.container}>
      {!recording ? (
        <Button title="Start Recording" onPress={startRecording} />
      ) : (
        <Button title="Stop Recording" onPress={stopRecording} />
      )}

      {audioUri && (
        <View style={{ marginTop: 20 }}>
          <Text>Preview:</Text>
          <Button
            title={isPlaying ? 'Stop Playback' : 'Play Recording'}
            onPress={isPlaying ? stopSound : playSound}
          />
        </View>
      )}

    </View>
  );
};

export default AudioRecorder;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});