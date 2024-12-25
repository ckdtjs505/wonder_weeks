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

  return <View>
    <Text>Home </Text>

    <Calendar
      markingType={'period'}
      markedDates={{
        '2024-12-20': {textColor: 'green'},
        '2024-12-22': {startingDay: true, color: 'green'},
        '2024-12-23': {selected: true, endingDay: true, color: 'green', textColor: 'gray'},
        '2024-12-04': {disabled: true, startingDay: true, color: 'green', endingDay: true}
      }}

      enableSwipeMonths={true}
      hideArrows={false}
    />
    <Button title="모달" onPress={handleModalButton}></Button>
  </View>
}