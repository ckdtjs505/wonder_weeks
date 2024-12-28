import { Colors } from "@/constants/Colors";
import { getWonderweeks } from "@/hooks/getWonderweeks";
import { useBabyInfo } from "@/store/store";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
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
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토', '일'],
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
    color : Colors.theme[1],
    textColor: '#ffffff'
  });
  
  const isWonderweeks = Boolean(wonderweeks[new Date().toISOString().split('T')[0]].weeks);
  
  return <View>
    <Text style={styles.title}>오늘은 {
    isWonderweeks ?  "원더데이!" :"원더데이가 아닙니다" }  </Text>
    <Calendar
      style={styles.calender}
      markingType={'period'}
      markedDates={{
        ...wonderweeks,
      }}

      onDayPress={day => {
        console.log(day)
      }}

      enableSwipeMonths={true}
      hideArrows={false}
      hideExtraDays={true}
    />
    {/* <Button title="모달" onPress={handleModalButton}></Button> */}
  </View>
}

const styles = StyleSheet.create({
  container : { 
      // alignItems: 'center',
      // justifyContent: 'space-between', // 상단과 하단 분리
      // backgroundColor: '#fff',
  }, 
  calender : {
    height: '80%',
    width: '90%',
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: 10,
    borderColor: Colors.theme.header,
    borderWidth: 0.5
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