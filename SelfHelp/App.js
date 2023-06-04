import React, {useEffect, useRef, useState} from 'react';
import * as actions from './src/actions/app.actions';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import OtpInput from './src/screens/OTPCodeScreen';
import StructureScreen from './src/screens/StructureScreen';
import StructureProfile from './src/screens/StructureProfile';
import SettingsScreen from './src/screens/SettingsScreen';
import EditProfile from './src/screens/EditProfileScreen';
import CardSettingsScreen from './src/screens/CardSettingsScreen';
import EditCard from './src/screens/EditCardScreen';
import AddCard from './src/screens/AddCardScreen';
import HelpScreen from './src/screens/HelpScreen';
import ContactScreen from './src/screens/ContactScreen';
import SecurityPinScreen from './src/screens/SecurityPinScreen';
import {useTranslation} from "react-i18next";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Entypo from "react-native-vector-icons/Entypo";
import HomeScreen from "./src/screens/HomeScreen";
import PayDeskScreen from "./src/screens/PayDeskScreen";
import WalletScreen from "./src/screens/WalletScreen";
import ReferralScreen from "./src/screens/ReferralScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import {StyleSheet, TouchableOpacity} from "react-native";
import * as Animatable from "react-native-animatable";
import {View} from "react-native-animatable";
import Pi from "./src/p";
import {getAccessPinCode} from "./src/utils";
const Stack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function StackNavigators() {
  const {t} = useTranslation('common');
  return(
      <RootStack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#828282',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
       <RootStack.Screen
           name="HomeScreen"
           options={{headerShown: false}}
           component={HomeScreen}
       />
        <RootStack.Screen
            name="Structure"
            component={StructureScreen}
            options={{headerShown: false}}
        />
        <RootStack.Screen
            name="StructureProfile"
            component={StructureProfile}
            options={{headerShown: false}}
        />
        <RootStack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{headerShown: false}}
        />
        <RootStack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              headerTitle: 'Редактировать',
              headerTitleAlign: 'center',
            }}
        />
        <RootStack.Screen
            name="CardSettings"
            component={CardSettingsScreen}
            options={{
              headerTitle: 'список карт',
              headerTitleAlign: 'center',
            }}
        />
        <RootStack.Screen
            name="editcard"
            component={EditCard}
            options={{
              headerTitle: 'Редактирование Карты',
              headerTitleAlign: 'center',
            }}
        />
        <RootStack.Screen
            name="addCard"
            component={AddCard}
            options={{
              headerTitle: 'Добавление Карты',
              headerTitleAlign: 'center',
            }}
        />
        <RootStack.Screen
            name="Help"
            component={HelpScreen}
            options={{
              headerTitle: 'Вопрос/Ответ',
              headerTitleAlign: 'center',
            }}
        />
        <RootStack.Screen
            name="contact"
            component={ContactScreen}
            options={{
              headerTitle: 'Контакт',
              headerTitleAlign: 'center',
            }}
        />
        <RootStack.Screen
            name="editpin"
            component={SecurityPinScreen}
            options={{
              headerTitle: 'Изменить PIN',
              headerTitleAlign: 'center',
            }}
        />
      </RootStack.Navigator>
  )
}

function TabNavigators() {
  const {t} = useTranslation('common');
  const TabArr = [
    {
      route: 'Home',
      label: t('Главная'),
      type: Entypo,
      icon: 'home',
      component: StackNavigators,
      activeIcon: 'grid',
      inActiveIcon: 'grid-outline',
    },
    {
      route: 'Paydesk',
      label: t('Очередь'),
      type: Entypo,
      icon: 'text-document',
      component: PayDeskScreen,
      activeIcon: 'grid',
      inActiveIcon: 'grid-outline',
    },
    {
      route: 'Wallet',
      label: t('Кошелек'),
      type: Entypo,
      icon: 'wallet',
      component: WalletScreen,
      activeIcon: 'grid',
      inActiveIcon: 'grid-outline',
    },
    {
      route: 'Referral',
      label: t('Команда'),
      type: Entypo,
      icon: 'slideshare',
      component: ReferralScreen,
      activeIcon: 'grid',
      inActiveIcon: 'grid-outline',
    },
    {
      route: 'Profile',
      label: t('Кабинет'),
      type: Entypo,
      icon: 'user',
      component: ProfileScreen,
      activeIcon: 'grid',
      inActiveIcon: 'grid-outline',
    },
  ];
  const TabBarButton = props => {
    const {item, onPress, accessibilityState} = props;
    const focused = accessibilityState.selected;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const circle = {
      0: {scale: 0},
      0.3: {scale: 0.9},
      0.5: {scale: 0.3},
      0.8: {scale: 0.7},
      1: {scale: 1},
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const circle2 = {0: {scale: 1}, 1: {scale: 1}};
    const viewRef = useRef(null);
    const circleRef = useRef(null);
    useEffect(() => {
      if (focused) {
        viewRef.current.animate({
          0: {scale: 0.5, translateY: 0},
          1: {scale: 1.2, translateY: -24},
        });
        circleRef.current.animate(circle);
      } else {
        viewRef.current.animate({
          0: {scale: 1.2, translateY: -24},
          1: {scale: 1, translateY: 0},
        });
        circleRef.current.animate(circle2);
      }
    }, [circle, circle2, focused]);
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Animatable.View
              ref={viewRef}
              duration={1000}
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  borderWidth: 4,
                  borderColor: '#FFF',
                  backgroundColor: '#FFF',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
              <Animatable.View
                  ref={circleRef}
                  style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: focused ? '#1563FF' : '#FFF',
                    borderRadius: 25,
                  }}
              />
              <Entypo
                  name={item.icon}
                  color={focused ? '#FFF' : '#828282'}
                  size={focused ? 35 : 30}
              />
            </View>
            <Animatable.Text>{item.label}</Animatable.Text>
          </Animatable.View>
        </TouchableOpacity>
    );
  };
  return (
      <>
        <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarStyle: {
                height: 70,
                backgroundColor: '#fff',
              },
              headerShown: false,
            })}>
          {TabArr.map((item, index) => {
            return (
                <Tab.Screen
                    navigationKey={item.route}
                    name={item.route}
                    component={item.component}
                    options={{
                      tabBarButton: props => <TabBarButton {...props} item={item} />,
                    }}
                />
            );
          })}
        </Tab.Navigator>
      </>
  );
}

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [support, setSupport]=useState(false)
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(actions.userInfo());
    }
  }, [isAuthenticated, dispatch]);
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const onPinCode = async ()=>{
   const pin =   await getAccessPinCode()
      console.log(pin)
      if (pin !== null){
          setSupport(false)
      }else {
          setSupport(true)
      }
  }
useEffect(()=>{
    onPinCode()
},[])
  return (
    <>
      <NavigationContainer>
        {isAuthenticated ? (
            <>
                {support ? (
                    <>
                       <RootStack.Navigator>
                           <RootStack.Screen name={'p'} component={Pi}  options={{headerShown: false}}/>
                       </RootStack.Navigator>
                    </>
                ):(
                    <>
                        <TabNavigators/>
                    </>
                )}
            </>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Auth"
              component={SignUpScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Otp"
              component={OtpInput}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
};

export default App;
