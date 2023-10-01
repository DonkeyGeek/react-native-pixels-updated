import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, Text, View } from 'react-native';
import { globalStyles } from '../styles/AppStyles';
import Colors from '../styles/Colors';

const PressableItems = ({ item }) => {

    const navigation = useNavigation();

  return (
    <Pressable 
        // onPress={handleNavigate}
        onPress={() => navigation.navigate('Portfolio', item)}
        style={({pressed}) => [
            { backgroundColor: pressed ? Colors.clicked : Colors.white },
            globalStyles.profilItem
        ] }
    >
        <Text style={globalStyles.titleText}>{item.name}</Text>
        <Image 
            source={{uri: item.img}}
            style={globalStyles.profileImg}
        />
        <View style={globalStyles.infoContainer}>
            <Text style={globalStyles.infos}>{item.country}</Text>
            <Text style={globalStyles.infos}>{item.photos.length}</Text>
        </View>
    </Pressable>
  )
}

export default PressableItems