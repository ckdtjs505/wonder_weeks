import WonderDayModal from "@/components/WonderDayModal";
import { Colors } from "@/constants/Colors";
import { getWonderweeks } from "@/hooks/getWonderweeks";
import { useBabyInfo } from "@/store/store";
import { Redirect, router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
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
  const [ selectedDateInfo, setSelectedDateInfo] = useState({
    problem : '',
    solution : '',
    weeks : '',
    title : ''
  })
  const [ showWonderModal, setShowWonderModal ] = useState(false);  

  const wonderweeks = getWonderweeks({
    day : state.birthDay,
    color : Colors.theme[1],
    textColor: '#ffffff'
  });
  const isWonderweeks = Boolean(wonderweeks[new Date().toISOString().split('T')[0]].weeks);

  return <View>
    <Text style={styles.title}>오늘은 {
    isWonderweeks ?  "원더데이!" :"원더데이가 아닙니다" }  </Text>

    {showWonderModal ? <WonderDayModal selectedDateInfo={selectedDateInfo} onClose={ () => {
      setShowWonderModal(!showWonderModal)
    }}></WonderDayModal> : ''}

    <Calendar
      style={styles.calender}
      markingType={'period'}
      markedDates={{
        ...wonderweeks,
      }}

      onDayPress={day => {
        
        if( wonderweeks?.[day.dateString] && wonderweeks?.[day.dateString].problem  ){
          setSelectedDateInfo({ 
            weeks : wonderweeks?.[day.dateString].weeks,
            problem : wonderweeks?.[day.dateString].problem,
            solution : wonderweeks?.[day.dateString].solution,
            title :  wonderweeks?.[day.dateString].title,
          })

          setShowWonderModal(!showWonderModal)
        }else {
          setSelectedDateInfo({ 
            problem :'',
            solution : '',
            weeks : '',
          })
        }

      }}

      enableSwipeMonths={true}
      hideArrows={false}
      hideExtraDays={true}
    />
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