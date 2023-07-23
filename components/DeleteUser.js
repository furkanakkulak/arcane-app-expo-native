import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { AppContext } from '../ContextProvider';

const DeleteUser = ({ user }) => {
  const { allUsers, setAllUsers, setSearchUsers, searchUsers } =
    useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`https://dummyjson.com/users/${user.id}`);

      // Remove the user from the context state variables
      if (allUsers?.users) {
        const updatedAllUsers = { ...allUsers };
        updatedAllUsers.users = updatedAllUsers.users.filter(
          (u) => u.id !== user.id
        );
        setAllUsers(updatedAllUsers);
      }

      if (searchUsers?.users) {
        const updatedSearchUsers = { ...searchUsers };
        updatedSearchUsers.users = updatedSearchUsers.users.filter(
          (u) => u.id !== user.id
        );
        updatedSearchUsers.total = updatedSearchUsers.total - 1;
        setSearchUsers(updatedSearchUsers);
      }
    } catch (error) {
      try {
        if (allUsers?.users) {
          const updatedAllUsers = { ...allUsers };
          updatedAllUsers.users = updatedAllUsers.users.filter(
            (u) => u.id !== user.id
          );
          setAllUsers(updatedAllUsers);
        }
        if (searchUsers?.users) {
          const updatedSearchUsers = { ...searchUsers };
          updatedSearchUsers.users = updatedSearchUsers.users.filter(
            (u) => u.id !== user.id
          );
          updatedSearchUsers.total = updatedSearchUsers.total - 1;
          if (updatedSearchUsers.total <= 0) {
            updatedSearchUsers.total = 0;
          }
          setSearchUsers(updatedSearchUsers);
        }
      } catch (error) {
        console.error(error);
      }
      console.error(error);
    } finally {
      handleCloseModal();
    }
  };

  return (
    <View>
      <TouchableOpacity
        className="flex justify-center items-center bg-red-600 text-white rounded-lg h-[28px] w-[28px] sm:h-[32px] sm:w-[32px] hover:bg-red-500"
        onPress={handleOpenModal}
      >
        <FontAwesomeIcon
          icon={faTrash}
          size={20}
          color="white"
        />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
      >
        <View
          className="flex-[1] justify-center items-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <View className="bg-white p-5 rounded-lg items-center">
            <Text>Are you sure you want to delete this user?</Text>
            <View className="flex flex-row items-center justify-between px-2 w-72 mt-5">
              <TouchableOpacity onPress={handleCloseModal}>
                <Text className="text-slate-500">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteUser}>
                <Text className="text-red-600">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DeleteUser;
