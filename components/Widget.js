import { Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';

const Widget = ({ title, counter, text, percentage, icon }) => {
  return (
    <View className="px-5 py-2.5 flex flex-row justify-between items-center rounded-xl h-[120px] shadow-md select-none relative bg-slate-50 mt-5">
      <View className="flex flex-col justify-between h-full">
        <Text className="font-bold text-base text-slate-500 uppercase">
          {title}
        </Text>
        <Text className="text-3xl font-light tracking-wider">{counter}</Text>
        <Text className="text-sm underline underline-offset-4 border-black">
          {text}
        </Text>
      </View>
      <View className="flex flex-col justify-between h-full">
        <View className="flex gap-x-2 items-end justify-center text-green-400 w-max">
          <FontAwesomeIcon
            icon={faCaretUp}
            size={25}
          />
          <Text className="text-lg ">{percentage} %</Text>
        </View>
        <View className="flex justify-end w-fit mr-0 ml-auto text-slate-500">
          <FontAwesomeIcon
            icon={icon}
            className="flex justify-end w-fit mr-0 ml-auto text-slate-500"
            size={25}
          />
        </View>
      </View>
    </View>
  );
};

export default Widget;
