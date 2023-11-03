import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  Container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
  },
  textLayer: {
    alignItems: 'center',
    paddingTop: 50,
  },
  text: {
    fontSize: 20,
  },
  inputLayer: {
    flex: 1,
    paddingTop: 40,
  },
  buttonLayer: {
    flex: 1,
    paddingTop: 150,
  },
  textButtonLayer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  textButtonStyle: {
    fontSize: 15,
    textDecorationLine: 'underline',
  },

  textButtonSizs: {
    width: 100,
    height: 40,
  },
});
