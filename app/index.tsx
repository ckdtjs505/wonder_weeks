import { getWonderweeks } from "@/hooks/getWonderweeks";
import { router } from "expo-router";
import { Button, Text, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
LocaleConfig.locales['ko'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'],
  dayNamesShort: ['월', '화', '수', '목', '금', '토', '일'],
  today: "오늘"
};

LocaleConfig.defaultLocale = 'ko';

export default function Home(){
  const handleModalButton = () => {
    router.push('/userInputModal')
  }

  const wonderweeks = getWonderweeks({
    day : '2024-11-11',
    color : '#71C9CE'
  });

  return <View>
    <Text>Home </Text>

    <Calendar
      markingType={'period'}
      markedDates={{
        ...wonderweeks
      }}

      enableSwipeMonths={true}
      hideArrows={false}
    />
    <Button title="모달" onPress={handleModalButton}></Button>
  </View>
}