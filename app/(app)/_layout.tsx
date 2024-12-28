import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Redirect, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Text, View } from 'react-native';
import { useBabyInfo } from '@/store/store';
import { Colors } from '@/constants/Colors';
/**
 * app 레이아웃
 */
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
    const baby = useBabyInfo()
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    useEffect(() => {
        // API 호출
        const fetchData = async () => {
            try {
                await baby.initialize()
            } catch (error) {
                console.error('API 호출 중 오류 발생:', error);
            } finally {
                setLoading(false); // 로딩 상태 해제
            }
        };

        fetchData();
    }, [loading]);


    if (loading) {
        return <Text> 로딩 </Text>;
    }

    if (!loaded) {
        return <Text> 로딩 </Text>;
    }

    if (!baby || baby.name === "") {
        return <Redirect href="/userInputModal" />;
    }

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DefaultTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen name="index" options={{
                    headerShown: true,
                    autoHideHomeIndicator: true,
                    headerTitleAlign: 'center',
                    title: `${baby.name}'s 원더윅스`,
                    headerStyle: {
                        backgroundColor: Colors.theme[1],
                    },
                    headerTitleStyle: {
                        color: '#ffffff'
                    },
                }}>
                </Stack.Screen>
                <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}
