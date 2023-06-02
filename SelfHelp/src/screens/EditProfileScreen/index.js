import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
    TextInput, Image, Alert, Pressable, Modal, StyleSheet,
} from 'react-native';
import Svg, {Circle, Path, Rect} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../actions/app.actions';
import {useTranslation} from "react-i18next";
import {api, baseURLAvatar} from "../../api";
import * as ImagePicker from "react-native-image-picker";

function EditProfile() {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const userInfo = useSelector(state => state.app.user);
  const {t} = useTranslation('common');
  const [state, setState]=useState({last_name:userInfo && userInfo.last_name, email:userInfo && userInfo.email, phone:userInfo && userInfo.phone, username: userInfo && userInfo.username})
    const {last_name, email, phone, username}=state
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
    const handleOnchanges = (text, input) => {
        setState(prevState => ({...prevState, [input]: text}));
    };
    const onsubmitInfo = ()=>{
        api
            .getChangeuser({
                last_name: last_name,
                phone: phone,
                emails: email,
               username: username
            })
            .then(async () => {
                await api
                    .getUserInfo()
                    .then(response => {
                        dispatch(actions.userInfoSuccess(response));
                    })
                    .catch(() => {});
            })
            .catch(() => {});
    }
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
            {userInfo && (
                <View
                    style={{
                        paddingHorizontal: 25,
                    }}>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 25,
                        }}>
                        <TouchableOpacity onPress={submitAvatarForm}>
                            <Svg
                                width="105"
                                height="97"
                                viewBox="0 0 105 97"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                {userInfo.avatar ? (
                                    <>
                                        <Image
                                            source={{uri: `${baseURLAvatar}/${userInfo.avatar}`}}
                                            style={{
                                                width: 97,
                                                height: 97,
                                                borderRadius: 50
                                            }}
                                        />
                                    </>
                                ):(
                                    <>
                                        <Rect width="97" height="97" rx="48.5" fill="#F2F2F2" />
                                        <Path
                                            d="M48.4998 26.6758C45.9272 26.6758 43.46 27.6977 41.6409 29.5168C39.8218 31.3359 38.7998 33.8032 38.7998 36.3758C38.7998 38.9484 39.8218 41.4156 41.6409 43.2347C43.46 45.0538 45.9272 46.0758 48.4998 46.0758C51.0724 46.0758 53.5396 45.0538 55.3587 43.2347C57.1778 41.4156 58.1998 38.9484 58.1998 36.3758C58.1998 33.8032 57.1778 31.3359 55.3587 29.5168C53.5396 27.6977 51.0724 26.6758 48.4998 26.6758ZM48.4998 53.3508C41.2151 53.3508 26.6748 57.0077 26.6748 64.2633V67.9008C26.6748 69.2394 27.7612 70.3258 29.0998 70.3258H67.8998C69.2384 70.3258 70.3248 69.2394 70.3248 67.9008V64.2633C70.3248 57.0077 55.7845 53.3508 48.4998 53.3508Z"
                                            fill="#B5B5B5"
                                        />
                                        <Circle cx="85" cy="73" r="20" fill="#1563FF" />
                                        <Path
                                            d="M82 64C80.895 64 80 64.895 80 66V67H77C75.895 67 75 67.895 75 69V80C75 81.105 75.895 82 77 82H93C94.105 82 95 81.105 95 80V69C95 67.895 94.105 67 93 67H90V66C90 64.895 89.105 64 88 64H82ZM85 69C87.757 69 90 71.243 90 74C90 76.757 87.757 79 85 79C82.243 79 80 76.757 80 74C80 71.243 82.243 69 85 69ZM92 69C92.552 69 93 69.448 93 70C93 70.552 92.552 71 92 71C91.448 71 91 70.552 91 70C91 69.448 91.448 69 92 69ZM85 71C84.2044 71 83.4413 71.3161 82.8787 71.8787C82.3161 72.4413 82 73.2044 82 74C82 74.7956 82.3161 75.5587 82.8787 76.1213C83.4413 76.6839 84.2044 77 85 77C85.7956 77 86.5587 76.6839 87.1213 76.1213C87.6839 75.5587 88 74.7956 88 74C88 73.2044 87.6839 72.4413 87.1213 71.8787C86.5587 71.3161 85.7956 71 85 71Z"
                                            fill="white"
                                        />
                                    </>
                                )}
                            </Svg>
                        </TouchableOpacity>
                    </View>
                    <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 10}}>
                        {t('profileEdit.editInfo.name')}
                    </Text>
                    <TextInput
                        style={{
                            width: '100%',
                            paddingVertical: 15,
                            backgroundColor: '#F1F1F1',
                            borderRadius: 10,
                            outlineWidth: 0,
                            borderWidth: 0,
                            color: '#000000',
                            fontSize: 18,
                            fontWeight: '400',
                            paddingHorizontal: 20,
                            marginBottom: 20,
                        }}
                        onChangeText={text => handleOnchanges(text, 'last_name')}
                        placeholder={userInfo.last_name}
                    />
                    <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 10}}>
                        {t('profileEdit.editInfo.email')}
                    </Text>
                    <TextInput
                        placeholder={userInfo.email}
                        style={{
                            width: '100%',
                            paddingVertical: 15,
                            backgroundColor: '#F1F1F1',
                            borderRadius: 10,
                            outlineWidth: 0,
                            borderWidth: 0,
                            color: '#000000',
                            fontSize: 18,
                            fontWeight: '400',
                            paddingHorizontal: 20,
                            marginBottom: 20,
                        }}
                        onChangeText={text => handleOnchanges(text, 'email')}
                    />
                    <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 10}}>
                        {t('profileEdit.editInfo.phone')}
                    </Text>
                    <TextInput
                        placeholder={userInfo.phone}
                        style={{
                            width: '100%',
                            paddingVertical: 15,
                            backgroundColor: '#F1F1F1',
                            borderRadius: 10,
                            outlineWidth: 0,
                            borderWidth: 0,
                            color: '#000000',
                            fontSize: 18,
                            fontWeight: '400',
                            paddingHorizontal: 20,
                            marginBottom: 20,
                        }}
                        onChangeText={text => handleOnchanges(text, 'phone')}
                    />
                    <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 10}}>
                        {t('profileEdit.editInfo.username')}
                    </Text>
                    <TextInput
                        placeholder={userInfo.username || `${t('profileEdit.editInfo.placeholder')}`}
                        style={{
                            width: '100%',
                            paddingVertical: 15,
                            backgroundColor: '#F1F1F1',
                            borderRadius: 10,
                            outlineWidth: 0,
                            borderWidth: 0,
                            color: '#000000',
                            fontSize: 18,
                            fontWeight: '400',
                            paddingHorizontal: 20,
                            marginBottom: 25,
                        }}
                        onChangeText={text => handleOnchanges(text, 'username')}
                    />
                    <View>
                        <TouchableOpacity onPress={onsubmitInfo}
                            style={{
                                backgroundColor: '#1563FF',
                                paddingVertical: 20,
                                borderRadius: 10,
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    color: '#fff',
                                    fontSize: 17,
                                    fontWeight: '700',
                                }}>
                                {t('profileEdit.editInfo.save')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
export default EditProfile;
