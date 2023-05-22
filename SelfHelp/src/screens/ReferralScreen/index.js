import React, {useState} from 'react';
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
import {useDispatch} from 'react-redux';
import * as actions from '../../actions/app.actions';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {Table, Rows, TableWrapper, Col} from 'react-native-table-component';
import {useNavigation} from '@react-navigation/native';

function ReferralScreen() {
  const navigation = useNavigation();
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
  const tableData = [
    ['1', '1'],
    ['1', '1'],
    ['1', '1'],
    ['1', '1'],
  ];
  const tableTitle = [
    ['Referral 1'],
    ['Referral 2'],
    ['Referral 3'],
    ['All Team:'],
  ];
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
            paddingHorizontal: 25,
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
        <View style={{paddingHorizontal: 25}}>
          <Text style={{color: '#000000', fontWeight: '700', fontSize: 22}}>
            Your personal referral link:
          </Text>
          <View
            style={{
              backgroundColor: '#F1F1F1',
              paddingVertical: 10,
              borderRadius: 10,
              marginBottom: 20,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  color: '#000000',
                  fontWeight: '400',
                  fontSize: 17,
                }}>
                Your personal referral link:
              </Text>
              <Svg
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <G clipPath="url(#clip0_44_3824)">
                  <Path
                    d="M15.273 19.4296L9.52423 16.2942C8.97241 16.842 8.27077 17.2141 7.50777 17.3637C6.74477 17.5132 5.95456 17.4336 5.23677 17.1347C4.51898 16.8358 3.90575 16.3311 3.47437 15.6842C3.043 15.0373 2.81281 14.2772 2.81281 13.4997C2.81281 12.7222 3.043 11.9621 3.47437 11.3152C3.90575 10.6683 4.51898 10.1636 5.23677 9.86471C5.95456 9.56584 6.74477 9.48617 7.50777 9.63574C8.27077 9.78531 8.97241 10.1574 9.52423 10.7052L15.273 7.56982C15.0758 6.64477 15.2182 5.67967 15.6741 4.85098C16.1301 4.0223 16.8691 3.38542 17.756 3.05681C18.6429 2.7282 19.6184 2.72982 20.5042 3.06137C21.3901 3.39292 22.1269 4.03225 22.5801 4.86244C23.0333 5.69263 23.1725 6.65821 22.9722 7.58259C22.772 8.50698 22.2457 9.32841 21.4896 9.89666C20.7335 10.4649 19.7982 10.742 18.8546 10.6773C17.9109 10.6126 17.0222 10.2104 16.3507 9.5442L10.602 12.6796C10.7167 13.2203 10.7167 13.7791 10.602 14.3198L16.3507 17.4552C17.0222 16.789 17.9109 16.3868 18.8546 16.3221C19.7982 16.2574 20.7335 16.5345 21.4896 17.1027C22.2457 17.671 22.772 18.4924 22.9722 19.4168C23.1725 20.3412 23.0333 21.3068 22.5801 22.137C22.1269 22.9671 21.3901 23.6065 20.5042 23.938C19.6184 24.2696 18.6429 24.2712 17.756 23.9426C16.8691 23.614 16.1301 22.9771 15.6741 22.1484C15.2182 21.3197 15.0758 20.3546 15.273 19.4296Z"
                    fill="#AAAAA9"
                  />
                </G>
                <Defs>
                  <ClipPath id="clip0_44_3824">
                    <Rect width="27" height="27" fill="white" />
                  </ClipPath>
                </Defs>
              </Svg>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                borderStyle: 'solid',
                borderColor: '#D7D7D7',
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  color: '#828282',
                  fontWeight: '400',
                  fontSize: 15,
                  textAlign: 'center',
                }}>
                Referrals
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                borderStyle: 'solid',
                borderColor: '#D7D7D7',
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  color: '#828282',
                  fontWeight: '400',
                  fontSize: 15,
                  textAlign: 'center',
                }}>
                Quantity
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                borderStyle: 'solid',
                borderColor: '#D7D7D7',
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  color: '#828282',
                  fontWeight: '400',
                  fontSize: 15,
                  textAlign: 'center',
                }}>
                Bonuses
              </Text>
            </View>
          </View>
          <View style={{marginBottom: 40}}>
            <Table borderStyle={{borderWidth: 1, borderColor: '#828282'}}>
              <TableWrapper style={styles.wrapper}>
                <Col
                  data={tableTitle}
                  style={styles.title}
                  heightArr={[38, 38]}
                  textStyle={{
                    color: '#000000',
                    fontSize: 17,
                    fontWeight: '600',
                    textAlign: 'center',
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                  }}
                />
                <Rows
                  data={tableData}
                  flexArr={[0.5, 0.5, 1]}
                  style={styles.row}
                  textStyle={styles.text}
                />
              </TableWrapper>
            </Table>
          </View>
          <View style={{marginBottom: 10}}>
            <TouchableOpacity>
              <Text
                style={{
                  color: '#1563FF',
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: '400',
                }}>
                Read the rules of the referral program
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginBottom: 35}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Structure')}
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
                Моя структура
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  wrapper: {flexDirection: 'row'},
  title: {flex: 1},
  row: {height: 38},
  text: {
    textAlign: 'center',
    color: '#949494',
    fontSize: 22,
    fontWeight: '400',
  },
});
export default ReferralScreen;