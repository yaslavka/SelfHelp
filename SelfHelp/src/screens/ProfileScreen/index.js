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
    Alert, Modal, Pressable, ImageBackground
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
import {api, baseURLAvatar} from "../../api";
import moment from "moment";
import * as ImagePicker from 'react-native-image-picker';

function ProfileScreen() {
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.app.user);
  const {t} = useTranslation('common');
  const [tableInfo, setTableInfo]=useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState(null);

useEffect(()=>{
    if (error && error){
        setModalVisible(true)
    }else {
        setModalVisible(false)
        setError(null)
    }
},[error])
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
    tableHead: [`${t('profile.Сheckout')}`, `${t('profile.Date')}`, `${t('profile.DaysIn')}`, `${t('profile.YourTRX')}`],
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
                Alert.alert(`${t('profile.Date')}`[{text: 'Ok'}]);
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
                        setError(response.message);
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
                      <TouchableOpacity onPress={()=>{navigation.navigate('EditProfile')}}>
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
                      </TouchableOpacity>
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
                                                  source={{uri: `${baseURLAvatar}/${userInfo.avatar}`}}
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
          <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                  setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                      <Svg width="121" height="120" viewBox="0 0 121 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <Circle opacity="0.2" cx="60.5515" cy="60.3793" r="59.5862" fill="#FF4444"/>
                          <Circle cx="60.5515" cy="60.3793" r="39.7241" fill="#FF4444"/>
                          <Path d="M47.2884 44.9095C46.8493 44.9096 46.4203 45.0406 46.0562 45.2858C45.692 45.5311 45.4092 45.8793 45.244 46.2861C45.0788 46.6928 45.0387 47.1396 45.1288 47.5693C45.2188 47.999 45.435 48.3921 45.7496 48.6983L57.4306 60.3793L45.7496 72.0603C45.5378 72.2637 45.3687 72.5073 45.2522 72.7768C45.1357 73.0463 45.0741 73.3364 45.0712 73.63C45.0682 73.9236 45.1238 74.2148 45.2348 74.4867C45.3458 74.7585 45.5099 75.0055 45.7175 75.2131C45.9251 75.4207 46.1721 75.5848 46.4439 75.6958C46.7158 75.8068 47.007 75.8624 47.3006 75.8594C47.5942 75.8564 47.8843 75.7949 48.1538 75.6784C48.4233 75.5619 48.6669 75.3928 48.8703 75.181L60.5513 63.5L72.2323 75.181C72.4357 75.3928 72.6793 75.5619 72.9488 75.6784C73.2183 75.7949 73.5084 75.8565 73.802 75.8594C74.0956 75.8624 74.3868 75.8068 74.6587 75.6958C74.9305 75.5848 75.1775 75.4207 75.3851 75.2131C75.5927 75.0055 75.7568 74.7585 75.8678 74.4867C75.9788 74.2148 76.0344 73.9236 76.0314 73.63C76.0285 73.3364 75.9669 73.0463 75.8504 72.7768C75.7339 72.5073 75.5648 72.2637 75.353 72.0603L63.672 60.3793L75.353 48.6983C75.6719 48.3883 75.8897 47.9892 75.9779 47.5533C76.0661 47.1174 76.0206 46.665 75.8472 46.2554C75.6739 45.8459 75.3809 45.4982 75.0066 45.258C74.6322 45.0179 74.1941 44.8964 73.7496 44.9095C73.1762 44.9266 72.632 45.1662 72.2323 45.5776L60.5513 57.2586L48.8703 45.5776C48.6646 45.3662 48.4187 45.1981 48.147 45.0834C47.8753 44.9686 47.5833 44.9095 47.2884 44.9095Z" fill="white"/>
                      </Svg>


                      {/*<Svg*/}
                      {/*    width="127"*/}
                      {/*    height="126"*/}
                      {/*    viewBox="0 0 127 126"*/}
                      {/*    fill="none"*/}
                      {/*    xmlns="http://www.w3.org/2000/svg">*/}
                      {/*    <Circle*/}
                      {/*        opacity="0.2"*/}
                      {/*        cx="63.5907"*/}
                      {/*        cy="62.8221"*/}
                      {/*        r="62.7132"*/}
                      {/*        fill="#17D85C"*/}
                      {/*    />*/}
                      {/*    <Circle cx="63.5908" cy="62.822" r="41.8088" fill="#17D85C" />*/}
                      {/*    <Path*/}
                      {/*        d="M79.0376 51.1896C78.5347 51.2045 78.0575 51.4147 77.7069 51.7755L57.7839 71.6985L51.41 65.3247C51.2317 65.1389 51.0181 64.9906 50.7817 64.8884C50.5453 64.7863 50.2909 64.7323 50.0334 64.7297C49.7758 64.727 49.5204 64.7758 49.282 64.8732C49.0436 64.9705 48.827 65.1144 48.6449 65.2965C48.4628 65.4786 48.3188 65.6952 48.2215 65.9337C48.1241 66.1721 48.0754 66.4275 48.078 66.685C48.0806 66.9426 48.1346 67.197 48.2367 67.4333C48.3389 67.6697 48.4872 67.8834 48.673 68.0617L56.4154 75.8041C56.7784 76.167 57.2706 76.3708 57.7839 76.3708C58.2971 76.3708 58.7894 76.167 59.1524 75.8041L80.4439 54.5126C80.7236 54.2407 80.9147 53.8907 80.992 53.5084C81.0693 53.126 81.0294 52.7293 80.8774 52.37C80.7253 52.0108 80.4683 51.7059 80.1401 51.4953C79.8118 51.2846 79.4275 51.1781 79.0376 51.1896Z"*/}
                      {/*        fill="white"*/}
                      {/*    />*/}
                      {/*</Svg>*/}
                      {error && (
                          <Text style={styles.modalText}>
                              {error}
                          </Text>
                      )}
                      <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => {
                              setError(null);
                              setModalVisible(!modalVisible);
                          }}>
                          <Text style={styles.textStyle}>Ok</Text>
                      </Pressable>
                  </View>
              </View>
          </Modal>
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



    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 185,
        height: 46,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },

});
export default ProfileScreen;
