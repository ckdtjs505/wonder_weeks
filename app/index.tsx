import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Home(){
  const handleModalButton = () => {
    router.push('/userInputModal')
  }

  return <View>
    <Text>Home </Text>
    <Button title="모달" onPress={handleModalButton}></Button>
  </View>
}