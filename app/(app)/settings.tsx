import { useNotiInfo } from "@/store/store";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

export default function settings() {
  const noti = useNotiInfo();
  const [isEnabled, setIsEnabled] = useState(noti.isOn);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    if (isEnabled) {
      console.log("off");
      noti.off();
    } else {
      console.log("on");
      noti.on();
    }
  };
  const handleChangeName = () => {
    router.push("/userInputModal");
  };

  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.label}> 알람 </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#767577" }}
          thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={handleChangeName}>
          <Text style={styles.label}> 아이정보 변경하기 </Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.row}>
            <Text style={styles.label} > 광고 지우기  </Text>
        </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center", // 세로 가운대 정렬
    textAlign: "center",
  },
  label: {
    height: "50%",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    fontSize: 20,
  },
});
