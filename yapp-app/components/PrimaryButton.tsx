// components/PrimaryButton.tsx

import { Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

const StyledButton = styled(TouchableOpacity);
const StyledText = styled(Text);

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <StyledButton
      className={`bg-gray-900 px-20 py-5 rounded-lg mb-5 ${disabled ? 'opacity-50' : ''}`}
      onPress={onPress}
      disabled={disabled}
    >
      <StyledText className="text-white text-center font-semibold">{title}</StyledText>
    </StyledButton>
  );
}
