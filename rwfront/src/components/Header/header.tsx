import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import style from './style';

interface IHeader {
  goBack: boolean;
  title?: string | undefined;
  rightNode?: React.ReactNode;
}

const Header = ({goBack, title, rightNode}: IHeader) => {
  const navigation = useNavigation();
  return (
    <View style={style.headerWrap}>
      <View style={style.rightLayer}>
        {goBack && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text>뒤로가기</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={style.middleLayer}>
        <Text style={style.headerTitle}>{!title ? `Ryu's Wallet` : title}</Text>
      </View>
      <View style={style.rightLayer}></View>
    </View>
  );
};

export default Header;
