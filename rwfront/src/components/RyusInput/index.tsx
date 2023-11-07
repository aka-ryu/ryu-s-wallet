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
  maxLength?: number;
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
    maxLength,
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
          maxLength={maxLength}
        />
      </View>
      <View style={style.errorLayer}>
        {errText && <Text style={style.errorText}>{errText}</Text>}
      </View>
    </View>
  );
};

export default RyusInput;
