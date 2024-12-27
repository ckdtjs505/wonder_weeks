import { Colors } from "@/constants/Colors";
import { getWonderweeks } from "@/hooks/getWonderweeks";
import { useBabyInfo } from "@/store/store";
import { router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
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
  const state = useBabyInfo();
  
  const handleModalButton = () => {
    router.push('/userInputModal')
  }

  const wonderweeks = getWonderweeks({
    day : state.birthDay,
    color : '#71C9CE'
    color : Colors.theme[1],
  });
  
  const isWonderweeks = Boolean(wonderweeks[new Date().toISOString().split('T')[0]])

  return <View>
    <Text style={styles.title}>오늘은 {
    isWonderweeks ?  "원더윅스입니다" :"원더윅스가 아닙니다" }  </Text>

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

const styles = StyleSheet.create({
  container : { 
      // alignItems: 'center',
      // justifyContent: 'space-between', // 상단과 하단 분리
      // backgroundColor: '#fff',
  }, 
  calender : {
    height: '90%',
    width: '90%',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  theme : {
  },
  titleBox: {
    flex : 1,
    justifyContent: 'center'
  },
  title : {
    fontSize: 20,
    textAlign: 'center',
    margin: 20
  }
})