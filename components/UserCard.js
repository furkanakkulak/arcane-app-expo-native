import { Image, Text, View } from 'react-native';
import DeleteUser from './DeleteUser';
import EditUser from './EditUser';

const UserCard = ({ user }) => {
  return (
    <View className="flex flex-row justify-between px-1.5 mt-5 shadow-md bg-slate-50 font-light tracking-tighter text-lg rounded-md relative select-none w-96 mx-auto items-center">
      <Text className="absolute top-0 left-0 text-xs italic">#{user.id}</Text>

      <View>
        <Image
          className="h-12 w-16"
          src={user.image}
        />
      </View>

      <Text className="text-center">
        {user.firstName + ' ' + user.lastName}
      </Text>
      <View className="w-16 text-center flex flex-row justify-center items-center">
        <EditUser user={user} />
        <DeleteUser user={user} />
      </View>
    </View>
  );
};

export default UserCard;
