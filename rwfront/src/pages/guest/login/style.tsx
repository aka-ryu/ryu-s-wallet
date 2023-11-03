import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  Container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    backgroundColor: 'red',
  },
  textLayer: {
    backgroundColor: 'blue',
    alignItems: 'center',
    paddingTop: 50,
  },
  text: {
    fontSize: 20,
  },
  inputLayer: {
    flex: 1,
    height: 100,
    backgroundColor: 'yellow',
    paddingTop: 40,
  },
  buttonLayer: {
    flex: 1,
    backgroundColor: 'green',
    paddingTop: 40,
  },
});
