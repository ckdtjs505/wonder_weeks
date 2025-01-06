import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useBabyInfo } from '@/store/store';
import { Colors } from '@/constants/Colors';

export default function userInputModal() {
    const baby = useBabyInfo();
    const [isShowPicker, setIsShowPicker] = useState(false);
    const [name, setName] = useState(baby.name)

    const handlePress = async () => {
        await baby.setName(name);
        if( !baby.birthDay ){
          Alert.alert('태어난 날을 입력해주세요');
          return;
        } 
        router.replace('/'); // 홈 화면으로 전환
    }

    const toogleTimePicker = () => {
        setIsShowPicker(!isShowPicker)
    }
    return <View style={styles.container}>

        <View>
            <Text style={styles.title}>원더윅스 </Text>
            <Text style={styles.subTitle}>계산기 </Text>
        </View>

        <View style={styles.form}>
            <Text style={styles.label} > 아이 이름  </Text>
            <TextInput 
                style={styles.input} 
                placeholder='기본 아이' 
                value={name} 
                onChangeText={ (text) =>{ setName(text) }}>
            </TextInput>

            <Text style={styles.label}> 태어난날  </Text>
            { !isShowPicker ? <Pressable
                style={styles.input}
                onPress={toogleTimePicker}
                >
                <TextInput 
                    placeholder='2024-11-11' 
                    value={baby.birthDay} 
                    editable={false}
                >
                </TextInput>
            </Pressable> : ''}
            
            { isShowPicker ?  <RNDateTimePicker 
            value={new Date()}
            onChange={ ({type}, day) => {
                if( type === "set" && day){
                    baby.setBirthDay(day.toISOString().split('T')[0]); // yyyy-MM-dd 형식으로 저장
                }
                toogleTimePicker()
            }}
            /> : ''}

            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>입력완료 </Text>
            </TouchableOpacity>
        </View>

    </View>
}

const styles = StyleSheet.create({
    container : { 
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'space-around', // 상단과 하단 분리
        backgroundColor: '#fff',
        padding: 20,
    }, 
    content : {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    title: {
        fontSize: 40,
        textAlign: 'center'
    },
    subTitle: {
        fontSize : 30,
        textAlign: 'center'

    },
    form : {
        width: '90%',
    },
    label : {
        fontWeight: "500",
        fontSize: 20,
        marginTop: 10,
    }, 
    input : {
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        height: 40,
        justifyContent: 'center',
        paddingLeft: 10
    },
    button: {
        backgroundColor: Colors.theme[1], // 버튼 배경색 ff3a67
        padding: 10,
        borderRadius: 5,
        width: '85%',
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white', // 버튼 텍스트 색상
        fontSize: 16,
        fontWeight: 'bold',
    },
})
