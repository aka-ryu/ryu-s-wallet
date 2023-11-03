import {Platform, StyleSheet} from 'react-native';

export default StyleSheet.create({
  headerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'ios' ? 0 : 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rightLayer: {
    flex: 1,
  },
  middleLayer: {
    flex: 4,
  },
});
