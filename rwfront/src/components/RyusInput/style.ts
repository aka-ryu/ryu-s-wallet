import {Platform, StyleSheet} from 'react-native';

export default StyleSheet.create({
  inputLayer: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
  errorLayer: {
    height: 20,
  },
  inputStyle: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  labelStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    paddingLeft: 5,
  },
  errorText: {
    color: 'red',
  },
});
