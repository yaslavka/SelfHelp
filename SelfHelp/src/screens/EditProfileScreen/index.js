import React, {useState} from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
    TextInput, Image, Alert,
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
    const [error, setError] = useState({messages: ''});
    const {messages} = error;
    const options = {
        mediaType: 'photo',
        noData: true,
        includeBase64: false,
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
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
export default EditProfile;
