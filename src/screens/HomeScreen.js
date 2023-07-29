import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {Colors} from '../constants';

const HomeScreen = () => {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState();
  const onAuthStateChanged = user => {
    setUser(user);
    setLoader(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  return (
    <View style={styles.container}>
      {loader ? (
        <ActivityIndicator size={'large'} color={Colors.primaryBg1} />
      ) : (
        <View>
          <Text>Welcome {user.email}!!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
