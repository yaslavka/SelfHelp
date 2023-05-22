import React, {useRef, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {View} from 'react-native-animatable';
import PayDeskScreen from '../screens/PayDeskScreen';
import WalletScreen from '../screens/WalletScreen';
import ReferralScreen from '../screens/ReferralScreen';
import ProfileScreen from '../screens/ProfileScreen';

function TabNavigators() {
  const {t} = useTranslation('common');
  const Tab = createBottomTabNavigator();
  const TabArr = [
    {
      route: 'Home',
      label: t('Главная'),
      type: Entypo,
      icon: 'home',
      component: HomeScreen,
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
        initialRouteName="Home"
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
export default TabNavigators;
