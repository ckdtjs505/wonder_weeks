import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export default function userInputModal() {

    const [name, setName] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [isShowPicker, setIsShowPicker] = useState(false);

    // 데이터를 불러오고 상태를 설정하는 비동기 함수
    const loadInitialData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('baby-info');
            if (jsonValue != null) {
                const savedData = JSON.parse(jsonValue);
                setName(savedData.name || ''); // 값이 없으면 빈 문자열
                setBirthDay(savedData.birthDay || '');
            }
        } catch (e) {
            console.error('초기 데이터 불러오기 실패:', e);
        }
    };

    // useEffect로 컴포넌트가 렌더링될 때 초기 데이터 로드
    useEffect(() => {
        loadInitialData();
    }, []); // 빈 배열로 첫 렌더링 시 한 번만 실행

    // 데이터 저장 함수
    const storeData = async () => {
        try {
            const jsonValue = JSON.stringify({ name, birthDay });
            await AsyncStorage.setItem('baby-info', jsonValue);
        } catch (e) {
            console.error('저장 실패:', e);
        }
    };

    const handlePress = () => {
        storeData();
        router.dismissAll(); // 모든 스택을 제거하고 홈 화면으로 이동
        router.replace('/'); // 홈 화면으로 전환
    }

    const toogleTimePicker = () => {
        setIsShowPicker(!isShowPicker)
    }
    return <View style={styles.container}>
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
                    value={birthDay} 
                    editable={false}
                >
                </TextInput>
            </Pressable> : ''}
            
            { isShowPicker ?  <RNDateTimePicker 
            value={new Date()}
            onChange={ ({type}, day) => {
                if( type === "set" && day){
                    setBirthDay(day.toISOString().split('T')[0]); // yyyy-MM-dd 형식으로 저장
                }
                toogleTimePicker()
            }}
            /> : ''}

            
        </View>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>입력완료 </Text>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    container : { 
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'space-between', // 상단과 하단 분리
        backgroundColor: '#fff',
        padding: 20,
    }, 
    content : {
        flexDirection: 'row',
        justifyContent: 'space-around'
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
    },
    button: {
        backgroundColor: '#ff3a67', // 버튼 배경색 ff3a67
        padding: 10,
        borderRadius: 5,
        width: '85%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white', // 버튼 텍스트 색상
        fontSize: 16,
        fontWeight: 'bold',
    },
})
