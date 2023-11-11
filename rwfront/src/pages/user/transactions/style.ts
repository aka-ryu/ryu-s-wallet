import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  txCard: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    height: 120,
    padding: 10,
    marginBottom: 10,
  },
  success: {
    color: 'green',
    fontSize: 15,
    fontWeight: 'bold',
  },
  fail: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
  },
  txMiddleLayer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  sendType: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  ryu: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
});
