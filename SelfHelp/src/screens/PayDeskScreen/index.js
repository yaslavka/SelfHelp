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
import {useDispatch} from 'react-redux';
import * as actions from '../../actions/app.actions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function PayDeskScreen() {
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
            marginBottom: 25,
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
        <View style={{backgroundColor: '#282828', height: 35}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              fontWeight: '700',
              paddingVertical: 5,
              paddingHorizontal: 25,
            }}>
            START
          </Text>
        </View>

        <View style={{backgroundColor: '#D6D6D6'}}>
          <View
            style={{
              paddingHorizontal: 25,
              paddingVertical: 5,
              alignItems: 'flex-start',
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-evenly',
                display: 'flex',
                flexDirection: 'row',
              }}>
              <View>
                <Text
                  style={{color: '#2C2C2C', fontWeight: '700', fontSize: 17}}>
                  INPUT:
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{color: '#2C2C2C', fontWeight: '700', fontSize: 17}}>
                    TRX:{' '}
                  </Text>
                  <Text> 0.01 </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name={'arrow-right-thick'}
                size={35}
                color={'rgba(0, 0, 0, 0.25)'}
              />
              <View>
                <Text
                  style={{color: '#2C2C2C', fontWeight: '700', fontSize: 17}}>
                  {' '}
                  OUTPUT:{' '}
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{color: '#2C2C2C', fontWeight: '700', fontSize: 17}}>
                    {' '}
                    TRX:{' '}
                  </Text>
                  <Text
                    style={{color: '#2C2C2C', fontWeight: '400', fontSize: 16}}>
                    {' '}
                    0.01{' '}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                display: 'flex',
                flexDirection: 'row',
              }}>
              <Text style={{color: '#2C2C2C', fontWeight: '700', fontSize: 17}}>
                Members:{' '}
              </Text>
              <Text style={{color: '#2C2C2C', fontWeight: '400', fontSize: 16}}>
                {' '}
                12
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                display: 'flex',
                flexDirection: 'row',
              }}>
              <Text style={{color: '#2C2C2C', fontWeight: '700', fontSize: 17}}>
                Budget: TRX{' '}
              </Text>
              <Text style={{color: '#2C2C2C', fontWeight: '400', fontSize: 16}}>
                {' '}
                250
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 25,
              paddingVertical: 10,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#1563FF',
                width: '100%',
                height: 50,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#FFF', fontSize: 17, fontWeight: '600'}}>
                JOIN
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{backgroundColor: '#8C8C8C', height: 35}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              fontWeight: '700',
              paddingVertical: 5,
              paddingHorizontal: 25,
            }}>
            INVEST
          </Text>
        </View>

        <View style={{backgroundColor: '#D6D6D6'}}>
          <View
            style={{
              paddingHorizontal: 25,
              paddingVertical: 5,
              alignItems: 'flex-start',
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-evenly',
                display: 'flex',
                flexDirection: 'row',
              }}>
              <View>
                <Text
                  style={{color: '#2C2C2C', fontWeight: '700', fontSize: 17}}>
                  INPUT:
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{color: '#2C2C2C', fontWeight: '700', fontSize: 17}}>
                    TRX:{' '}
                  </Text>
                  <Text> 0.01 </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name={'arrow-right-thick'}
                size={35}
                color={'rgba(0, 0, 0, 0.25)'}
              />
              <View>
                <Text
                  style={{color: '#2C2C2C', fontWeight: '700', fontSize: 17}}>
                  {' '}
                  OUTPUT:{' '}
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{color: '#2C2C2C', fontWeight: '700', fontSize: 17}}>
                    {' '}
                    TRX:{' '}
                  </Text>
                  <Text
                    style={{color: '#2C2C2C', fontWeight: '400', fontSize: 16}}>
                    {' '}
                    0.01{' '}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                display: 'flex',
                flexDirection: 'row',
              }}>
              <Text style={{color: '#2C2C2C', fontWeight: '700', fontSize: 17}}>
                Members:{' '}
              </Text>
              <Text style={{color: '#2C2C2C', fontWeight: '400', fontSize: 16}}>
                {' '}
                12
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                display: 'flex',
                flexDirection: 'row',
              }}>
              <Text style={{color: '#2C2C2C', fontWeight: '700', fontSize: 17}}>
                Budget: TRX{' '}
              </Text>
              <Text style={{color: '#2C2C2C', fontWeight: '400', fontSize: 16}}>
                {' '}
                250
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 25,
              paddingVertical: 10,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#4F4F4F',
                width: '100%',
                height: 50,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#FFF', fontSize: 17, fontWeight: '600'}}>
                JOIN
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{backgroundColor: '#8C8C8C', height: 35}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              fontWeight: '700',
              paddingVertical: 5,
              paddingHorizontal: 25,
            }}>
            PROFI
          </Text>
        </View>

        <View style={{backgroundColor: '#D6D6D6'}}>
          <View
            style={{
              paddingHorizontal: 25,
              paddingVertical: 5,
              alignItems: 'flex-start',
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-evenly',
                display: 'flex',
                flexDirection: 'row',
              }}>
              <View>
                <Text
                  style={{color: '#2C2C2C', fontWeight: '700', fontSize: 17}}>
                  INPUT:
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{color: '#2C2C2C', fontWeight: '700', fontSize: 17}}>
                    TRX:{' '}
                  </Text>
                  <Text> 0.01 </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name={'arrow-right-thick'}
                size={35}
                color={'rgba(0, 0, 0, 0.25)'}
              />
              <View>
                <Text
                  style={{color: '#2C2C2C', fontWeight: '700', fontSize: 17}}>
                  {' '}
                  OUTPUT:{' '}
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{color: '#2C2C2C', fontWeight: '700', fontSize: 17}}>
                    {' '}
                    TRX:{' '}
                  </Text>
                  <Text
                    style={{color: '#2C2C2C', fontWeight: '400', fontSize: 16}}>
                    {' '}
                    0.01{' '}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                display: 'flex',
                flexDirection: 'row',
              }}>
              <Text style={{color: '#2C2C2C', fontWeight: '700', fontSize: 17}}>
                Members:{' '}
              </Text>
              <Text style={{color: '#2C2C2C', fontWeight: '400', fontSize: 16}}>
                {' '}
                12
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                display: 'flex',
                flexDirection: 'row',
              }}>
              <Text style={{color: '#2C2C2C', fontWeight: '700', fontSize: 17}}>
                Budget: TRX{' '}
              </Text>
              <Text style={{color: '#2C2C2C', fontWeight: '400', fontSize: 16}}>
                {' '}
                250
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 25,
              paddingVertical: 10,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#4F4F4F',
                width: '100%',
                height: 50,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#FFF', fontSize: 17, fontWeight: '600'}}>
                JOIN
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default PayDeskScreen;
