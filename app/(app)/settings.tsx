import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native"

export default function settings(){
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return <View>
        <View style={styles.row}>
            <Text style={styles.label} > 알람 </Text>
            <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>

        <View style={styles.row}>
            <Text style={styles.label} > 아이이름 변경하기  </Text>
        </View>

        <View style={styles.row}>
            <Text style={styles.label} > 광고 지우기  </Text>
        </View>
    </View>
}

const styles = StyleSheet.create( {
    row : {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center', // 세로 가운대 정렬
        textAlign: 'center',

    },
    label : {
        height: '50%', 
        justifyContent: 'center',
        alignContent: 'center', 
        textAlign: 'center', 
        fontSize: 20

    }
})

