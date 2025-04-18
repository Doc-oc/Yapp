import {Button, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import PrimaryButton from '@/components/PrimaryButton';

export default function Home() {
  const router = useRouter();
  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <View style={{
      flex: 1, 
      alignItems: 'center',
      justifyContent: 'center', 
    }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 100 }}>
        Welcome to Yapp
      </Text>
      <PrimaryButton
        title="Log In"
        onPress={handleLogin}
      />
      <Text style={{ marginTop: 20, fontSize: 16 }}>
        Don't have an account?
      </Text>
        <TouchableOpacity onPress={() => router.push('/signup')}>
          <Text style={{ color: 'green' }}> Sign Up</Text>
        </TouchableOpacity>
    </View>
  );
}

