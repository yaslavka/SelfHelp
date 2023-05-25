import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
    Pressable,
} from 'react-native';
import Svg, {
  Circle,
  Defs,
  G,
  LinearGradient,
  Mask,
  Path,
  Rect,
  Stop,
} from 'react-native-svg';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {api} from '../../api';
import {useDispatch} from 'react-redux';
import * as actions from '../../actions/auth.actions';
import {setAccessToken} from '../../utils';
function SignInScreen() {
  const {t} = useTranslation('common');
  const navigation = useNavigation();
  const [signUpStatus, setSignUpStatus] = useState(null);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    phone: '',
    password: '',
  });
  const {phone, password} = state;
  const handleOnchanges = (text, input) => {
    setState(prevState => ({...prevState, [input]: text}));
  };
  const submitSignInForm = async () => {
    setSignUpStatus();
    await api
      .signIn({phone: phone, password: password})
      .then(async response => {
        dispatch(actions.signInSuccess());
        await setAccessToken(response);
        await api
          .getUserInfo()
          .then(() => {})
          .catch(() => {});
      })
      .catch(response => {
        setSignUpStatus(response.message);
      });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.logo}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="181"
            height="181"
            viewBox="0 0 181 181"
            fill="none">
            <G id="Logo">
              <G id="Ellipse 13" filter="url(#filter0_d_41_4026)">
                <Circle cx="90.4824" cy="77.3104" r="54.6207" fill="white" />
              </G>
              <G id="help-svgrepo-com 1">
                <Path
                  id="primary"
                  d="M89.9999 46.1666C83.9017 46.1666 77.9403 47.975 72.8698 51.363C67.7993 54.751 63.8473 59.5665 61.5136 65.2006C59.1799 70.8346 58.5693 77.0342 59.759 83.0152C60.9487 88.9963 63.8853 94.4903 68.1975 98.8024C72.5096 103.115 78.0035 106.051 83.9846 107.241C89.9657 108.431 96.1653 107.82 101.799 105.486C107.433 103.153 112.249 99.2006 115.637 94.13C119.025 89.0595 120.833 83.0982 120.833 77C120.833 72.9509 120.036 68.9414 118.486 65.2006C116.937 61.4597 114.666 58.0606 111.802 55.1975C108.939 52.3344 105.54 50.0632 101.799 48.5137C98.0584 46.9642 94.049 46.1666 89.9999 46.1666ZM89.9999 86.25C88.1704 86.25 86.382 85.7075 84.8609 84.691C83.3397 83.6746 82.1541 82.23 81.454 80.5398C80.7539 78.8496 80.5707 76.9897 80.9276 75.1954C81.2846 73.401 82.1655 71.7529 83.4592 70.4592C84.7528 69.1656 86.401 68.2846 88.1953 67.9277C89.9896 67.5708 91.8495 67.754 93.5397 68.4541C95.2299 69.1542 96.6746 70.3398 97.691 71.8609C98.7074 73.3821 99.2499 75.1705 99.2499 77C99.2499 79.4532 98.2754 81.806 96.5406 83.5407C94.8059 85.2754 92.4532 86.25 89.9999 86.25Z"
                  fill="black"
                />
                <Path
                  id="secondary"
                  d="M89.9999 46.1666C86.0919 46.1571 82.2185 46.9003 78.5916 48.3558L84.7583 69.4767C86.2891 68.3811 88.1177 67.7788 89.9999 67.75C91.9188 67.7584 93.7898 68.3498 95.3649 69.4458L101.532 48.3558C97.8662 46.8847 93.9495 46.1412 89.9999 46.1666ZM89.9999 107.833C93.908 107.843 97.7813 107.1 101.408 105.644L95.2416 84.5233C93.7108 85.6188 91.8821 86.2212 89.9999 86.25C88.081 86.2416 86.21 85.6502 84.6349 84.5541L78.4683 105.644C82.1337 107.115 86.0504 107.859 89.9999 107.833ZM120.833 77C120.843 73.0919 120.1 69.2186 118.644 65.5917L97.5233 71.7583C98.6188 73.2891 99.2211 75.1178 99.2499 77C99.2415 78.9189 98.6501 80.7899 97.5541 82.365L118.644 88.5317C120.115 84.8662 120.859 80.9495 120.833 77ZM59.1666 77C59.157 80.9081 59.9003 84.7814 61.3558 88.4083L82.4766 82.2416C81.3811 80.7108 80.7787 78.8822 80.7499 77C80.7583 75.0811 81.3498 73.2101 82.4458 71.635L61.3558 65.4683C59.8846 69.1337 59.1411 73.0505 59.1666 77Z"
                  fill="#D1D1D1"
                />
              </G>
            </G>
          </Svg>
        </View>
        <View style={styles.logobg}>
          <Svg
            width="416"
            height="183"
            viewBox="0 0 416 183"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <Mask
              id="mask0_517_4535"
              style="mask-type:alpha"
              maskUnits="userSpaceOnUse"
              x="4"
              y="0"
              width="408"
              height="175">
              <Rect x="4" width="408" height="175" fill="#C4C4C4" />
            </Mask>
            <G mask="url(#mask0_517_4535)">
              <Path
                opacity="0.15"
                d="M291.087 9.2765L-117.48 109.884L-153.034 281.603L469.043 368.787L503.788 120.876L407.814 37.4709C375.804 9.65255 332.266 -0.863647 291.087 9.2765Z"
                fill="url(#paint0_linear_517_4535)"
              />
              <Path
                opacity="0.15"
                d="M274.97 113.856L-75.0399 200.332L-104.611 343.259L411.993 415.662L440.911 209.321L352.921 132.695C331.558 114.091 302.471 107.061 274.97 113.856Z"
                fill="url(#paint1_linear_517_4535)"
              />
            </G>
            <Defs>
              <LinearGradient
                id="paint0_linear_517_4535"
                x1="385.9"
                y1="-77.533"
                x2="196.682"
                y2="299.435"
                gradientUnits="userSpaceOnUse">
                <Stop stopColor="white" />
                <Stop offset="1" stopColor="white" stopOpacity="0" />
              </LinearGradient>
              <LinearGradient
                id="paint1_linear_517_4535"
                x1="343.058"
                y1="44.2192"
                x2="185.391"
                y2="357.796"
                gradientUnits="userSpaceOnUse">
                <Stop stopColor="white" />
                <Stop offset="1" stopColor="white" stopOpacity="0" />
              </LinearGradient>
            </Defs>
          </Svg>
        </View>
        <View style={styles.title}>
          <Text style={styles.TextTitle}>Self-Help</Text>
        </View>
        <ScrollView
          contentContainerStyle={{width: '100%', flexGrow: 1}}
          contentInsetAdjustmentBehavior="automatic">
          <View
            style={{
              backgroundColor: '#FFFFFF',
              height: 550,
              width: '100%',
              flex: 1,
              marginTop: 315,
              borderTopStartRadius: 17,
              borderTopEndRadius: 17,
            }}>
            <View
              style={{
                height: 'auto',
                width: '100%',
                marginBottom: 25,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 17,
                  fontWeight: '700',
                  marginTop: 30,
                }}>
                {t('signInPage.title')}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 20,
              }}>
              <TextInput
                onChangeText={text => handleOnchanges(text, 'phone')}
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  height: 60,
                  marginBottom: 15,
                  borderColor: '#D7D7D7',
                  width: '100%',
                }}
                placeholder={`${t('signInPage.input.phone')}`}
              />
              <TextInput
                onChangeText={text => handleOnchanges(text, 'password')}
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  height: 60,
                  borderColor: '#D7D7D7',
                  marginBottom: 15,
                  width: '100%',
                }}
                placeholder={`${t('signInPage.input.password')}`}
                secureTextEntry={true}
              />
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                marginTop: 10,
              }}>
              <Pressable
                onPress={submitSignInForm}>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="356"
                  height="62"
                  viewBox="0 0 356 62"
                  fill="none">
                  <Rect
                    x="0.0827637"
                    y="0.243652"
                    width="355.306"
                    height="60.8474"
                    rx="8.69249"
                    fill="#1563FF"
                  />
                  <Path
                    d="M155.378 37.7588V24.9187H160.294C161.221 24.9187 161.993 25.065 162.607 25.3575C163.226 25.6459 163.688 26.0409 163.993 26.5425C164.302 27.0441 164.457 27.6125 164.457 28.2478C164.457 28.7703 164.356 29.2175 164.156 29.5895C163.955 29.9573 163.685 30.2562 163.347 30.4861C163.008 30.7159 162.63 30.881 162.212 30.9814V31.1068C162.668 31.1318 163.104 31.2719 163.522 31.5268C163.945 31.7776 164.289 32.1329 164.557 32.5926C164.824 33.0524 164.958 33.6083 164.958 34.2604C164.958 34.9249 164.797 35.5226 164.475 36.0535C164.154 36.5801 163.669 36.996 163.021 37.3011C162.373 37.6062 161.558 37.7588 160.576 37.7588H155.378ZM157.704 35.8152H160.206C161.05 35.8152 161.658 35.6543 162.03 35.3325C162.406 35.0064 162.595 34.5885 162.595 34.0785C162.595 33.6982 162.5 33.3554 162.312 33.0503C162.124 32.741 161.857 32.4986 161.51 32.3231C161.163 32.1433 160.749 32.0535 160.268 32.0535H157.704V35.8152ZM157.704 30.3795H160.005C160.406 30.3795 160.768 30.3063 161.09 30.16C161.412 30.0096 161.665 29.7985 161.848 29.5268C162.037 29.251 162.131 28.9249 162.131 28.5488C162.131 28.0514 161.955 27.6418 161.604 27.3199C161.257 26.9981 160.741 26.8372 160.055 26.8372H157.704V30.3795ZM171.082 37.9469C170.142 37.9469 169.326 37.74 168.637 37.3262C167.947 36.9124 167.412 36.3335 167.032 35.5895C166.656 34.8455 166.468 33.9761 166.468 32.9814C166.468 31.9866 166.656 31.1151 167.032 30.3669C167.412 29.6188 167.947 29.0378 168.637 28.624C169.326 28.2102 170.142 28.0033 171.082 28.0033C172.022 28.0033 172.837 28.2102 173.527 28.624C174.217 29.0378 174.75 29.6188 175.126 30.3669C175.506 31.1151 175.696 31.9866 175.696 32.9814C175.696 33.9761 175.506 34.8455 175.126 35.5895C174.75 36.3335 174.217 36.9124 173.527 37.3262C172.837 37.74 172.022 37.9469 171.082 37.9469ZM171.095 36.1287C171.604 36.1287 172.031 35.9887 172.374 35.7086C172.716 35.4244 172.971 35.0441 173.138 34.5676C173.31 34.0911 173.395 33.5603 173.395 32.9751C173.395 32.3857 173.31 31.8528 173.138 31.3763C172.971 30.8957 172.716 30.5132 172.374 30.229C172.031 29.9448 171.604 29.8027 171.095 29.8027C170.572 29.8027 170.137 29.9448 169.79 30.229C169.448 30.5132 169.191 30.8957 169.019 31.3763C168.852 31.8528 168.769 32.3857 168.769 32.9751C168.769 33.5603 168.852 34.0911 169.019 34.5676C169.191 35.0441 169.448 35.4244 169.79 35.7086C170.137 35.9887 170.572 36.1287 171.095 36.1287ZM179.811 34.6867L183.667 28.1287H185.999V37.7588H183.805V31.1945L179.961 37.7588H177.623V28.1287H179.811V34.6867ZM183.046 24.8183H184.745C184.745 25.5498 184.48 26.1433 183.949 26.5989C183.422 27.0503 182.707 27.276 181.805 27.276C180.91 27.276 180.197 27.0503 179.667 26.5989C179.14 26.1433 178.879 25.5498 178.883 24.8183H180.569C180.569 25.1193 180.661 25.3889 180.845 25.6271C181.033 25.8612 181.353 25.9782 181.805 25.9782C182.248 25.9782 182.563 25.8612 182.751 25.6271C182.944 25.3931 183.042 25.1235 183.046 24.8183ZM187.251 29.9908V28.1287H195.678V29.9908H192.562V37.7588H190.367V29.9908H187.251ZM199.673 34.6867L203.529 28.1287H205.861V37.7588H203.667V31.1945L199.823 37.7588H197.485V28.1287H199.673V34.6867Z"
                    fill="white"
                  />
                </Svg>
              </Pressable>
            </View>
            <View
              style={{
                marginTop: 10,
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100%',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <View style={{marginInline: 5}}>
                  <Text
                    style={{
                      marginInline: 5,
                      fontWeight: '400',
                      color: '#B5B5B5',
                      fontFamily: 'Inter',
                      fontSize: 15,
                    }}>
                    {t('signInPage.ackauntredy')}
                  </Text>
                </View>
                <View style={{marginInline: 5}}>
                  <Pressable
                    onPress={() => {
                      navigation.navigate('Auth');
                    }}>
                    <Text
                      style={{
                        marginInline: 5,
                        fontWeight: '400',
                        color: '#1563FF',
                        fontFamily: 'Inter',
                        fontSize: 15,
                      }}>
                      {t('signInPage.signin')}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#828282',
  },
  logo: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 92,
    position: 'absolute',
  },
  logobg: {
    width: '100%',
    marginTop: 170,
    position: 'absolute',
  },
  title: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  TextTitle: {
    marginTop: 250,
    fontWeight: '600',
    fontSize: 35,
    color: '#FFFFFF',
    textAlignLast: 'center',
  },
});
export default SignInScreen;
