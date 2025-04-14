import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const Login = () => {

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // TODO: Integrate Firebase Auth here
      // Example:
      // await signInWithEmailAndPassword(auth, email, password);
      console.log('Logging in with:', email, password);

      // Navigate to main app screen (replace with your actual route)
      router.push('/login');
    } catch (error: any) {
      Alert.alert('Login Error', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-3xl font-bold text-center mb-10">Yapp</Text>

      <TextInput
        placeholder="Email"
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        className="border border-gray-300 rounded-lg px-4 py-3 mb-6 text-base"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        className="bg-black py-3 rounded-lg"
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-center text-base font-medium">Log In</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Login;
