import React, { useEffect, createContext, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  // Use useNavigation to access navigation object for navigation
  const navigation = useNavigation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [allUsers, setAllUsers] = useState({});
  const [searchUsers, setSearchUsers] = useState({});

  const checkToken = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
      setUser(decodeJWT(storedToken));
      navigation.navigate('Home');
    } else {
      setIsLoggedIn(false);
      setUser(null);
      setToken(null);
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    checkToken(); // isLoggedIn durumu değiştiğinde de tetiklensin
  }, [isLoggedIn]);

  const decodeJWT = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.log('JWT decode hatası:', error);
      logout();
    }
  };

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(decodeJWT(userData.token));
    setToken(userData.token);
    AsyncStorage.setItem('token', userData.token);
    navigation.navigate('Home');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setToken(null);
    AsyncStorage.removeItem('token');
    navigation.navigate('Login'); // Replace 'Login' with your actual login screen name
  };

  const toggleSidebar = () => {
    setShowSidebar((prevState) => !prevState);
  };

  const fetchAllUsers = async (limit, skip) => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/users?limit=${limit}&skip=${skip}&select=firstName,lastName,email,image`
      );
      const data = response.data;
      setAllUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const searchUser = async (searchKey) => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/users/search?q=${searchKey}`
      );
      const data = response.data;
      setSearchUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        user,
        token,
        login,
        logout,
        showSidebar,
        toggleSidebar,
        fetchAllUsers,
        allUsers,
        searchUsers,
        searchUser,
        setSearchUsers,
        setAllUsers,
        checkToken,
        setShowSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
