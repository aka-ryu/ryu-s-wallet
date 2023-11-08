import Clipboard from '@react-native-clipboard/clipboard';
import {Alert} from 'react-native';

export const copyText = (text: string) => {
  Clipboard.setString(text);
  Alert.alert('알림', '클립보드에 복사되었습니다.');
};
