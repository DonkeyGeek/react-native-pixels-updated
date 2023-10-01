import { MaterialIcons } from '@expo/vector-icons';
import { useLayoutEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import PressableItems from '../components/PressableItems';
import Settings from '../components/Settings';
import { globalStyles } from '../styles/AppStyles';
import Colors from '../styles/Colors';

const Home = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState(false);

  const selectedCategories = useSelector(state => state.users.selectedCategories);

    const renderProfiles = ({ item }) => {
        return <PressableItems 
            item={item}
        />
    }

    const handleSettingsModal = () => {
      setModalVisible(!modalVisible)
    }

    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
            <MaterialIcons 
              name="settings" 
              size={24} 
              color="white" 
              style={{marginRight: 15}}
              onPress={handleSettingsModal} 
            />
          )
      })
    })
    
    return (
      <View style={globalStyles.container}>
        <Modal
          visible={modalVisible}
          animationType='slide'
        >
          <View style={styles.modalBody}>
            <MaterialIcons 
              name="close" 
              size={24} 
              style={styles.modalClose}
              onPress={handleSettingsModal} 
            />

            <Settings closeModal={handleSettingsModal} />
          </View>
        </Modal>
        <FlatList
          data={selectedCategories}
          renderItem={renderProfiles}
          keyExtractor={(item) => item.id } 
        />
      </View>
    )
}

const styles = StyleSheet.create({
  modalBody: {
    flex: 1,
    backgroundColor: Colors.ghost,
    marginVertical: 60,
    padding: 20,
    alignSelf: "center",
    borderRadius: 10,
    width: '90%'
  },
  modalClose: {
    alignSelf: 'flex-end'
  }
})

export default Home