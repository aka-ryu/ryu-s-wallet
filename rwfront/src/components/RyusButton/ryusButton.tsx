import {
  Alert,
  GestureResponderEvent,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import style from './style';

interface RyusButtonProps {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  text: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  width?: number;
  height?: number;
  loading?: boolean;
}

const RyusButton = (props: RyusButtonProps) => {
  const {onPress, text, buttonStyle, textStyle, disabled, width, height} =
    props;

  const dynamicButtonStyle = [
    buttonStyle ? buttonStyle : style.buttonStyle,
    disabled ? {opacity: 0.5} : null,
  ];

  return (
    <TouchableOpacity
      style={dynamicButtonStyle}
      onPress={onPress}
      disabled={disabled}>
      <Text style={textStyle ? textStyle : style.textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default RyusButton;
