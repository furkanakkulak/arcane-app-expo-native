import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, Button, TextInput, Pressable } from 'react-native';
import { AppContext } from '../ContextProvider';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [pressed, setPressed] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const { login, checkToken } = useContext(AppContext);

  useEffect(() => {
    checkToken();
  }, []);

  const onSubmit = () => {
    const payload = {
      username: username,
      password: password,
    };
    setError(null);
    setMessage(null);
    if (!username.trim() && !password.trim()) {
      setError('Please enter username and password');
      return;
    }
    if (!username.trim()) {
      setError('Please enter username');
      return;
    }
    //Check for the Email TextInput
    if (!password.trim()) {
      setError('Please enter password');
      return;
    }

    axios
      .post('https://dummyjson.com/auth/login', payload)
      .then(({ data }) => {
        login(data);
        setMessage(`Login as ${data.username}, you are being redirected`);
        setTimeout(() => {
          navigation.navigate('Home');
          setMessage(null);
        }, 1500);
      })
      .catch((err) => {
        setError('Not a valid account');
      });
  };

  const handlePressIn = () => {
    setPressed(true);
  };

  const handlePressOut = () => {
    setPressed(false);
  };
  return (
    <View className="h-full flex justify-center items-center bg-indigo-700 px-5">
      <View className="py-7 px-10 justify-center flex flex-col gap-y-5 bg-white rounded-xl w-full sm:w-1/2 lg:w-1/3">
        <Text className="text-center tracking-wide font-extrabold text-5xl text-indigo-700 rounded-xl">
          ARCANE
        </Text>
        <Text className="text-xl text-center">Login into your account</Text>
        {error && (
          <Text className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400">
            {error}
          </Text>
        )}
        {message && (
          <Text className="p-4 mb-4 text-sm text-indigo-800 rounded-lg bg-indigo-50 dark:text-indigo-400">
            {message}
          </Text>
        )}
        <TextInput
          className="rounded-xl px-5 py-2.5 border-2 border-indigo-700"
          placeholder="Username"
          value={username}
          onChangeText={(username) => setUsername(username)}
          required
        />
        <TextInput
          className="rounded-xl px-5 py-2.5 border-2 border-indigo-700"
          placeholder="Password"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />
        <Pressable
          className={`py-2 px-3 rounded-xl
            ${pressed ? 'bg-indigo-900' : 'bg-indigo-700'}
          `}
          onPress={() => onSubmit()}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text className="text-white text-center font-semibold">Login</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            console.log('create an account');
          }}
        >
          <Text className="text-center">
            Not Registered?{' '}
            <Text
              class="text-indigo-700"
              href="/signup"
            >
              Create an account
            </Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;
