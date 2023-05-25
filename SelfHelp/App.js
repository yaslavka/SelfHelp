import React, {useEffect} from 'react';
import * as actions from './src/actions/app.actions';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import OtpInput from './src/screens/OTPCodeScreen';
import OtpPinInput from './src/screens/OTPPinCodeScreen';
import TabNavigators from './src/Tabnavigators';
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
const Stack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();
const App = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.app.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(actions.userInfo());
    }
  }, [isAuthenticated, dispatch]);
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <NavigationContainer>
        {isAuthenticated ? (
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
            {userInfo && userInfo.pinCode === null && (
                <RootStack.Screen
                    name="OtpPin"
                    component={OtpPinInput}
                    options={{headerShown: false}}
                />
            )}
            <RootStack.Screen
              name="Tab"
              component={TabNavigators}
              options={{headerShown: false}}
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
