import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

// 비동기 초기값 로딩 함수
const getInitialBabyInfo = async () => {
    const storedData = await AsyncStorage.getItem('baby-info');
    return storedData ? JSON.parse(storedData) : { name: '', birthDay: '' };
};

// Zustand 스토어 생성
export const useBabyInfo = create((set) => ({
    name: '',
    birthDay: '',
    // 초기화 함수 호출
    initialize: async () => {
        const data = await getInitialBabyInfo();
        set(data);
    },
    // 이름 업데이트
    setName: async (value) => {
        const currentState = await AsyncStorage.getItem('baby-info');
        const state = currentState ? JSON.parse(currentState) : {};
        const updatedState = { ...state, name: value };
        await AsyncStorage.setItem('baby-info', JSON.stringify(updatedState));
        set({ name: value });
    },
    // 생일 업데이트
    setBirthDay: async (value) => {
        const currentState = await AsyncStorage.getItem('baby-info');
        const state = currentState ? JSON.parse(currentState) : {};
        const updatedState = { ...state, birthDay: value };
        await AsyncStorage.setItem('baby-info', JSON.stringify(updatedState));
        set({ birthDay: value });
    },
}));