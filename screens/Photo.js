import { useLayoutEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../styles/AppStyles';

const Photo = ({ navigation, route }) => {

  // const url = route.params.url;
  // const title = route.params.title;
  // const photoDesc = route.params.photoDesc;

  const { url, title, photoDesc } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({ title: title.toUpperCase() })
  }, [navigation, title])

  return (
    <ScrollView style={globalStyles.container}>
      <Image 
          style={styles.selectedImage}
          source={{uri: url}}
      />
      <View style={styles.photoDescription}>
        <Text style={globalStyles.titleText}>{title}</Text>
        <Text style={styles.textDescription}>{photoDesc}</Text>
        <Text style={styles.textDescription}>{photoDesc}</Text>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  selectedImage: {
    width: '100%',
    height: 300
  },
  photoDescription: {
    padding: 15,
    fontSize: 25,
    fontFamily: 'InriaSans_400Regular'
  },
  textDescription: {
    fontFamily: 'InriaSans_400Regular',
    fontSize: 20,
    padding: 9
  }
})

export default Photo