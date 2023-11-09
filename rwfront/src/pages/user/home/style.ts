import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  walletCard: {
    height: 200,
    // width: '100%',
    borderRadius: 20,
    padding: 10,
    borderColor: 'black',
    borderWidth: 2,
    justifyContent: 'space-between',
  },
  walletAddress: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  addressLayer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tokenLayer: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  tokenValance: {
    color: 'black',
    fontSize: 50,
  },
  tokenSymbol: {
    color: 'grey',
    fontSize: 20,
  },
  buttonLayer: {},
  button: {
    marginTop: 30,
  },
});
