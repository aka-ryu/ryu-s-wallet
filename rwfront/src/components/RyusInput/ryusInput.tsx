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
}
const RyusInput = (props: RyusInputProps) => {
  const {
    readonly,
    placeholder,
    placeholderStyle,
    errText,
    password,
    inputWidth,
  } = props;
  return (
    <View
      style={[style.inputContainer, {width: inputWidth ? inputWidth : '100%'}]}>
      <View style={[style.inputLayer]}>
        <TextInput
          style={[style.inputStyle, {width: inputWidth ? inputWidth : '100%'}]}
          placeholder={placeholder}
          editable={readonly}
          secureTextEntry={password}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={style.errorLayer}></View>
    </View>
  );
};

export default RyusInput;
