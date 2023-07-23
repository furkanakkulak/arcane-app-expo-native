import {
  faBars,
  faHouse,
  faShop,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { AppContext } from '../ContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const navigation = useNavigation();
  const [showProfile, setShowProfile] = useState(false);

  const { toggleSidebar, showSidebar, logout, user } = useContext(AppContext);

  const toggleProfile = () => {
    setShowProfile((prevState) => !prevState);
  };

  const closeProfile = () => {
    setShowProfile(false);
  };

  const onPressNav = (nav) => {
    toggleSidebar();
    navigation.navigate(nav);
  };

  return (
    <SafeAreaView>
      <View className="border-b-[0.3px] w-full flex items-center fixed lg:relative z-20 top-0">
        <View className="p-5 flex flex-row items-center justify-between w-full">
          <View className="flex items-center">
            <TouchableOpacity
              onPress={() => toggleSidebar()}
              className="flex lg:hidden"
            >
              <FontAwesomeIcon
                icon={faBars}
                size={23}
              />
            </TouchableOpacity>
          </View>
          <Text className="text-center flex justify-center items-center tracking-wide font-extrabold text-3xl lg:hidden text-indigo-700 border-b-[0.5px]">
            ARCANE
          </Text>
          <View className="flex items-center md:order-2 relative">
            <TouchableOpacity
              onPress={() => toggleProfile()}
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:mr-0"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <Image
                className="w-8 h-8 rounded-full bg-white border-[0.3px]"
                src={user?.image}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        className={`my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg ml-auto mr-2 
         min-w-[200px] ${showProfile ? '' : 'hidden'}`}
        id="user-dropdown"
      >
        <View className="px-4 py-3 block ">
          <Text className="block text-sm text-gray-900 ">
            {user?.firstName + ' ' + user?.lastName}
          </Text>
          <Text className="block text-sm  text-gray-500 truncate ">
            {user?.email}
          </Text>
        </View>
        <View
          className="py-2"
          aria-labelledby="user-menu-button"
        >
          <TouchableOpacity
            onPress={() => logout()}
            className="block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer bg-red-700"
          >
            <Text className="text-white">Sign out</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        className={`z-20 fixed top-2.5 left-0 right-0 w-[96%] mx-auto border-[0.3px] rounded-xl lg:hidden h-[90%] ${
          showSidebar ? 'block' : 'hidden'
        }`}
      >
        <View className="flex flex-col gap-y-5 py-5 z-10 text-xl px-5">
          <TouchableOpacity
            className="navbar-link"
            onPress={() => onPressNav('Home')}
          >
            <View
              className={`flex flex-row gap-x-2 w-full items-center px-3 py-1.5 text-center rounded-xl text-slate-500 hover:bg-indigo-100 hover:text-black`}
            >
              <FontAwesomeIcon
                icon={faHouse}
                size={26}
              />
              <Text className="text-3xl tracking-widest">Dashboard</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPressNav('Users')}
            className="navbar-link"
          >
            <View
              className={`flex flex-row gap-x-2 w-full items-center px-3 py-1.5 text-center rounded-xl text-slate-500 hover:bg-indigo-100 hover:text-black `}
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon
                icon={faUsers}
                size={26}
              />
              <Text className="text-3xl tracking-widest">Users</Text>
            </View>
          </TouchableOpacity>
          <View className="navbar-link">
            <View
              className={`flex flex-row gap-x-2 w-full items-center px-3 py-1.5 text-center rounded-xl text-slate-500 hover:bg-indigo-100 hover:text-black `}
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon
                icon={faShop}
                size={26}
              />
              <Text className="text-3xl tracking-widest">Products</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Navbar;
