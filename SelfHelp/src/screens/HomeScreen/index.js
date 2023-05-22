import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import bg from '../../assets/background/image.png';
import profile from '../../assets/profile/image.png';
import checkout from '../../assets/checkout/image.png';
import avatars from '../../assets/Avatar/image.png';
import {useDispatch} from 'react-redux';
import * as actions from '../../actions/app.actions';
import {useNavigation} from '@react-navigation/native';

function HomeScreen() {
  const navigation = useNavigation();
  const [tarif1, setTarif1] = useState(false);
  const [tarif2, setTarif2] = useState(false);
  const [tarif3, setTarif3] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
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
                Баланс:
              </Text>
              <Text style={{color: '#FFF', fontWeight: '500', fontSize: 17}}>
                3,530 $
              </Text>
              <Text style={{color: '#FFF', fontWeight: '500', fontSize: 17}}>
                55,49231 TRX
              </Text>
            </View>
            <Image
              source={profile}
              style={{
                width: 52.99,
                height: 52.99,
              }}
            />
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
              55,49231 TRX
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
              Ваше продвижение в системе
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
              Тарифы:
            </Text>
            <Text
              style={{
                color: '#000000',
                paddingRight: 15,
                fontSize: 22,
                fontWeight: '700',
              }}>
              К-во участников:
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: tarif1 ? 0 : 1,
              borderBottomColor: '#949494',
            }}>
            <TouchableOpacity
              onPress={() => {
                setTarif1(!tarif1);
              }}>
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
                    <Image source={avatars} style={{width: 46, height: 46}} />
                  </View>
                  <View>
                    <Text
                      style={{
                        marginHorizontal: 10,
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      START TRX-5
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
                  119
                </Text>
              </View>
            </TouchableOpacity>
            {tarif1 && (
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#949494',
                  paddingHorizontal: 5,
                  paddingVertical: 10,
                  borderTopWidth: 1,
                  borderTopColor: '#949494',
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#1563FF',
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
                    присоеденится
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View
            style={{
              borderBottomWidth: tarif2 ? 0 : 1,
              borderBottomColor: '#949494',
            }}>
            <TouchableOpacity
              onPress={() => {
                setTarif2(!tarif2);
              }}>
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
                    <Image source={avatars} style={{width: 46, height: 46}} />
                  </View>
                  <View>
                    <Text
                      style={{
                        marginHorizontal: 10,
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      START TRX-5
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
                  119
                </Text>
              </View>
            </TouchableOpacity>
            {tarif2 && (
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#949494',
                  paddingHorizontal: 5,
                  paddingVertical: 10,
                  borderTopWidth: 1,
                  borderTopColor: '#949494',
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#1563FF',
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
                    присоеденится
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={{marginBottom: 20}}>
            <TouchableOpacity
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#949494',
              }}
              onPress={() => {
                setTarif3(!tarif3);
              }}>
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
                    <Image source={avatars} style={{width: 46, height: 46}} />
                  </View>
                  <View>
                    <Text
                      style={{
                        marginHorizontal: 10,
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      START TRX-5
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
                  119
                </Text>
              </View>
            </TouchableOpacity>
            {tarif3 && (
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#949494',
                  paddingHorizontal: 5,
                  paddingVertical: 10,
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#1563FF',
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
                    присоеденится
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
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
                Ваши Рефералы
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
export default HomeScreen;
