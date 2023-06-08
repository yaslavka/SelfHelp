import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
    StyleSheet, Modal, Pressable
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
import Svg, {Circle, Path} from "react-native-svg";

function HomeScreen() {
  const navigation = useNavigation();
  const userInfo = useSelector(state => state.app.user);
  const {t} = useTranslation('common');
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const [matrixTypes, setMatrixTypes] = useState(null);

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

  useEffect(()=>{
      api
          .getMatrixTypes()
          .then(response=>{
              setMatrixTypes(response)
          })
          .catch(err=>{
              setError(err.message)
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
                                        <MatrixMap matrix={matrix} key={matrix.id} setError={setError}/>
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
    </>
  );
}

const styles =StyleSheet.create({
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
})

export default HomeScreen;
