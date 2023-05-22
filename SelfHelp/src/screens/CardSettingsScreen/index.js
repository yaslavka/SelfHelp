import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {useDispatch} from 'react-redux';
import * as actions from '../../actions/app.actions';
import master from '../../assets/cards/master.png';
import visa from '../../assets/cards/visa.png';
import {useNavigation} from '@react-navigation/native';

function CardSettingsScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
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
          <View
            style={{
              paddingTop: 30,
              paddingHorizontal: 25,
            }}>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('editcard')}
                style={{
                  borderWidth: 1,
                  paddingVertical: 15,
                  paddingHorizontal: 2,
                  borderColor: '#D7D7D7',
                  borderRadius: 10,
                  marginBottom: 20, width: '100%'
                }}>
                <View
                  style={{
                      alignItems: 'center',
                      justifyContent: 'space-between', flexDirection: 'row',
                  }}>
                  <Image
                    source={master}
                    style={{
                      width: 72,
                      height: 56,
                      marginHorizontal: 20,
                    }}
                  />
                  <View style={{alignItems: 'flex-end', marginHorizontal: 20}}>
                    <Text
                      style={{

                        color: '#949494',
                        fontWeight: '400',
                        fontSize: 14,
                      }}>
                      MasterCard
                    </Text>
                    <Text
                      style={{
                        justifyContent: 'flex-end',
                        fontWeight: '600',
                        fontSize: 16,
                      }}>
                      4246 7515 4553 5246
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('editcard')}
                style={{
                  borderWidth: 1,
                  paddingVertical: 15,
                  paddingHorizontal: 2,
                  borderColor: '#D7D7D7',
                  borderRadius: 10,
                  marginBottom: 20, width: '100%'
                }}>
                <View
                  style={{
                      alignItems: 'center',
                      justifyContent: 'space-between', flexDirection: 'row',
                  }}>
                  <Image
                    source={visa}
                    style={{
                      width: 72,
                      height: 56,
                      marginHorizontal: 20,
                    }}
                  />
                  <View style={{alignItems: 'flex-end', marginHorizontal: 20}}>
                    <Text
                      style={{
                        justifyContent: 'flex-end',
                        color: '#949494',
                        fontWeight: '400',
                        fontSize: 14,
                      }}>
                      VISA
                    </Text>
                    <Text
                      style={{
                        justifyContent: 'flex-end',
                        fontWeight: '600',
                        fontSize: 16,
                      }}>
                      4246 7515 4553 5246
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('addCard')}>
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
                      d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM16 13H13V16C13 16.552 12.552 17 12 17C11.448 17 11 16.552 11 16V13H8C7.448 13 7 12.552 7 12C7 11.448 7.448 11 8 11H11V8C11 7.448 11.448 7 12 7C12.552 7 13 7.448 13 8V11H16C16.552 11 17 11.448 17 12C17 12.552 16.552 13 16 13Z"
                      fill="#1563FF"
                    />
                  </Svg>
                  <Text style={{fontSize: 16, fontWeight: '400'}}>
                    {' '}
                    Saved Card
                  </Text>
                </View>
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
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
export default CardSettingsScreen;
