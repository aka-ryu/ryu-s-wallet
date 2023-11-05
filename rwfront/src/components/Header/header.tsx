import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import style from './style';
import Routes from '../../navigation/Routes';
import {RootStackParamList} from '../../interface/navigation';
import {useDispatch} from 'react-redux';
import {logout} from '../../redux/slices/userSlice';

interface IHeader {
  goBack: boolean;
  title?: string | undefined;
  goHome?: boolean;
  goLogout?: boolean;
}

const Header = ({goBack, title, goHome, goLogout}: IHeader) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(logout());
  };

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
      <View style={style.rightLayer}>
        {(goHome || goLogout) && (
          <>
            {goHome && (
              <TouchableOpacity
                onPress={() => navigation.navigate(Routes.HOME)}>
                <Text>홈으로</Text>
              </TouchableOpacity>
            )}
            {goLogout && (
              <TouchableOpacity onPress={handleLogout}>
                <Text>로그아웃</Text>
              </TouchableOpacity>
            )}
          </>

          // <TouchableOpacity onPress={() => navigation.goBack()}>
          //   <Text>뒤로가기</Text>
          // </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;
