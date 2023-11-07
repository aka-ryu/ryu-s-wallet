import {ActivityIndicator, Alert, Modal, Text, View} from 'react-native';

interface RyusModalProps {
  visible: boolean;
}
const LoadingModal = (props: RyusModalProps) => {
  const {visible} = props;
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            alignItems: 'center',
            shadowColor: '#000',
          }}>
          <Text style={{marginBottom: 15, textAlign: 'center'}}>
            잠시만 기다려주세요...
          </Text>
          <ActivityIndicator size="large" color={'black'} />
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;
