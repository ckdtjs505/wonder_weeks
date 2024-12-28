import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors';

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
  selectedDate: string;
}>;

export default function WonderDayModal({ isVisible, onClose, selectedDate, selectedDateInfo }: Props) {
  console.log(selectedDate)
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>원더윅스 {selectedDateInfo.weeks}차 - {selectedDateInfo.title}</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>
        <View style={styles.content}>
          <Text style={styles.subTitle}>증상 </Text>
          <Text style={styles.explain}>
          {selectedDateInfo.problem}
          </Text>
          <Text style={styles.subTitle}>대책 </Text>
          <Text style={styles.explain}>
          {selectedDateInfo.solution}
          </Text>
        </View>
        
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: '70%',
    width: '100%',
    backgroundColor: '#f4f4f4',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: '10%',
    backgroundColor: Colors.theme[1],
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 20,
  },
  subTitle : {
    color: '#000000',
    fontSize: 20,
    margin: 10,

  },
  content : {
    color: '#000000',
    fontSize: 20,
    margin: 10
  },
  explain : {
    color: '#000000',
    fontSize: 18,
    margin: 10,
  }
});