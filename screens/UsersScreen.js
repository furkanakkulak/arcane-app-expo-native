import {
  faChevronLeft,
  faChevronRight,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../ContextProvider';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import UserCard from '../components/UserCard';
import { ScrollView } from 'react-native-gesture-handler';
import Navbar from '../components/Navbar';
import AddNewUser from '../components/AddNewUser';

const UsersScreen = () => {
  const {
    allUsers,
    fetchAllUsers,
    searchUsers,
    searchUser,
    setSearchUsers,
    setAllUsers,
  } = useContext(AppContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [searchQuery, setSearchQuery] = useState(null);

  const handleSearchQueryChange = (newSearchQuery) => {
    setSearchQuery(newSearchQuery);
  };

  useEffect(() => {
    const limit = pageSize;
    const skip = (currentPage - 1) * pageSize;
    if (searchQuery) {
      // Eğer searchQuery varsa, arama işlemini yap
      searchUser(searchQuery);
    } else {
      // Eğer searchQuery yoksa, tüm kullanıcıları getir
      setSearchUsers(null);
      fetchAllUsers(limit, skip);
    }
  }, [pageSize, currentPage, searchQuery]);

  const handlePageUpChange = () => {
    if (allUsers?.users.length > 0) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
    }
  };

  const handlePageDownChange = () => {
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      setCurrentPage(previousPage);
    }
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <>
      <Navbar />
      <View className="flex justify-between">
        <Text className="text-3xl font-medium tracking-wide text-center text-indigo-600">
          All Users
        </Text>
        <View className="flex flex-row items-center px-4 mt-5">
          <View className="flex items-center flex-row justify-center rounded-lg h-8 w-56 mx-auto">
            <View className="bg-indigo-700 p-2 flex justify-center items-center rounded-tl-lg rounded-bl-lg h-8">
              <FontAwesomeIcon
                icon={faSearch}
                color="white"
              />
            </View>
            <TextInput
              type="text"
              value={searchQuery || ''}
              onChangeText={handleSearchQueryChange}
              placeholder="Search any user"
              className="rounded-tr-lg rounded-br-lg px-1.5 py-0.5 bg-indigo-100 h-8 w-full italic placeholder:text-black placeholder:italic placeholder:text-sm text-sm"
            />
          </View>
          <AddNewUser />
        </View>
      </View>
      <View className="flex flex-row justify-between mt-5 bg-indigo-50 py-2.5 rounded-md select-none w-96 mx-auto px-1.5">
        <Text className="text-center font-bold text-indigo-500 w-16">#</Text>
        <Text className="text-center font-bold text-indigo-500">
          name surname
        </Text>
        <Text className="text-center font-bold text-indigo-500 w-16">
          actions
        </Text>
      </View>
      <ScrollView>
        {!searchQuery &&
          currentPage > 0 &&
          allUsers?.users &&
          Object.keys(allUsers.users).map((userId) => (
            <UserCard
              key={userId}
              user={allUsers.users[userId]}
            />
          ))}
        {searchQuery &&
          searchUsers?.users &&
          Object.keys(searchUsers.users).map((userId) => (
            <UserCard
              key={userId}
              user={searchUsers.users[userId]}
            />
          ))}
      </ScrollView>
      {currentPage > 0 && (
        <View className="flex flex-row items-center justify-between md:justify-end space-x-4 mt-5 w-full bg-slate-50 pt-5 pb-12 px-5 rounded-lg text-sm md:text-base">
          {!searchQuery && (
            <>
              <View className="flex flex-row">
                <Text className="mr-2">Row Count:</Text>
                <RNPickerSelect
                  doneText={`Show results per page ${pageSize}`}
                  value={`${pageSize}`}
                  onValueChange={(value) => handlePageSizeChange(Number(value))}
                  items={[
                    { label: '1', value: '1' },
                    { label: '2', value: '2' },
                    { label: '3', value: '3' },
                    { label: '5', value: '5' },
                    { label: '7', value: '7' },
                    { label: '10', value: '10' },
                    { label: '15', value: '15' },
                    { label: '30', value: '30' },
                  ]}
                />
              </View>
              <Text>
                {pageSize * currentPage - pageSize + 1} -{' '}
                {currentPage * pageSize} out of {allUsers?.total} results
              </Text>
              <View className="flex flex-row items-center space-x-4">
                <TouchableOpacity
                  onPress={handlePageDownChange}
                  disabled={currentPage === 1}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handlePageUpChange}
                  disabled={
                    allUsers?.limit + allUsers?.skip === allUsers?.total
                  }
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </TouchableOpacity>
              </View>
            </>
          )}
          {searchQuery && searchUsers?.total && (
            <Text className="">
              {searchQuery && searchUsers?.total ? searchUsers.total : '0'}{' '}
              results
            </Text>
          )}
        </View>
      )}
    </>
  );
};

export default UsersScreen;
