import {
  InriaSans_300Light,
  InriaSans_300Light_Italic,
  InriaSans_400Regular,
  InriaSans_400Regular_Italic,
  InriaSans_700Bold,
  InriaSans_700Bold_Italic,
  useFonts,
} from '@expo-google-fonts/inria-sans';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import MaterialIconsHeader from './components/MaterialIconsHeader';
import store from './redux/store';
import Faq from './screens/Faq';
import Home from './screens/Home';
import Photo from './screens/Photo';
import Portfolio from './screens/Portfolio';
import Selected from './screens/Selected';
import Colors from './styles/Colors';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.lightBrown
        },
        headerTintColor: Colors.white,
      }}
    >
      <Drawer.Screen name="Home" component={Home} options={{ 
        title: 'Accueil',
        drawerIcon: ({ color }) => <MaterialIcons name="supervised-user-circle" size={24} color={color} />
      }} />
      <Drawer.Screen name="Faq" component={Faq} options={{ 
        title: 'FAQ',
        drawerIcon: ({ color }) => <MaterialIconsHeader iconName="question-answer" iconColor={color} />
      }} />
    </Drawer.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.lightBrown
          },
          headerTintColor: Colors.white
        }}
      >
        <Stack.Screen 
          name="Drawer" 
          component={MyDrawer} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Portfolio" 
          component={Portfolio} 
          options={({ route }) => {
            return {
              title: `Portfolio de ${route.params.name.toUpperCase()}`,
              headerStyle: {
                backgroundColor: route.params.favColor
              },
            }
          }}   
        />
        <Stack.Screen 
          name="Photo" 
          component={Photo} 
          options={{title: 'Photo'}}
        />
      </Stack.Navigator>
  )
}

function SelectedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Selected" component={Selected} options={{headerShown: false}} />
      <Stack.Screen name='Photo' component={Photo} options={{title: 'PHOTO'}}/>
    </Stack.Navigator>
  )
}


export default function App() {

  let [fontLoaded] = useFonts({
    InriaSans_300Light,
    InriaSans_300Light_Italic,
    InriaSans_400Regular,
    InriaSans_400Regular_Italic,
    InriaSans_700Bold,
    InriaSans_700Bold_Italic,
  })

  if (!fontLoaded) {
    return undefined
  } else {
    SplashScreen.hideAsync()
  }

  return (
    <>
    <StatusBar style='light' />
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerTintColor: Colors.white }} >
          <Tab.Screen name="Membres" component={MyStack} options={{ 
            tabBarLabel: 'Accueil',
            headerShown: false,
            tabBarIcon: ({size, color}) => <MaterialIcons name="home" size={size} color={color} />,
            tabBarStyle: { backgroundColor: Platform.OS === "android" ? Colors.lightBrown : Colors.white},
            tabBarActiveTintColor: Platform.OS === 'android' ? Colors.white : Colors.lightBrown,
            tabBarInactiveTintColor: Platform.OS === 'android' ? Colors.white : Colors.darkGrey,
          }}/>
          <Tab.Screen name="Likes" component={SelectedStack} options={{
            title: 'FAVORIS',
            tabBarLabel: 'Sélection',
            tabBarIcon: ({size, color}) => <MaterialIcons name="thumb-up" size={size} color={color} />,
            tabBarStyle: { backgroundColor: Platform.OS === "android" ? Colors.darkGrey : Colors.white},
            tabBarActiveTintColor: Platform.OS === 'android' ? Colors.white : Colors.lightBrown,
            tabBarInactiveTintColor: Platform.OS === 'android' ? Colors.white : Colors.darkGrey,
            headerStyle: { backgroundColor: Platform.OS === 'android' ? Colors.darkGrey : Colors.lightBrown },
          }}/>
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
    </>
  );
}
