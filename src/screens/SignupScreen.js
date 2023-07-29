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
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();

  const onNameChange = text => {
    setName(text);
  };

  const onEmailChange = text => {
    setEmail(text);
  };

  const onPasswordChange = text => {
    setPassword(text);
  };

  const onClick = () => {
    Keyboard.dismiss();
    if (!name || !email || !password) setError('Please fill valid data!!');
    else {
      setLoader(true);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          setError(null);
          setName(null);
          setEmail(null);
          setPassword(null);
          navigation.dispatch(StackActions.replace('home'));
          setLoader(false);
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            setError('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            setError('That email address is invalid!');
          }
          if (error.code === 'auth/weak-password') {
            setError('Password is very weak!');
          }
          setLoader(false);
        });
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('login');
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          source={require('../assets/SocialChat.png')}
          style={styles.img}
        />
        <Text style={styles.heading}>Sign-Up</Text>
        <Text style={styles.subHeading}>Create a new account</Text>
        <View style={styles.input}>
          <TextInput
            placeholder="Name"
            onChangeText={onNameChange}
            value={name}
          />
        </View>
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
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToLogin}
          style={styles.navigateContainer}>
          <Text
            style={[
              styles.navigateText,
              {color: Colors.secondaryBg2, marginRight: 5},
            ]}>
            Already have an account?
          </Text>
          <Text
            style={[
              styles.navigateText,
              {
                fontWeight: '500',
              },
            ]}>
            Login
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
