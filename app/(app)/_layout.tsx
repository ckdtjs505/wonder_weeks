import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import {
  Alert,
  Button,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { useBabyInfo } from "@/store/store";
import { Colors } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

/**
 * app 레이아웃
 */
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const baby = useBabyInfo();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
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
        await baby.initialize();
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    fetchData();
  }, [loading]);

  if (!loaded && loading) {
    return <Text> </Text>;
  }

  if (!baby || baby.name === "") {
    return <Redirect href="/userInputModal" />;
  }

  console.log(baby);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DefaultTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            headerTitleAlign: "center",
            title: `${baby.name}'s 원더윅스`,
            headerStyle: {
              backgroundColor: Colors.theme[1],
            },
            headerTitleStyle: {
              color: "#ffffff",
            },
            headerRight: (e) => (
              <TouchableOpacity onPressIn={() => router.push("/settings")}>
                <MaterialIcons
                  name="settings"
                  color={"white"}
                  size={20}
                ></MaterialIcons>
              </TouchableOpacity>
            ),
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="settings"
          options={{
            headerShown: true,
            headerTitleAlign: "center",
            title: "설정",
            headerStyle: {
              backgroundColor: Colors.theme[1],
            },
            headerTitleStyle: {
              color: "#ffffff",
            },
          }}
        ></Stack.Screen>
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
