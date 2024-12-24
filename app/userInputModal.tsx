import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function userInputModal() {

    const handlePress = () => {
        console.log('press')
    }
    return <View style={styles.container}>
        <View style={styles.form}>
            <Text style={styles.label} > 아이 이름  </Text>
            <TextInput style={styles.input} placeholder='기본 아이'></TextInput>

            <Text style={styles.label}> 태어난날  </Text>
            <TextInput style={styles.input} placeholder='2024-11-11'></TextInput>
            
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
