import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../constants';
import auth from '@react-native-firebase/auth';
import LoaderModal from '../components/LoaderModal';
import {useNavigation, StackActions} from '@react-navigation/native';

const SignupScreen = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();

  const onEmailChange = text => {
    setEmail(text);
  };

  const onPasswordChange = text => {
    setPassword(text);
  };

  const onClick = () => {
    Keyboard.dismiss();
    if (!email || !password) setError('Please fill valid data!!');
    else {
      setLoader(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User signed in!');
          setError(null);
          setEmail(null);
          setPassword(null);
          navigation.dispatch(StackActions.replace('home'));
          setLoader(false);
        })
        .catch(error => {
          if (error.code === 'auth/user-not-found') {
            setError('Invalid credentials, Please check!');
          }

          if (error.code === 'auth/invalid-email') {
            setError('That email address is invalid!');
          }
          if (error.code === 'auth/wrong-password') {
            setError('Invalid credentials, Please check!');
          }
          console.log(error);
          setLoader(false);
        });
    }
  };

  const navigateToSignup = () => {
    navigation.navigate('signup');
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          source={require('../assets/SocialChat.png')}
          style={styles.img}
        />
        <Text style={styles.heading}>Login</Text>
        <Text style={styles.subHeading}>Login to your existing account</Text>
        <View style={styles.input}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={onEmailChange}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={onPasswordChange}
          />
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity style={styles.btn} onPress={onClick}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToSignup}
          style={styles.navigateContainer}>
          <Text
            style={[
              styles.navigateText,
              {color: Colors.secondaryBg2, marginRight: 5},
            ]}>
            Don't have an account ?
          </Text>
          <Text
            style={[
              styles.navigateText,
              {
                fontWeight: '500',
              },
            ]}>
            Signup
          </Text>
        </TouchableOpacity>
      </View>
      {loader ? <LoaderModal /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryBg2,
  },
  img: {
    height: 250,
    width: 250,
    marginTop: -10,
  },
  input: {
    width: '85%',
    height: 50,
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 20,
    borderColor: Colors.primaryBg1,
    marginBottom: 20,
  },
  heading: {
    color: Colors.primaryBg1,
    fontSize: 28,
    marginTop: -70,
    marginBottom: 5,
  },
  subHeading: {
    fontSize: 18,
    marginBottom: 30,
    color: Colors.secondaryBg1,
  },
  btn: {
    width: '85%',
    height: 50,
    backgroundColor: Colors.primaryBg1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.secondaryBg2,
  },
  btnText: {
    color: Colors.secondaryBg1,
    fontWeight: '400',
    fontSize: 20,
  },
  errorText: {
    color: Colors.errorColor,
    marginBottom: 5,
  },
  navigateContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  navigateText: {
    color: Colors.primaryBg1,
    fontSize: 16,
    fontWeight: '400',
  },
});

export default SignupScreen;
