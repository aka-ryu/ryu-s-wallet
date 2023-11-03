import {Platform, StyleSheet} from 'react-native';

export default StyleSheet.create({
  logo: {
    width: 80,
    height: 18,
  },
  ic_left_arrow: {
    width: 24,
    height: 24,
  },
  ic_alarm: {
    width: 32,
    height: 32,
  },
  headerWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: Platform.OS === 'ios' ? 0 : 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
});
