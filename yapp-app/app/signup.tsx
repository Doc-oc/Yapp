import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const Signup = () => {

  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
      // TODO: Integrate Firebase Auth here
      // Example:
      // await signInWithEmailAndPassword(auth, email, password);
      console.log('Signing up with:', email, password);

      // Navigate to main app screen (replace with your actual route)
      router.push('/');
    } catch (error: any) {
      Alert.alert('Sign up Error', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-3xl font-bold text-center mb-10">Yapp</Text>
        <TextInput
            placeholder="Name"
            className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
            value={name}
            onChangeText={setName}
            />
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
        onPress={handleSignup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-center text-base font-medium">Sign up</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Signup;
