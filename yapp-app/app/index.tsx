import {Text, View } from 'react-native';
import { useRouter } from 'expo-router';

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
      <Text className="text-3xl font-bold text-center mt-20">Welcome to Yapp 🎙️</Text>
    </View>
  );
}

