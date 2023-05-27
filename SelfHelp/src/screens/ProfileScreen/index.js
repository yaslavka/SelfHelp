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
    Alert
} from 'react-native';
import bg from '../../assets/background/image.png';
import profile from '../../assets/profile/image.png';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../actions/app.actions';
import {useNavigation} from '@react-navigation/native';
import Svg, {Circle, Path, Rect} from 'react-native-svg';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';
import {useTranslation} from "react-i18next";
import {api} from "../../api";
import moment from "moment";
import * as ImagePicker from 'react-native-image-picker';

function ProfileScreen() {
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.app.user);
  const {t} = useTranslation('common');
  const [tableInfo, setTableInfo]=useState(null)
    const [error, setError] = useState({messages: ''});
    const {messages} = error;
    const options = {
        mediaType: 'photo',
        noData: true,
        includeBase64: false,
    };
    useEffect(()=>{
        api.getMatrixTypesMap()
            .then(response=>{
                setTableInfo(response)
            })
            .catch(error=>{
                console.log(error)
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
  const dataTable = {
    tableHead: ['Сheckout:', 'Date:', 'Days in:', 'Your TRX:'],
    tableTitle: [`${tableInfo && tableInfo.typ_matrix_1.name}`,`${tableInfo && tableInfo.typ_matrix_2.name}`, `${tableInfo && tableInfo.typ_matrix_3.name}`],
    tableData: [
      [`${moment(tableInfo && tableInfo.typ_matrix_1.createdAt).format('DD.MM.YY')}`, `${moment(tableInfo && tableInfo.typ_matrix_1.createdAt).startOf('day').fromNow()}`, `${tableInfo && tableInfo.typ_matrix_1.bonus}`],
      [`${moment(tableInfo && tableInfo.typ_matrix_2.createdAt).format('DD.MM.YY')}`, `${moment(tableInfo && tableInfo.typ_matrix_2.createdAt).startOf('day').fromNow()}`, `${tableInfo && tableInfo.typ_matrix_2.bonus}`],
      [`${moment(tableInfo && tableInfo.typ_matrix_3.createdAt).format('DD.MM.YY')}`, `${moment(tableInfo && tableInfo.typ_matrix_3.createdAt).startOf('day').fromNow()}`, `${tableInfo && tableInfo.typ_matrix_3.bonus}`],
    ],
  };

    const submitAvatarForm = () => {
        ImagePicker.launchImageLibrary(options, async avatar => {
            if (!avatar) {
                Alert.alert('размер файла не более 2 Мв'[{text: 'Ok'}]);
            } else {
                //console.log('RESPONSE', JSON.stringify(avatar));
                await api
                    .updateAvatar(avatar)
                    .then(async () => {
                        await api
                            .getUserInfo()
                            .then(response => {
                                dispatch(actions.userInfoSuccess(response));
                            })
                            .catch(() => {});
                    })
                    .catch(response => {
                        setError({...error, messages: response.messages});
                    });
            }
        }).then();
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
          {userInfo && (
              <>
                  <View
                      style={{
                          marginTop: 40,
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          paddingHorizontal: 25,
                          marginBottom: 60,
                      }}>
                      <View>
                          <Text style={{color: '#FFF', fontWeight: '700', fontSize: 22}}>{t('homescreen.userInfo.balance')}
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
                              source={{uri: `http://192.168.0.100/api/user/avatars/${userInfo.avatar}`}}
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
                  <View style={{paddingBottom: 20, paddingHorizontal: 5,}}>
                      <View
                          style={{
                              alignItems: 'center',
                              justifyContent: 'space-evenly',
                              display: 'flex',
                              flexDirection: 'row',
                          }}>
                          <View>
                              <TouchableOpacity onPress={submitAvatarForm}>
                                  <Svg
                                      width="131"
                                      height="123"
                                      viewBox="0 0 131 123"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                      {userInfo.avatar?(
                                          <>
                                              <Image
                                                  source={{uri: `http://192.168.0.100/api/user/avatars/${userInfo.avatar}`}}
                                                  style={{
                                                      width: 121.019,
                                                      height: 121.019,
                                                      borderRadius: 70, y:0.990234
                                                  }}
                                              />
                                          </>
                                      ):(
                                          <>
                                              <Rect
                                                  y="0.990234"
                                                  width="121.019"
                                                  height="121.019"
                                                  rx="60.5095"
                                                  fill="#F2F2F2"
                                              />
                                              <Path
                                                  d="M60.5096 34.2705C57.2999 34.2705 54.2218 35.5455 51.9522 37.8151C49.6827 40.0846 48.4077 43.1628 48.4077 46.3724C48.4077 49.582 49.6827 52.6602 51.9522 54.9298C54.2218 57.1993 57.2999 58.4743 60.5096 58.4743C63.7192 58.4743 66.7974 57.1993 69.0669 54.9298C71.3364 52.6602 72.6115 49.582 72.6115 46.3724C72.6115 43.1628 71.3364 40.0846 69.0669 37.8151C66.7974 35.5455 63.7192 34.2705 60.5096 34.2705ZM60.5096 67.5507C51.421 67.5507 33.2803 72.1132 33.2803 81.1654V85.7036C33.2803 87.3737 34.6357 88.7291 36.3057 88.7291H84.7134C86.3834 88.7291 87.7388 87.3737 87.7388 85.7036V81.1654C87.7388 72.1132 69.5981 67.5507 60.5096 67.5507Z"
                                                  fill="#B5B5B5"
                                              />
                                              <Circle
                                                  cx="106.048"
                                                  cy="92.0666"
                                                  r="24.9524"
                                                  fill="#1563FF"
                                              />
                                              <Path
                                                  d="M103.095 83.1143C101.99 83.1143 101.095 84.0093 101.095 85.1143V86.1143H98.0952C96.9902 86.1143 96.0952 87.0093 96.0952 88.1143V99.1143C96.0952 100.219 96.9902 101.114 98.0952 101.114H114.095C115.2 101.114 116.095 100.219 116.095 99.1143V88.1143C116.095 87.0093 115.2 86.1143 114.095 86.1143H111.095V85.1143C111.095 84.0093 110.2 83.1143 109.095 83.1143H103.095ZM106.095 88.1143C108.852 88.1143 111.095 90.3573 111.095 93.1143C111.095 95.8713 108.852 98.1143 106.095 98.1143C103.338 98.1143 101.095 95.8713 101.095 93.1143C101.095 90.3573 103.338 88.1143 106.095 88.1143ZM113.095 88.1143C113.647 88.1143 114.095 88.5623 114.095 89.1143C114.095 89.6663 113.647 90.1143 113.095 90.1143C112.543 90.1143 112.095 89.6663 112.095 89.1143C112.095 88.5623 112.543 88.1143 113.095 88.1143ZM106.095 90.1143C105.3 90.1143 104.537 90.4303 103.974 90.9929C103.411 91.5555 103.095 92.3186 103.095 93.1143C103.095 93.9099 103.411 94.673 103.974 95.2356C104.537 95.7982 105.3 96.1143 106.095 96.1143C106.891 96.1143 107.654 95.7982 108.217 95.2356C108.779 94.673 109.095 93.9099 109.095 93.1143C109.095 92.3186 108.779 91.5555 108.217 90.9929C107.654 90.4303 106.891 90.1143 106.095 90.1143Z"
                                                  fill="white"
                                              />
                                          </>
                                      )}
                                  </Svg>
                              </TouchableOpacity>
                          </View>
                          <View>
                              <Text style={{fontSize: 20, fontWeight: '700'}}>{userInfo.last_name}</Text>
                              <View
                                  style={{
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      display: 'flex',
                                      flexDirection: 'row',
                                  }}>
                                  <View>
                                      <Text style={{fontSize: 14, fontWeight: '700'}}>
                                          {t('profile.Login')} :
                                      </Text>
                                      <Text style={{fontSize: 14, fontWeight: '700'}}>{t('profile.email')}:</Text>
                                      <Text style={{fontSize: 14, fontWeight: '700'}}>{t('profile.phone')}:{' '}</Text>
                                  </View>
                                  <View>
                                      <Text style={{fontSize: 14, fontWeight: '400'}}>
                                          {userInfo.username}
                                      </Text>
                                      <Text style={{fontSize: 14, fontWeight: '400'}}>
                                          {userInfo.email}
                                      </Text>
                                      <Text style={{fontSize: 14, fontWeight: '400'}}>
                                          {userInfo.phone}
                                      </Text>
                                  </View>
                              </View>
                          </View>
                      </View>
                  </View>
                  <View style={{paddingHorizontal: 25, paddingBottom: 20}}>
                      <TouchableOpacity
                          onPress={() => navigation.navigate('Settings')}
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
                              {t('profile.edit')}
                          </Text>
                      </TouchableOpacity>
                  </View>
                  <View>
                      <View style={styles.container}>
                          <Table borderStyle={{borderBottomWidth: 1}}>
                              <Row
                                  data={dataTable.tableHead}
                                  flexArr={[2, 2, 2, 2]}
                                  style={styles.head}
                                  textStyle={styles.text}
                              />
                              <TableWrapper style={styles.wrapper}>
                                  <Col
                                      data={dataTable.tableTitle}
                                      style={styles.title}
                                      heightArr={[30, 30]}
                                      textStyle={{
                                          textAlign: 'center',
                                          borderBottomWidth: 1,
                                          padding: 3,
                                          borderBottomColor: '#E0E0E0',
                                      }}
                                  />
                                  <Rows
                                      data={dataTable.tableData}
                                      flexArr={[0.7, 0.9, 0.9]}
                                      style={styles.row}
                                      textStyle={{
                                          textAlign: 'center',
                                          borderBottomWidth: 1,
                                          padding: 1,
                                          borderBottomColor: '#E0E0E0',
                                      }}
                                  />
                              </TableWrapper>
                          </Table>
                      </View>
                  </View>
              </>
          )}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, padding: 3, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#E0E0E0'},
  wrapper: {flexDirection: 'row'},
  title: {flex: 1, backgroundColor: '#f6f8fa'},
  row: {height: 30},
  text: {textAlign: 'center'},
});
export default ProfileScreen;
