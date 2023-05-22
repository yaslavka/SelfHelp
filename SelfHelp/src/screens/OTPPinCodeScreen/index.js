import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Alert,
  Pressable,
} from 'react-native';
import otp from '../../assets/Otp/OTP.png';
import Svg, {Circle, Path} from 'react-native-svg';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {api} from '../../api';
import * as actions from '../../actions/auth.actions';
import {setAccessToken} from '../../utils';
import {useDispatch} from 'react-redux';
import OtpInputs from 'react-native-otp-inputs';

function OtpPinInput() {
  const navigation = useNavigation();
  const {t} = useTranslation('common');
  const [modalVisible, setModalVisible] = useState(false);
  const [pin, setPin] = useState(null);
  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();
  const submitSignInForm = async () => {
    setPin();
    await api
      .signIn({pin: pin})
      .then(async response => {
        dispatch(actions.signInSuccess());
        await setAccessToken(response);
        await api
          .getUserInfo()
          .then(() => {})
          .catch(() => {});
      })
      .catch(response => {
        setPin(response.message);
      });
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#828282'}}>
      <ImageBackground source={otp} resizeMode="cover" style={{height: 1000}}>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Svg
              width="415"
              height="63"
              viewBox="0 0 415 63"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Path
                d="M38.2758 24.2048C37.9935 24.2048 37.7108 24.3145 37.4956 24.5303L31.2543 30.7716C30.8228 31.2031 30.8228 31.9016 31.2543 32.332L37.4956 38.5734C37.9271 39.0048 38.6256 39.0048 39.056 38.5734L39.1508 38.4785C39.5823 38.0471 39.5823 37.3485 39.1508 36.9182L34.8879 32.6553H49.3103C49.9194 32.6553 50.4137 32.1609 50.4137 31.5518C50.4137 30.9427 49.9194 30.4484 49.3103 30.4484H34.8879L39.1508 26.1854C39.5823 25.754 39.5823 25.0554 39.1508 24.6251L39.056 24.5303C38.8403 24.3145 38.5581 24.2048 38.2758 24.2048Z"
                fill="white"
              />
            </Svg>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Svg
            width="121"
            height="121"
            viewBox="0 0 121 121"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <Circle cx="60.4482" cy="60.1379" r="60.1379" fill="#8E8E8E" />
            <Path
              d="M40.4022 40.092C38.7334 40.092 37.262 40.9116 36.3549 42.172C35.7435 43.0189 36.0136 44.2195 36.8981 44.7707L58.9017 58.4838C59.8489 59.0752 61.0476 59.0752 61.9947 58.4838L83.9053 44.6533C84.8249 44.072 85.0542 42.8085 84.3752 41.9616C83.4606 40.824 82.0653 40.092 80.4942 40.092H40.4022ZM84.292 50.3304C84.0824 50.3327 83.8696 50.3904 83.6704 50.5163L61.9947 64.1854C61.0476 64.7742 59.8489 64.7719 58.9017 64.1805L37.2211 50.673C36.4243 50.1768 35.3907 50.7513 35.3907 51.6909V75.1725C35.3907 77.9414 37.6334 80.184 40.4022 80.184H80.4942C83.263 80.184 85.5057 77.9414 85.5057 75.1725V51.5294C85.5057 50.8228 84.9206 50.3234 84.292 50.3304Z"
              fill="white"
            />
          </Svg>
        </View>
        <View>
          <Text
            style={{
              color: '#FFFFFF',
              fontFamily: 'Inter',
              fontSize: 22,
              fontWeight: '500',
              textAlign: 'center',
            }}>
            {t('otp.otp')}
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: '#FFFFFF',
              fontFamily: 'Inter',
              fontSize: 16,
              fontWeight: '400',
              textAlign: 'center',
            }}>
            {t('otp.text')}
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            marginTop: 260,
            width: '90%',
            marginHorizontal: 15,
          }}>
          <OtpInputs
            keyboardType={'name-phone-pad'}
            inputStyles={styles.underlineStyleBase}
            handleChange={code => {
              console.log(code);
              code.length === 6
                ? setModalVisible(true)
                : setModalVisible(false);
            }}
            numberOfInputs={6}
            autofillFromClipboard
          />
        </View>
        {errors && (
          <View
            style={{
              backgroundColor: '#FF4444',
              marginTop: 100,
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'row',
              borderRadius: 9,
              marginHorizontal: 20,
              height: 62,
            }}>
            <Svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Path
                d="M13.7241 2.48267C7.62971 2.48267 2.68958 7.42281 2.68958 13.5172C2.68958 19.6115 7.62971 24.5516 13.7241 24.5516C19.8184 24.5516 24.7585 19.6115 24.7585 13.5172C24.7585 7.42281 19.8184 2.48267 13.7241 2.48267ZM14.2758 19.0344H13.1723C12.8678 19.0344 12.6206 18.7872 12.6206 18.4827V17.3792C12.6206 17.0747 12.8678 16.8275 13.1723 16.8275H14.2758C14.5803 16.8275 14.8275 17.0747 14.8275 17.3792V18.4827C14.8275 18.7872 14.5803 19.0344 14.2758 19.0344ZM13.7241 14.6206C13.115 14.6206 12.6206 14.1263 12.6206 13.5172V9.10336C12.6206 8.49425 13.115 7.99991 13.7241 7.99991C14.3332 7.99991 14.8275 8.49425 14.8275 9.10336V13.5172C14.8275 14.1263 14.3332 14.6206 13.7241 14.6206Z"
                fill="white"
              />
            </Svg>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 20,
                color: '#fff',
                textAlign: 'center',
              }}>
              {t('otp.error')}
            </Text>
          </View>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Svg
                width="127"
                height="126"
                viewBox="0 0 127 126"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Circle
                  opacity="0.2"
                  cx="63.5907"
                  cy="62.8221"
                  r="62.7132"
                  fill="#17D85C"
                />
                <Circle cx="63.5908" cy="62.822" r="41.8088" fill="#17D85C" />
                <Path
                  d="M79.0376 51.1896C78.5347 51.2045 78.0575 51.4147 77.7069 51.7755L57.7839 71.6985L51.41 65.3247C51.2317 65.1389 51.0181 64.9906 50.7817 64.8884C50.5453 64.7863 50.2909 64.7323 50.0334 64.7297C49.7758 64.727 49.5204 64.7758 49.282 64.8732C49.0436 64.9705 48.827 65.1144 48.6449 65.2965C48.4628 65.4786 48.3188 65.6952 48.2215 65.9337C48.1241 66.1721 48.0754 66.4275 48.078 66.685C48.0806 66.9426 48.1346 67.197 48.2367 67.4333C48.3389 67.6697 48.4872 67.8834 48.673 68.0617L56.4154 75.8041C56.7784 76.167 57.2706 76.3708 57.7839 76.3708C58.2971 76.3708 58.7894 76.167 59.1524 75.8041L80.4439 54.5126C80.7236 54.2407 80.9147 53.8907 80.992 53.5084C81.0693 53.126 81.0294 52.7293 80.8774 52.37C80.7253 52.0108 80.4683 51.7059 80.1401 51.4953C79.8118 51.2846 79.4275 51.1781 79.0376 51.1896Z"
                  fill="white"
                />
              </Svg>
              <Text style={styles.modalText}>
                Congratulations, you have successfully created a universal
                password for quick login to the application
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  navigation.navigate('Tab');
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Ok</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#FFFFFF',
  },

  underlineStyleBase: {
    width: 25,
    height: 2,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#FFFFFF',
    fontWeight: '500',
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },

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
export default OtpPinInput;
