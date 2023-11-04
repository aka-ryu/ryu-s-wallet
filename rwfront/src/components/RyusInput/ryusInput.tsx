import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';
import style from './style';

interface RyusInputProps extends TextInputProps {
  readonly?: boolean;
  placeholder?: string;
  placeholderStyle?: StyleProp<TextStyle>;
  errText?: string;
  password?: boolean;
  inputWidth?: number;
  label?: string;
  value: string;
}
const RyusInput = (props: RyusInputProps) => {
  const {
    readonly,
    label,
    placeholder,
    placeholderStyle,
    errText,
    password,
    inputWidth,
    onChangeText,
    value,
  } = props;
  return (
    <View style={[{width: inputWidth ? inputWidth : '100%'}]}>
      {label && <Text style={style.labelStyle}>{label}</Text>}
      <View style={[style.inputLayer]}>
        <TextInput
          style={[style.inputStyle, {width: inputWidth ? inputWidth : '100%'}]}
          placeholder={placeholder}
          editable={readonly}
          secureTextEntry={password}
          underlineColorAndroid="transparent"
          onChangeText={onChangeText}
          value={value}
        />
      </View>
      <View style={style.errorLayer}></View>
    </View>
  );
};

export default RyusInput;
