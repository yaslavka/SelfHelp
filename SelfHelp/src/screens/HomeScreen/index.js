import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
    Alert
} from 'react-native';
import bg from '../../assets/background/image.png';
import profile from '../../assets/profile/image.png';
import checkout from '../../assets/checkout/image.png';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../actions/app.actions';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from "react-i18next";
import {api, baseURLAvatar} from "../../api";
import MatrixMap from "./matrixMap";

function HomeScreen() {
  const navigation = useNavigation();
  const userInfo = useSelector(state => state.app.user);
  const {t} = useTranslation('common');
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const [matrixTypes, setMatrixTypes] = useState(null);

  useEffect(()=>{
      api
          .getMatrixTypes()
          .then(response=>{
              setMatrixTypes(response)
          })
          .catch(err=>{
              Alert.alert(err.message)
          })
  },[])
  const onRefresh = async () => {
    try {
      setRefresh(true);
      dispatch(actions.userInfo());
    } finally {
      setRefresh(false);
    }
  };
  return (
    <>
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
                    <View
                        style={{
                            marginTop: 40,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            display: 'flex',
                            flexDirection: 'row',
                            marginHorizontal: 25,
                            marginBottom: 60,
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
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 20,
                        }}>
                        <Image
                            source={checkout}
                            style={{
                                width: 370,
                                height: 170,
                            }}
                        />
                        <Text
                            style={{
                                color: '#FFF',
                                fontWeight: '600',
                                fontSize: 25,
                                position: 'absolute',
                            }}>
                            {userInfo.trx} TRX
                        </Text>
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 25,
                        }}>
                        <Text
                            style={{
                                color: '#000000',
                                fontWeight: '700',
                                fontSize: 22,
                                position: 'absolute',
                            }}>
                            {t('homescreen.userInfo.nexst')}
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
                            marginBottom: 20,
                        }}>
                        <Text
                            style={{
                                color: '#000000',
                                paddingLeft: 15,
                                fontSize: 22,
                                fontWeight: '700',
                            }}>
                            {t('homescreen.userInfo.tarifs')}
                        </Text>
                        <Text
                            style={{
                                color: '#000000',
                                paddingRight: 15,
                                fontSize: 22,
                                fontWeight: '700',
                            }}>
                            {t('homescreen.userInfo.countUsers')}
                        </Text>
                    </View>
                    {matrixTypes && (
                        <>
                            {matrixTypes.map((matrix)=>(
                                <>
                                    <View id={matrix.id}
                                        style={{
                                            borderBottomWidth: 1,
                                            borderBottomColor: '#949494',
                                        }}>
                                        <MatrixMap matrix={matrix} key={matrix.id}/>
                                    </View>
                                </>
                            ))}
                        </>
                    )}
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: 5,
                            paddingVertical: 10,
                            marginBottom: 20,
                        }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Referral')}
                            style={{
                                backgroundColor: '#8B42E9',
                                width: '100%',
                                height: 46,
                                borderRadius: 9,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    color: '#fff',
                                    fontWeight: '600',
                                    fontSize: 17,
                                }}>
                                {t('homescreen.buttons.Referral')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
export default HomeScreen;
