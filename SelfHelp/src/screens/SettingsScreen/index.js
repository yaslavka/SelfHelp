import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import bg from '../../assets/background/image.png';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../actions/auth.actions';
import {useNavigation} from '@react-navigation/native';
import Svg, {Path, Rect} from 'react-native-svg';
import {useTranslation} from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {baseURLAvatar} from "../../api";

function SettingsScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.app.user);
  const {t} = useTranslation('common');
  const logout = async () =>{
      dispatch(actions.signOutSuccess());
      await AsyncStorage.clear()
      await AsyncStorage.removeItem('access_token')
  }
  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <ScrollView
        contentContainerStyle={{width: '100%', flexGrow: 1, height: 'auto'}}
        contentInsetAdjustmentBehavior="automatic">
        <Image
          source={bg}
          style={{
            width: '100%',
            height: 157,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
          {userInfo && (
              <>
                  <View
                      style={{
                          paddingHorizontal: 25,
                          marginBottom: 10,
                          paddingTop: 100,
                          paddingBottom: 20,
                      }}>
                      <View
                          style={{
                              backgroundColor: '#FFFFFF',
                              paddingVertical: 25,
                              borderRadius: 10,
                              shadowColor: '#000',
                              shadowOffset: {
                                  width: 1,
                                  height: 2,
                              },
                              shadowOpacity: 0.22,
                              shadowRadius: 2.22,
                              elevation: 4,
                              paddingHorizontal: 15,
                          }}>
                          <View
                              style={{
                                  alignItems: 'center',
                                  justifyContent: 'flex-start',
                                  display: 'flex',
                                  flexDirection: 'row',
                              }}>
                              <View style={{marginHorizontal: 10}}>
                                  <Svg
                                      width="60"
                                      height="60"
                                      viewBox="0 0 60 60"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                      {userInfo.avatar?(
                                          <>
                                              <Image
                                                  source={{uri: `${baseURLAvatar}/${userInfo.avatar}`}}
                                                  style={{
                                                      width: 60,
                                                      height: 60,
                                                      borderRadius: 50
                                                  }}
                                              />
                                          </>
                                      ):(
                                          <>
                                              <Rect width="60" height="60" rx="30" fill="#F2F2F2" />
                                              <Path
                                                  d="M30 16.5C28.4087 16.5 26.8826 17.1321 25.7574 18.2574C24.6321 19.3826 24 20.9087 24 22.5C24 24.0913 24.6321 25.6174 25.7574 26.7426C26.8826 27.8679 28.4087 28.5 30 28.5C31.5913 28.5 33.1174 27.8679 34.2426 26.7426C35.3679 25.6174 36 24.0913 36 22.5C36 20.9087 35.3679 19.3826 34.2426 18.2574C33.1174 17.1321 31.5913 16.5 30 16.5ZM30 33C25.494 33 16.5 35.262 16.5 39.75V42C16.5 42.828 17.172 43.5 18 43.5H42C42.828 43.5 43.5 42.828 43.5 42V39.75C43.5 35.262 34.506 33 30 33Z"
                                                  fill="#B5B5B5"
                                              />
                                          </>
                                      )}
                                  </Svg>
                              </View>
                              <View style={{marginHorizontal: 10}}>
                                  <Text
                                      style={{fontWeight: '600', fontSize: 18, marginBottom: 5}}>
                                      {userInfo.last_name}
                                  </Text>
                                  <TouchableOpacity
                                      onPress={() => navigation.navigate('EditProfile')}>
                                      <Text
                                          style={{fontWeight: '400', fontSize: 14, color: '#949494'}}>
                                          {t('profileEdit.buttons.edit')}
                                      </Text>
                                  </TouchableOpacity>
                              </View>
                          </View>
                      </View>
                  </View>
                  <View
                      style={{
                          paddingHorizontal: 25,
                          marginBottom: 10,
                      }}>
                      <TouchableOpacity onPress={() => navigation.navigate('Wallet')}>
                          <View
                              style={{
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  display: 'flex',
                                  flexDirection: 'row',
                                  borderRadius: 10,
                                  borderWidth: 1,
                                  borderColor: '#F2F2F2',
                                  paddingVertical: 15,
                                  paddingHorizontal: 15,
                                  marginBottom: 15,
                              }}>
                              <View
                                  style={{
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      display: 'flex',
                                      flexDirection: 'row',
                                  }}>
                                  <Svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                      <Path
                                          d="M6 2C4.895 2 4 2.895 4 4V20C4 21.105 4.895 22 6 22H16.4277C16.1437 21.337 16 20.641 16 20H12C11.448 20 11 19.552 11 19C11 18.448 11.448 18 12 18H16H16.4297C16.1657 17.446 16 16.786 16 16C15.448 16 15 15.552 15 15C15 14.448 15.448 14 16 14C16.09 14 16.1709 14.0288 16.2539 14.0508C16.5049 13.4098 16.999 12.5805 18 11.9785C18 10.8865 18.8865 10 19.9785 10H20V4C20 2.895 19.105 2 18 2H6ZM6.5 4H17.5C17.776 4 18 4.224 18 4.5V7.5C18 7.776 17.776 8 17.5 8H6.5C6.224 8 6 7.776 6 7.5V4.5C6 4.224 6.224 4 6.5 4ZM8 10C8.552 10 9 10.448 9 11C9 11.552 8.552 12 8 12C7.448 12 7 11.552 7 11C7 10.448 7.448 10 8 10ZM12 10C12.552 10 13 10.448 13 11C13 11.552 12.552 12 12 12C11.448 12 11 11.552 11 11C11 10.448 11.448 10 12 10ZM16 10C16.552 10 17 10.448 17 11C17 11.552 16.552 12 16 12C15.448 12 15 11.552 15 11C15 10.448 15.448 10 16 10ZM21 12C20.448 12 20 12.448 20 13V13.1992C19 13.4992 18 14.4 18 16C18 17.9 19.5996 18.5004 20.5996 18.9004C21.7996 19.4004 22 19.5 22 20C22 20.5 21.8 21 21 21C20.2 21 20 20.5 20 20H18C18 21 18.6 22.4008 20 22.8008V23C20 23.552 20.448 24 21 24C21.552 24 22 23.552 22 23V22.8008C23.4 22.4008 24 21 24 20C24 18.1 22.4004 17.4996 21.4004 17.0996C20.2004 16.5996 20 16.5 20 16C20 15.2 20.5 15 21 15C21.8 15 22 15.5 22 16H23H24C24 15 23.4 13.5992 22 13.1992V13C22 12.448 21.552 12 21 12ZM8 14C8.552 14 9 14.448 9 15C9 15.552 8.552 16 8 16C7.448 16 7 15.552 7 15C7 14.448 7.448 14 8 14ZM12 14C12.552 14 13 14.448 13 15C13 15.552 12.552 16 12 16C11.448 16 11 15.552 11 15C11 14.448 11.448 14 12 14ZM8 18C8.552 18 9 18.448 9 19C9 19.552 8.552 20 8 20C7.448 20 7 19.552 7 19C7 18.448 7.448 18 8 18Z"
                                          fill="#1563FF"
                                      />
                                  </Svg>
                                  <Text style={{fontSize: 16, fontWeight: '400'}}> {t('homescreen.userInfo.balance')}</Text>
                              </View>
                              <View
                                  style={{
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      display: 'flex',
                                      flexDirection: 'row',
                                  }}>
                                  <Text
                                      style={{fontSize: 17, fontWeight: '700', color: '#1563FF'}}>
                                      {' '}
                                      {userInfo.trx}{' '}
                                  </Text>
                                  <Svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                      <Path
                                          d="M13.071 11.9997L9.24995 8.17866C8.83595 7.76466 8.83595 7.09266 9.24995 6.67866C9.66395 6.26466 10.336 6.26466 10.75 6.67866L15.364 11.2927C15.755 11.6837 15.755 12.3167 15.364 12.7067L10.75 17.3207C10.336 17.7347 9.66395 17.7347 9.24995 17.3207C8.83595 16.9067 8.83595 16.2347 9.24995 15.8207L13.071 11.9997Z"
                                          fill="#1563FF"
                                      />
                                  </Svg>
                              </View>
                          </View>
                      </TouchableOpacity>
                      {/*<TouchableOpacity onPress={() => navigation.navigate('CardSettings')}>*/}
                      {/*    <View*/}
                      {/*        style={{*/}
                      {/*            alignItems: 'center',*/}
                      {/*            justifyContent: 'space-between',*/}
                      {/*            display: 'flex',*/}
                      {/*            flexDirection: 'row',*/}
                      {/*            borderRadius: 10,*/}
                      {/*            borderWidth: 1,*/}
                      {/*            borderColor: '#F2F2F2',*/}
                      {/*            paddingVertical: 15,*/}
                      {/*            paddingHorizontal: 15,*/}
                      {/*            marginBottom: 15,*/}
                      {/*        }}>*/}
                      {/*        <View*/}
                      {/*            style={{*/}
                      {/*                alignItems: 'center',*/}
                      {/*                justifyContent: 'space-between',*/}
                      {/*                display: 'flex',*/}
                      {/*                flexDirection: 'row',*/}
                      {/*            }}>*/}
                      {/*            <Svg*/}
                      {/*                width="24"*/}
                      {/*                height="24"*/}
                      {/*                viewBox="0 0 24 24"*/}
                      {/*                fill="none"*/}
                      {/*                xmlns="http://www.w3.org/2000/svg">*/}
                      {/*                <Path*/}
                      {/*                    d="M4 4C2.895 4 2 4.895 2 6C2 6.552 2.448 7 3 7H21C21.552 7 22 6.552 22 6C22 4.895 21.105 4 20 4H4ZM3 10C2.448 10 2 10.448 2 11V18C2 19.105 2.895 20 4 20H20C21.105 20 22 19.105 22 18V11C22 10.448 21.552 10 21 10H3Z"*/}
                      {/*                    fill="#1563FF"*/}
                      {/*                />*/}
                      {/*            </Svg>*/}

                      {/*            <Text style={{fontSize: 16, fontWeight: '400'}}>*/}
                      {/*                {' '}*/}
                      {/*                Saved Card*/}
                      {/*            </Text>*/}
                      {/*        </View>*/}
                      {/*        <View*/}
                      {/*            style={{*/}
                      {/*                alignItems: 'center',*/}
                      {/*                justifyContent: 'space-between',*/}
                      {/*                display: 'flex',*/}
                      {/*                flexDirection: 'row',*/}
                      {/*            }}>*/}
                      {/*            <Text*/}
                      {/*                style={{fontSize: 17, fontWeight: '700', color: '#1563FF'}}>*/}
                      {/*                {' '}*/}
                      {/*                2 cards{' '}*/}
                      {/*            </Text>*/}
                      {/*            <Svg*/}
                      {/*                width="24"*/}
                      {/*                height="24"*/}
                      {/*                viewBox="0 0 24 24"*/}
                      {/*                fill="none"*/}
                      {/*                xmlns="http://www.w3.org/2000/svg">*/}
                      {/*                <Path*/}
                      {/*                    d="M13.071 11.9997L9.24995 8.17866C8.83595 7.76466 8.83595 7.09266 9.24995 6.67866C9.66395 6.26466 10.336 6.26466 10.75 6.67866L15.364 11.2927C15.755 11.6837 15.755 12.3167 15.364 12.7067L10.75 17.3207C10.336 17.7347 9.66395 17.7347 9.24995 17.3207C8.83595 16.9067 8.83595 16.2347 9.24995 15.8207L13.071 11.9997Z"*/}
                      {/*                    fill="#1563FF"*/}
                      {/*                />*/}
                      {/*            </Svg>*/}
                      {/*        </View>*/}
                      {/*    </View>*/}
                      {/*</TouchableOpacity>*/}
                      <TouchableOpacity onPress={() => navigation.navigate('Structure')}>
                          <View
                              style={{
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  display: 'flex',
                                  flexDirection: 'row',
                                  borderRadius: 10,
                                  borderWidth: 1,
                                  borderColor: '#F2F2F2',
                                  paddingVertical: 15,
                                  paddingHorizontal: 15,
                                  marginBottom: 30,
                              }}>
                              <View
                                  style={{
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      display: 'flex',
                                      flexDirection: 'row',
                                  }}>
                                  <Svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                      <Path
                                          d="M17.9063 3.00346C17.8089 3.01268 17.711 3.03723 17.6172 3.07573C17.2432 3.23073 17 3.59456 17 3.99956V5.99956H2.00004V7.99956H17V9.99956C17 10.4036 17.2432 10.7684 17.6172 10.9234C17.7412 10.9744 17.871 10.9996 18 10.9996C18.26 10.9996 18.5161 10.8976 18.7071 10.7066L21.7071 7.70659C22.0981 7.31559 22.0981 6.68252 21.7071 6.29252L18.7071 3.29252C18.4926 3.07802 18.1986 2.97581 17.9063 3.00346ZM6.09379 13.0035C5.80152 12.9758 5.50751 13.078 5.29301 13.2925L2.29301 16.2925C1.90201 16.6825 1.90201 17.3156 2.29301 17.7066L5.29301 20.7066C5.48401 20.8976 5.74004 20.9996 6.00004 20.9996C6.12904 20.9996 6.25885 20.9744 6.38285 20.9234C6.75685 20.7684 7.00004 20.4036 7.00004 19.9996V17.9996H22V15.9996H7.00004V13.9996C7.00004 13.5956 6.75685 13.2307 6.38285 13.0757C6.2891 13.0372 6.19121 13.0127 6.09379 13.0035Z"
                                          fill="#1563FF"
                                      />
                                  </Svg>

                                  <Text style={{fontSize: 16, fontWeight: '400'}}>
                                      {' '}
                                      {t('profileEdit.buttons.Referral')}
                                  </Text>
                              </View>
                              <View
                                  style={{
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      display: 'flex',
                                      flexDirection: 'row',
                                  }}>
                                  <Text
                                      style={{fontSize: 17, fontWeight: '700', color: '#1563FF'}}>
                                      {' '}
                                      {userInfo?.partners || 0} {t('profileEdit.buttons.items')}{' '}
                                  </Text>
                                  <Svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                      <Path
                                          d="M13.071 11.9997L9.24995 8.17866C8.83595 7.76466 8.83595 7.09266 9.24995 6.67866C9.66395 6.26466 10.336 6.26466 10.75 6.67866L15.364 11.2927C15.755 11.6837 15.755 12.3167 15.364 12.7067L10.75 17.3207C10.336 17.7347 9.66395 17.7347 9.24995 17.3207C8.83595 16.9067 8.83595 16.2347 9.24995 15.8207L13.071 11.9997Z"
                                          fill="#1563FF"
                                      />
                                  </Svg>
                              </View>
                          </View>
                      </TouchableOpacity>
                      <View style={{marginBottom: 20}}>
                          <Text style={{fontWeight: '600', fontSize: 18}}>{t('profileEdit.AppSetting.AppSetting')}</Text>
                      </View>
                      <TouchableOpacity onPress={() => navigation.navigate('editpin')}>
                          <View
                              style={{
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  display: 'flex',
                                  flexDirection: 'row',
                                  borderRadius: 10,
                                  borderWidth: 1,
                                  borderColor: '#F2F2F2',
                                  paddingVertical: 15,
                                  paddingHorizontal: 15,
                                  marginBottom: 15,
                              }}>
                              <View
                                  style={{
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      display: 'flex',
                                      flexDirection: 'row',
                                  }}>
                                  <Svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                      <Path
                                          d="M12 1C8.67619 1 6 3.67619 6 7V8C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8V7C18 3.67619 15.3238 1 12 1ZM12 3C14.2762 3 16 4.72381 16 7V8H8V7C8 4.72381 9.72381 3 12 3ZM12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13Z"
                                          fill="#1563FF"
                                      />
                                  </Svg>
                                  <Text style={{fontSize: 16, fontWeight: '400'}}>
                                      {' '}
                                      {t('profileEdit.AppSetting.SecurityPin')}
                                  </Text>
                              </View>
                              <View
                                  style={{
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      display: 'flex',
                                      flexDirection: 'row',
                                  }}>
                                  <Svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                      <Path
                                          d="M13.071 11.9997L9.24995 8.17866C8.83595 7.76466 8.83595 7.09266 9.24995 6.67866C9.66395 6.26466 10.336 6.26466 10.75 6.67866L15.364 11.2927C15.755 11.6837 15.755 12.3167 15.364 12.7067L10.75 17.3207C10.336 17.7347 9.66395 17.7347 9.24995 17.3207C8.83595 16.9067 8.83595 16.2347 9.24995 15.8207L13.071 11.9997Z"
                                          fill="#1563FF"
                                      />
                                  </Svg>
                              </View>
                          </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => navigation.navigate('Help')}>
                          <View
                              style={{
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  display: 'flex',
                                  flexDirection: 'row',
                                  borderRadius: 10,
                                  borderWidth: 1,
                                  borderColor: '#F2F2F2',
                                  paddingVertical: 15,
                                  paddingHorizontal: 15,
                                  marginBottom: 15,
                              }}>
                              <View
                                  style={{
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      display: 'flex',
                                      flexDirection: 'row',
                                  }}>
                                  <Svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                      <Path
                                          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12.5 19H11.5C11.224 19 11 18.776 11 18.5V17.5C11 17.224 11.224 17 11.5 17H12.5C12.776 17 13 17.224 13 17.5V18.5C13 18.776 12.776 19 12.5 19ZM15.07 11.25L14.17 12.17C13.45 12.9 13 13.5 13 15H11V14.5C11 13.4 11.45 12.4 12.17 11.67L13.41 10.41C13.867 9.966 14.095 9.308 13.963 8.607C13.828 7.89 13.275 7.28 12.574 7.081C11.468 6.767 10.437 7.4 10.108 8.353C9.98 8.724 9.668 9 9.275 9H8.984C8.403 9 7.997 8.436 8.159 7.878C8.588 6.406 9.84 5.285 11.384 5.047C12.908 4.812 14.353 5.596 15.257 6.846C16.437 8.478 16.089 10.231 15.07 11.25Z"
                                          fill="#1563FF"
                                      />
                                  </Svg>
                                  <Text style={{fontSize: 16, fontWeight: '400'}}> {t('profileEdit.AppSetting.Help')}</Text>
                              </View>
                              <View
                                  style={{
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      display: 'flex',
                                      flexDirection: 'row',
                                  }}>
                                  <Svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                      <Path
                                          d="M13.071 11.9997L9.24995 8.17866C8.83595 7.76466 8.83595 7.09266 9.24995 6.67866C9.66395 6.26466 10.336 6.26466 10.75 6.67866L15.364 11.2927C15.755 11.6837 15.755 12.3167 15.364 12.7067L10.75 17.3207C10.336 17.7347 9.66395 17.7347 9.24995 17.3207C8.83595 16.9067 8.83595 16.2347 9.24995 15.8207L13.071 11.9997Z"
                                          fill="#1563FF"
                                      />
                                  </Svg>
                              </View>
                          </View>
                      </TouchableOpacity>
                      <TouchableOpacity>
                          <View
                              style={{
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  display: 'flex',
                                  flexDirection: 'row',
                                  borderRadius: 10,
                                  borderWidth: 1,
                                  borderColor: '#F2F2F2',
                                  paddingVertical: 15,
                                  paddingHorizontal: 15,
                                  marginBottom: 15,
                              }}>
                              <View
                                  style={{
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      display: 'flex',
                                      flexDirection: 'row',
                                  }}>
                                  <Svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                      <Path
                                          d="M5 1C3.9 1 3 1.9 3 3V16C3 16.552 3.448 17 4 17C4.552 17 5 16.552 5 16V4C5 3.448 5.448 3 6 3H16C16.552 3 17 2.552 17 2C17 1.448 16.552 1 16 1H5ZM9 5C7.9 5 7 5.9 7 7V21C7 22.1 7.9 23 9 23H20C21.1 23 22 22.1 22 21V7C22 5.895 21.105 5 20 5H9ZM12 9H17C17.552 9 18 9.448 18 10C18 10.552 17.552 11 17 11H12C11.448 11 11 10.552 11 10C11 9.448 11.448 9 12 9ZM12 13H17C17.552 13 18 13.448 18 14C18 14.552 17.552 15 17 15H12C11.448 15 11 14.552 11 14C11 13.448 11.448 13 12 13ZM12 17H17C17.552 17 18 17.448 18 18C18 18.552 17.552 19 17 19H12C11.448 19 11 18.552 11 18C11 17.448 11.448 17 12 17Z"
                                          fill="#1563FF"
                                      />
                                  </Svg>
                                  <Text style={{fontSize: 16, fontWeight: '400'}}>
                                      {' '}
                                      {t('profileEdit.AppSetting.TermCondition')}
                                  </Text>
                              </View>
                              <View
                                  style={{
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      display: 'flex',
                                      flexDirection: 'row',
                                  }}>
                                  <Svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                      <Path
                                          d="M13.071 11.9997L9.24995 8.17866C8.83595 7.76466 8.83595 7.09266 9.24995 6.67866C9.66395 6.26466 10.336 6.26466 10.75 6.67866L15.364 11.2927C15.755 11.6837 15.755 12.3167 15.364 12.7067L10.75 17.3207C10.336 17.7347 9.66395 17.7347 9.24995 17.3207C8.83595 16.9067 8.83595 16.2347 9.24995 15.8207L13.071 11.9997Z"
                                          fill="#1563FF"
                                      />
                                  </Svg>
                              </View>
                          </View>
                      </TouchableOpacity>
                      <TouchableOpacity>
                          <View
                              style={{
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  display: 'flex',
                                  flexDirection: 'row',
                                  borderRadius: 10,
                                  borderWidth: 1,
                                  borderColor: '#F2F2F2',
                                  paddingVertical: 15,
                                  paddingHorizontal: 15,
                                  marginBottom: 15,
                              }}>
                              <View
                                  style={{
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      display: 'flex',
                                      flexDirection: 'row',
                                  }}>
                                  <Svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                      <Path
                                          d="M12 1C8.67619 1 6 3.67619 6 7V8C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8V7C18 3.67619 15.3238 1 12 1ZM12 3C14.2762 3 16 4.72381 16 7V8H8V7C8 4.72381 9.72381 3 12 3ZM12 11C14.2 11 16 12.8 16 15C16 17.2 14.2 19 12 19C9.8 19 8 17.2 8 15C8 12.8 9.8 11 12 11ZM12 13C10.895 13 10 13.895 10 15C10 16.105 10.895 17 12 17C13.105 17 14 16.105 14 15C14 14.795 13.9593 14.602 13.9023 14.416C13.7443 14.759 13.403 15 13 15C12.448 15 12 14.552 12 14C12 13.597 12.241 13.2557 12.584 13.0977C12.398 13.0407 12.205 13 12 13Z"
                                          fill="#1563FF"
                                      />
                                  </Svg>
                                  <Text style={{fontSize: 16, fontWeight: '400'}}>
                                      {' '}
                                      {t('profileEdit.AppSetting.PrivacyPolicy')}
                                  </Text>
                              </View>
                              <View
                                  style={{
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      display: 'flex',
                                      flexDirection: 'row',
                                  }}>
                                  <Svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                      <Path
                                          d="M13.071 11.9997L9.24995 8.17866C8.83595 7.76466 8.83595 7.09266 9.24995 6.67866C9.66395 6.26466 10.336 6.26466 10.75 6.67866L15.364 11.2927C15.755 11.6837 15.755 12.3167 15.364 12.7067L10.75 17.3207C10.336 17.7347 9.66395 17.7347 9.24995 17.3207C8.83595 16.9067 8.83595 16.2347 9.24995 15.8207L13.071 11.9997Z"
                                          fill="#1563FF"
                                      />
                                  </Svg>
                              </View>
                          </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => navigation.navigate('contact')}>
                          <View
                              style={{
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  display: 'flex',
                                  flexDirection: 'row',
                                  borderRadius: 10,
                                  borderWidth: 1,
                                  borderColor: '#F2F2F2',
                                  paddingVertical: 15,
                                  paddingHorizontal: 15,
                                  marginBottom: 35,
                              }}>
                              <View
                                  style={{
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      display: 'flex',
                                      flexDirection: 'row',
                                  }}>
                                  <Svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                      <Path
                                          d="M3 3C1.895 3 1 3.895 1 5V19C1 20.105 1.895 21 3 21H11V19.3848C11 17.4968 12.1413 15.8954 13.9473 14.9414C13.3553 14.1194 13 13.112 13 12C13 10.37 13.792 8.93544 15 8.02344V5C15 3.895 14.105 3 13 3H3ZM5.5 7H6.5C6.776 7 7 7.224 7 7.5V8.5C7 8.776 6.776 9 6.5 9H5.5C5.224 9 5 8.776 5 8.5V7.5C5 7.224 5.224 7 5.5 7ZM9.5 7H10.5C10.776 7 11 7.224 11 7.5V8.5C11 8.776 10.776 9 10.5 9H9.5C9.224 9 9 8.776 9 8.5V7.5C9 7.224 9.224 7 9.5 7ZM18 9C17.2044 9 16.4413 9.31607 15.8787 9.87868C15.3161 10.4413 15 11.2044 15 12C15 12.7956 15.3161 13.5587 15.8787 14.1213C16.4413 14.6839 17.2044 15 18 15C18.7956 15 19.5587 14.6839 20.1213 14.1213C20.6839 13.5587 21 12.7956 21 12C21 11.2044 20.6839 10.4413 20.1213 9.87868C19.5587 9.31607 18.7956 9 18 9ZM5.5 11H6.5C6.776 11 7 11.224 7 11.5V12.5C7 12.776 6.776 13 6.5 13H5.5C5.224 13 5 12.776 5 12.5V11.5C5 11.224 5.224 11 5.5 11ZM9.5 11H10.5C10.776 11 11 11.224 11 11.5V12.5C11 12.776 10.776 13 10.5 13H9.5C9.224 13 9 12.776 9 12.5V11.5C9 11.224 9.224 11 9.5 11ZM5.5 15H6.5C6.776 15 7 15.224 7 15.5V16.5C7 16.776 6.776 17 6.5 17H5.5C5.224 17 5 16.776 5 16.5V15.5C5 15.224 5.224 15 5.5 15ZM9.5 15H10.5C10.776 15 11 15.224 11 15.5V16.5C11 16.776 10.776 17 10.5 17H9.5C9.224 17 9 16.776 9 16.5V15.5C9 15.224 9.224 15 9.5 15ZM18 16C15.149 16 13 17.4558 13 19.3848V20C13 20.552 13.448 21 14 21H22C22.552 21 23 20.552 23 20V19.3848C23 17.4558 20.851 16 18 16Z"
                                          fill="#1563FF"
                                      />
                                  </Svg>
                                  <Text style={{fontSize: 16, fontWeight: '400'}}> {t('profileEdit.AppSetting.Contact')}</Text>
                              </View>
                              <View
                                  style={{
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      display: 'flex',
                                      flexDirection: 'row',
                                  }}>
                                  <Svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                      <Path
                                          d="M13.071 11.9997L9.24995 8.17866C8.83595 7.76466 8.83595 7.09266 9.24995 6.67866C9.66395 6.26466 10.336 6.26466 10.75 6.67866L15.364 11.2927C15.755 11.6837 15.755 12.3167 15.364 12.7067L10.75 17.3207C10.336 17.7347 9.66395 17.7347 9.24995 17.3207C8.83595 16.9067 8.83595 16.2347 9.24995 15.8207L13.071 11.9997Z"
                                          fill="#1563FF"
                                      />
                                  </Svg>
                              </View>
                          </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={logout}>
                          <View
                              style={{
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  display: 'flex',
                                  flexDirection: 'row',
                                  borderRadius: 10,
                                  backgroundColor: '#FF4444',
                                  paddingVertical: 15,
                                  paddingHorizontal: 15,
                                  marginBottom: 15,
                              }}>
                              <View
                                  style={{
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      display: 'flex',
                                      flexDirection: 'row',
                                  }}>
                                  <Svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                      <Path
                                          d="M8 2C6.895 2 6 2.895 6 4V20C6 21.105 6.895 22 8 22H16C17.105 22 18 21.105 18 20V13H12C11.448 13 11 12.552 11 12C11 11.448 11.448 11 12 11H18V4C18 2.895 17.105 2 16 2H8ZM18 11V13H20V14.4004C20 14.7234 20.1951 15.0147 20.4941 15.1387C20.5931 15.1797 20.6978 15.1992 20.8008 15.1992C21.0088 15.1992 21.2112 15.1198 21.3652 14.9668L23.7656 12.5645C24.0776 12.2525 24.0776 11.7456 23.7656 11.4336L21.3652 9.0332C21.1362 8.8052 20.7941 8.73833 20.4941 8.86133C20.1951 8.98533 20 9.27661 20 9.59961V11H18Z"
                                          fill="white"
                                      />
                                  </Svg>
                                  <Text style={{fontSize: 16, fontWeight: '400', color: '#fff'}}>
                                      {' '}
                                      {t('profileEdit.AppSetting.LogOut')}
                                  </Text>
                              </View>
                              <View
                                  style={{
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      display: 'flex',
                                      flexDirection: 'row',
                                  }}>
                                  <Svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                      <Path
                                          d="M13.071 11.9997L9.24995 8.17866C8.83595 7.76466 8.83595 7.09266 9.24995 6.67866C9.66395 6.26466 10.336 6.26466 10.75 6.67866L15.364 11.2927C15.755 11.6837 15.755 12.3167 15.364 12.7067L10.75 17.3207C10.336 17.7347 9.66395 17.7347 9.24995 17.3207C8.83595 16.9067 8.83595 16.2347 9.24995 15.8207L13.071 11.9997Z"
                                          fill="white"
                                      />
                                  </Svg>
                              </View>
                          </View>
                      </TouchableOpacity>
                  </View>
              </>
          )}
      </ScrollView>
    </SafeAreaView>
  );
}
export default SettingsScreen;
