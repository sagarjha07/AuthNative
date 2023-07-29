import {View, Text, StyleSheet, Image, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from '../constants';
import {useNavigation, StackActions} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace('login'));
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/SocialChat.png')} style={styles.img} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryBg1,
  },
  img: {
    width: 260,
    height: 260,
    borderRadius: 130,
  },
});

export default SplashScreen;
