import { useCallback, useLayoutEffect } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIconsHeader from '../components/MaterialIconsHeader';
import TouchableImage from '../components/TouchableImage';
import { setSelection } from '../redux/actions/actionSelection';
import { globalStyles } from '../styles/AppStyles';
import Colors from '../styles/Colors';

const Portfolio = ({navigation, route}) => {

  const dispatch = useDispatch() 

   const name = route.params.name;
   const profilImg = route.params.img;
   const favColor = route.params.favColor;
   const desc = route.params.desc;
   const photoArray = route.params.photos;
   const userId = route.params.id;

   const selectedUser = useSelector(
    state => state.users.selectedUsers.some( user => user.id === userId )
   )

   const handleDispatch = useCallback(() => {
      dispatch(setSelection(userId));

      if (selectedUser) {
        Alert.alert(
            "Photos effacées",
            `Les photos de ${name} sont effacées`,
            [ { text: "OK"} ]
        )
      } else {
          Alert.alert(
              "Photos enregistrées",
              "Elles sont disponibles dans votre sélection",
              [ { text: "OK"} ]
          )
      }  
  }, [dispatch, userId, selectedUser])

   useLayoutEffect(() => {
    navigation.setOptions({
        headerRight: () => (
          <MaterialIconsHeader 
            iconName={selectedUser ? 'delete' : 'thumb-up'} 
            iconColor='white' 
            onPressIcon={handleDispatch} 
          />
        )
    })
   }, [navigation, selectedUser])

   const selectPhoto = (photo) => {
    navigation.navigate('Photo', photo)
   }

  return (
    <ScrollView style={globalStyles.container}>
      <View style={{backgroundColor: favColor, ...styles.profilInfos}}>
        <Image 
          style={styles.smallProfilImg}
          source={{uri: profilImg}}
        />
        <Text style={styles.profilName}>{name}</Text>
      </View>
      <View style={styles.profilDescription}>
        <Text style={styles.titleBioText}>Bio: </Text>
        <Text style={styles.textBio}>{desc}</Text>
      </View>
      <View>
        {
          photoArray.map( photo => (
            <TouchableImage 
              key={photo.id}
              imgUrl={photo.url}
              imgTitle={photo.title}
              onSelectPhoto={() => selectPhoto(photo)}
            />
          ))
        }
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  profilInfos: {
    alignItems: 'center',
    padding: 10
  },
  smallProfilImg: {
    width: 150,
    height: 150,
    borderRadius: 150/2,
    margin: 9,
    borderWidth: 6,
    borderColor: Colors.white
  },
  profilName: {
    fontFamily: 'InriaSans_700Bold',
    color: Colors.white,
    fontSize: 25,
  },
  profilDescription: {
    backgroundColor: Colors.ghost,
    padding: 15,
    fontSize: 25,
    fontFamily: 'InriaSans_400Regular',
  },
  titleBioText: {
    fontSize: 25,
    padding: 9,
    fontFamily: 'InriaSans_700Bold'
  },
  textBio: {
    fontFamily: 'InriaSans_400Regular',
    fontSize: 20,
    padding: 9
  }
})

export default Portfolio