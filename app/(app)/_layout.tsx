import { useFonts } from "expo-font";
import { Redirect, router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useBabyInfo, useNotiInfo } from "@/store/store";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import Home from ".";
import settings from "./settings";

import { Drawer } from "expo-router/drawer";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

/**
 * app 레이아웃
 */
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const baby = useBabyInfo();
  const noti = useNotiInfo();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [loading, setLoading] = useState(true);
  const [isEnabled, setIsEnabled] = useState(noti.isOn);

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

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    if (isEnabled) {
      noti.off();
    } else {
      noti.on();
    }
  };

  return (
    <GestureHandlerRootView>
      <Drawer
        drawerContent={(props) => {
          return (
            <SafeAreaView>
              <View style={styles.container}>
                <Text style={styles.info}>아이 이름 : {baby.name}</Text>
                <Text style={styles.info}>태어난 날 : {baby.birthDay} </Text>
              </View>
              <TouchableOpacity
                style={styles.list}
                onPress={() => router.push("/userInputModal")}
              >
                <Text style={styles.listText}> 아이정보 변경하기 </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.list}
                onPress={() => toggleSwitch()}
              >
                <Text style={styles.listText}>
                  {isEnabled ? "알람 끄기" : "알림 켜기"}
                </Text>
              </TouchableOpacity>
            </SafeAreaView>
          );
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            headerTitleAlign: "center",
            title: `${baby.name}'s 원더윅스`,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    borderWidth: 0.5,
    borderRadius: 5,
    margin: 10,
    padding: 5,
  },

  info: {
    fontSize: 18,
  },
  list: {
    marginTop: 0,
    justifyContent: "center",
    borderRadius: 10,
    padding: 3,
    height: 50,
    margin: 10,
    backgroundColor: Colors.theme[1],
  },
  listText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
  },
});
