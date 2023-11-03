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
  buttonColor?: string;
  textColor?: string;
  disabled?: boolean;
  width?: number;
  height?: number;
  loading?: boolean;
  marginTop?: number;
}

const RyusButton = (props: RyusButtonProps) => {
  const {
    onPress,
    text,
    buttonColor,
    textColor,
    disabled,
    width,
    height,
    marginTop,
  } = props;

  const dynamicButtonStyle = [
    style.buttonStyle,
    disabled ? {opacity: 0.5} : null,
    marginTop ? {marginTop: marginTop} : null,
    buttonColor ? {backgroundColor: buttonColor} : null,
  ];

  const dynamicTextStyle = [
    style.textStyle,
    textColor ? {color: textColor} : null,
  ];

  return (
    <TouchableOpacity
      style={dynamicButtonStyle}
      onPress={onPress}
      disabled={disabled}>
      <Text style={dynamicTextStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default RyusButton;
