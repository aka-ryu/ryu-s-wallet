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
}
const RyusInput = (props: RyusInputProps) => {
  const {readonly, placeholder, placeholderStyle, errText, password} = props;
  return (
    <View style={style.inputContainer}>
      <View style={style.inputLayer}>
        <TextInput
          style={style.inputStyle}
          placeholder={placeholder}
          editable={readonly}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={style.errorLayer}></View>
    </View>
  );
};

export default RyusInput;
