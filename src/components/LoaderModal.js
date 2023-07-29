import {View, StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';
import {Colors} from '../constants';

const LoaderModal = () => {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size={'large'} color={Colors.primaryBg1} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoaderModal;
