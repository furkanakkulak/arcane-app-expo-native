import React, { useContext, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { AppContext } from '../ContextProvider';
import Widget from '../components/Widget';
import { faShop, faUser, faWallet } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import { ScrollView } from 'react-native-gesture-handler';

const HomeScreen = ({ navigation }) => {
  const { checkToken } = useContext(AppContext);
  useEffect(() => {
    checkToken();
  }, []);

  return (
    <>
      <Navbar />
      <ScrollView className=" px-1 mx-auto">
        <Text className="text-3xl font-medium tracking-wide text-center text-indigo-600">
          Welcome to the Dashboard!
        </Text>
        <View>
          <Widget
            icon={faUser}
            title="users"
            percentage="20"
            counter="124312"
            url="/users"
            text="See all users"
          />
          <Widget
            icon={faShop}
            title="products"
            percentage="30"
            counter="1234"
            url="/products"
            text="See all products"
          />
          <Widget
            icon={faWallet}
            title="Balance"
            percentage="13"
            url="/balance"
            counter="$124.312.03"
            text="View net earnings"
          />
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;
