import { useContext, useState } from 'react';
import axios from 'axios';
import {
  Modal,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Text,
} from 'react-native';
import { AppContext } from '../ContextProvider';

const AddNewUser = () => {
  const { allUsers, searchUsers, setAllUsers, setSearchUsers } =
    useContext(AppContext);

  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('https://robohash.org/autquiaut.png');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addUser = async () => {
    try {
      const response = await axios.post('https://dummyjson.com/users/add', {
        firstName,
        lastName,
        username,
        email,
        image,
      });
      const newUser = response.data;
      if (allUsers?.users) {
        setAllUsers((prevAllUsers) => ({
          ...prevAllUsers,
          users: [newUser, ...prevAllUsers.users],
        }));
      }

      if (searchUsers?.users) {
        setSearchUsers((prevSearchUsers) => ({
          ...prevSearchUsers,
          users: [newUser, ...prevSearchUsers.users],
          total: searchUsers.total + 1,
        }));
      }
      setFirstName('');
      setLastName('');
      setUsername('');
      setEmail('');
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        className="px-3 py-1.5 bg-indigo-700 rounded-lg"
        onPress={() => handleClickOpen()}
      >
        <Text className="text-slate-100 font-semibold">Add new user</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={open}
        onRequestClose={handleClose}
      >
        <View
          className="flex-[1] justify-center items-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <View className="bg-white p-5 rounded-lg items-center w-80">
            <Text className="text-2xl font-semibold text-indigo-600">
              Add New User
            </Text>
            <View>
              <View className="flex flex-col gap-y-5 mt-5 px-5">
                <View className="flex flex-row w-full justify-between items-center">
                  <Text className="text-indigo-700 font-semibold">
                    First Name:
                  </Text>
                  <TextInput
                    className="border rounded-md w-2/3 px-2 py-0.5 border-indigo-800"
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                </View>
                <View className="flex flex-row w-full justify-between items-center">
                  <Text className="text-indigo-700 font-semibold">
                    Last Name:
                  </Text>
                  <TextInput
                    className="border rounded-md w-2/3 px-2 py-0.5 border-indigo-800"
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </View>
                <View className="flex flex-row w-full justify-between items-center">
                  <Text className="text-indigo-700 font-semibold">
                    Username:
                  </Text>
                  <TextInput
                    className="border rounded-md w-2/3 px-2 py-0.5 border-indigo-800"
                    value={username}
                    onChangeText={setUsername}
                  />
                </View>
                <View className="flex flex-row w-full justify-between items-center">
                  <Text className="text-indigo-700 font-semibold">Email: </Text>
                  <TextInput
                    className="border rounded-md w-2/3 px-2 py-0.5 border-indigo-800"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
              </View>
            </View>
            <View className="flex flex-row items-center justify-between px-2 w-72 mt-10">
              <TouchableOpacity onPress={handleClose}>
                <Text className="text-slate-500">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={addUser}>
                <Text className="text-indigo-600">Add User</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddNewUser;
