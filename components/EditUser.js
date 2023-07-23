import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Modal, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppContext } from '../ContextProvider';

const EditUser = ({ user }) => {
  const { allUsers, searchUsers, setAllUsers, setSearchUsers } =
    useContext(AppContext);

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (open) {
      setIsLoading(true);

      const fetchUser = async (userId) => {
        try {
          const response = await axios.get(
            `https://dummyjson.com/users/${userId}`
          );
          const data = response.data;
          setSelectedUser(data);
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setUsername(data.username);
          setEmail(data.email);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.error(error);
        }
      };

      fetchUser(user.id);
    }
  }, [open, user.id, setFirstName, setLastName, setUsername, setEmail]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateInformation = async () => {
    try {
      const response = await axios.put(
        `https://dummyjson.com/users/${user.id}`,
        {
          firstName: firstName,
          lastName: lastName,
          username: username,
          email: email,
        }
      );
      const data = response.data;
      handleClose();

      // Update the context state variables
      if (allUsers?.users) {
        const updatedAllUsers = { ...allUsers };
        updatedAllUsers.users = updatedAllUsers.users.map((u) => {
          if (u.id === user.id) {
            return {
              ...u,
              firstName: firstName,
              lastName: lastName,
              username: username,
              email: email,
            };
          }
          return u;
        });
        setAllUsers(updatedAllUsers);
      }

      if (searchUsers?.users) {
        const updatedSearchUsers = { ...searchUsers };
        updatedSearchUsers.users = updatedSearchUsers.users.map((u) => {
          if (u.id === user.id) {
            return {
              ...u,
              firstName: firstName,
              lastName: lastName,
              username: username,
              email: email,
            };
          }
          return u;
        });
        setSearchUsers(updatedSearchUsers);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        className="flex justify-center items-center bg-indigo-600 text-white rounded-lg h-[28px] w-[28px] sm:h-[32px] sm:w-[32px] hover:bg-indigo-500 mr-2"
        onPress={handleClickOpen}
      >
        <FontAwesomeIcon
          icon={faPen}
          fontSize={20}
          color="white"
        />
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
          <View className="bg-white py-5 px-1 rounded-lg items-center w-80">
            <Text className="text-2xl font-semibold text-indigo-600">
              {selectedUser?.username} edit information
            </Text>
            <View className="px-5">
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
              <TouchableOpacity onPress={updateInformation}>
                <Text className="text-indigo-600">Update User</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EditUser;
