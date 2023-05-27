import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import bg from '../../assets/background/image.png';
import profile from '../../assets/profile/image.png';
import us from '../../assets/Avatar/structureavatar/user/image.png';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../actions/app.actions';
import {useNavigation} from '@react-navigation/native';
import Svg, {Path} from 'react-native-svg';
import avatars from '../../assets/Avatar/image.png';
import {api, baseURLAvatar} from "../../api";
import {useTranslation} from "react-i18next";

function StructureProfile({
  route: {
    params: {id},
  },
}) {
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(false);
  const [dataUser, setDataUser]=useState(null)
    const userInfo = useSelector(state => state.app.user);
    const {t} = useTranslation('common');
  const dispatch = useDispatch();
  useEffect(()=>{
      api.getUserStructureId(id)
          .then(response=>{
              setDataUser(response)
          })
          .catch(error=>{
              console.log(error)
          })
  },[id])
  const onRefresh = async () => {
    try {
      setRefresh(true);
      dispatch(actions.userInfo());
    } finally {
      setRefresh(false);
    }
  };
  console.log(dataUser && dataUser)
  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <ScrollView
        contentContainerStyle={{width: '100%', flexGrow: 1, height: 'auto'}}
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }>
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
                  {dataUser && (
                      <>
                          <View
                              style={{
                                  marginTop: 40,
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  display: 'flex',
                                  flexDirection: 'row',
                                  paddingHorizontal: 25,
                                  marginBottom: 30,
                              }}>
                              <View>
                                  <Text style={{color: '#FFF', fontWeight: '700', fontSize: 22}}>
                                      {t('homescreen.userInfo.balance')}
                                  </Text>
                                  <Text style={{color: '#FFF', fontWeight: '500', fontSize: 17}}>
                                      {userInfo.balance} $
                                  </Text>
                                  <Text style={{color: '#FFF', fontWeight: '500', fontSize: 17}}>
                                      {userInfo.trx} TRX
                                  </Text>
                              </View>
                              {userInfo?.avatar ?(
                                  <Image
                                      source={{uri: `${baseURLAvatar}/${userInfo.avatar}`}}
                                      style={{
                                          width: 52.99,
                                          height: 52.99,
                                          borderRadius: 50
                                      }}
                                  />
                              ):(
                                  <Image
                                      source={profile}
                                      style={{
                                          width: 52.99,
                                          height: 52.99,
                                      }}
                                  />
                              )}
                          </View>
                          <View
                              style={{
                                  backgroundColor: '#1563FF',
                                  paddingVertical: 10,
                                  width: '100%',
                              }}>
                              <View
                                  style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      paddingHorizontal: 25,

                                  }}>
                                  <TouchableOpacity onPress={() => navigation.goBack()}>
                                      <Svg
                                          onPress={() => navigation.goBack()}
                                          width="18"
                                          height="14"
                                          viewBox="0 0 18 14"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <Path
                                              d="M7.00004 0.341797C6.74416 0.341797 6.48801 0.441219 6.29301 0.636719L0.636756 6.29297C0.245756 6.68397 0.245756 7.31703 0.636756 7.70703L6.29301 13.3633C6.68401 13.7543 7.31707 13.7543 7.70707 13.3633L7.79301 13.2773C8.18401 12.8863 8.18401 12.2533 7.79301 11.8633L3.92972 8H17C17.552 8 18 7.552 18 7C18 6.448 17.552 6 17 6H3.92972L7.79301 2.13672C8.18401 1.74572 8.18401 1.11266 7.79301 0.722656L7.70707 0.636719C7.51157 0.441219 7.25591 0.341797 7.00004 0.341797Z"
                                              fill="white"
                                          />
                                      </Svg>
                                  </TouchableOpacity>
                                  <View style={{ alignItems: 'center',
                                      justifyContent: 'center',paddingEnd: '30%'}}>
                                      <Text
                                          style={{
                                              textAlign: 'center',
                                              color: '#FFFFFF',
                                              fontSize: 16,
                                              fontWeight: '500',
                                          }}>
                                          {t('referallscreen.button')}
                                      </Text>
                                  </View>
                              </View>
                          </View>
                          <View style={{backgroundColor: '#fff'}}>
                              <View style={{paddingVertical: 5}}>
                                  <Image
                                      source={bg}
                                      style={{
                                          width: '100%',
                                          height: 160,
                                          position: 'absolute',
                                          top: 0,
                                          left: 0,
                                      }}
                                  />
                                  <View
                                      style={{
                                          paddingHorizontal: 25,
                                          alignItems: 'center',
                                          justifyContent: 'space-between',
                                          display: 'flex',
                                          flexDirection: 'row',
                                      }}>
                                      {dataUser.avatar? (
                                          <Image
                                              source={{uri: `${baseURLAvatar}/${dataUser.avatar}`}}
                                              style={{
                                                  width: 130,
                                                  height: 130,
                                                  borderRadius: 70
                                              }}
                                          />
                                      ):(
                                          <Image
                                              source={us}
                                              style={{
                                                  width: 130,
                                                  height: 130,
                                              }}
                                          />
                                      )}
                                      <View>
                                          <Text
                                              style={{fontWeight: '700', fontSize: 20, marginBottom: 5}}>
                                              {dataUser.last_name}
                                          </Text>
                                          <Text
                                              style={{fontWeight: '700', fontSize: 14, marginBottom: 1}}>
                                              {t('StructureProfile.Login')}:
                                          </Text>
                                          <Text style={{fontWeight: '400', fontSize: 13}}>
                                              {dataUser.username || 'Логин не указан'}
                                          </Text>
                                          <Text
                                              style={{fontWeight: '700', fontSize: 14, marginBottom: 1}}>
                                              {t('StructureProfile.registration')} :
                                          </Text>
                                          <Text
                                              style={{fontWeight: '400', fontSize: 13, marginBottom: 2}}>
                                              {dataUser.createdAt}
                                          </Text>
                                          <Text
                                              style={{fontWeight: '700', fontSize: 14, marginBottom: 1}}>
                                              {t('StructureProfile.Sponsor')}
                                          </Text>
                                          <Text
                                              style={{fontWeight: '700', fontSize: 14, marginBottom: 5}}>
                                              {dataUser.inviter.last_name}
                                          </Text>
                                      </View>
                                  </View>
                              </View>
                          </View>
                          <View style={{paddingHorizontal: 25, paddingVertical: 5}}>
                              <Text style={{fontWeight: '700', fontSize: 22, marginBottom: 5}}>
                                  {t('StructureProfile.Promotion')}:
                              </Text>
                          </View>
                          <View
                              style={{
                                  backgroundColor: '#D4EDFF',
                                  height: 59,
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  display: 'flex',
                                  flexDirection: 'row',
                                  marginBottom: 5,
                              }}>
                              <Text
                                  style={{
                                      color: '#000000',
                                      paddingLeft: 15,
                                      fontSize: 22,
                                      fontWeight: '700',
                                  }}>
                                  {t('StructureProfile.tarifs')} :
                              </Text>
                              <Text
                                  style={{
                                      color: '#000000',
                                      paddingRight: 15,
                                      fontSize: 22,
                                      fontWeight: '700',
                                  }}>
                                  {t('StructureProfile.turn')} :
                              </Text>
                          </View>
                          {dataUser?.type_matrix && (
                              <>
                                  {dataUser.type_matrix.map((items)=>(
                                      <View
                                          style={{
                                              borderBottomWidth: 1,
                                              borderBottomColor: '#949494',
                                          }}>
                                          <TouchableOpacity>
                                              <View
                                                  style={{
                                                      alignItems: 'center',
                                                      justifyContent: 'space-between',
                                                      display: 'flex',
                                                      flexDirection: 'row',
                                                      paddingHorizontal: 10,
                                                      paddingVertical: 10,
                                                  }}>
                                                  <View
                                                      style={{
                                                          alignItems: 'center',
                                                          justifyContent: 'space-between',
                                                          display: 'flex',
                                                          flexDirection: 'row',
                                                      }}>
                                                      <View>
                                                          {dataUser.avatar?(
                                                              <Image source={{uri: `${baseURLAvatar}/${dataUser.avatar}`}} style={{width: 46, height: 46, borderRadius: 50}} />
                                                          ):(
                                                              <Image source={avatars} style={{width: 46, height: 46}} />
                                                          )}
                                                      </View>
                                                      <View>
                                                          <Text
                                                              style={{
                                                                  marginHorizontal: 10,
                                                                  fontSize: 16,
                                                                  fontWeight: 'bold',
                                                              }}>
                                                              {items.name} {items.summ}
                                                          </Text>
                                                      </View>
                                                  </View>
                                                  <Text
                                                      style={{
                                                          color: '#949494',
                                                          fontWeight: '400',
                                                          fontSize: 22,
                                                          textAlign: 'center',
                                                      }}>
                                                      {items.count}
                                                  </Text>
                                              </View>
                                          </TouchableOpacity>
                                      </View>
                                  ))}
                              </>
                          )}
                      </>
                  )}
              </>
          )}
      </ScrollView>
    </SafeAreaView>
  );
}
export default StructureProfile;
