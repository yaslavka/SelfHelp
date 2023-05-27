import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
    ActivityIndicator,
  TouchableOpacity,
    Image, Alert
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
import avatars from '../../assets/Avatar/image.png';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {api, baseURLAvatar} from '../../api';
import {useDispatch, useSelector} from "react-redux";
import * as actions from '../../actions/auth.actions';
function SignUpScreen({location}) {
  const {t} = useTranslation('common');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const inviterLoading = useSelector(state => state.auth.loadings.inviter);
  const inviter = useSelector(state => state.auth.inviter);
  const [signUpStatus, setSignUpStatus] = useState(null);
  const [state, setState] = useState({
      referral: '',
    phone: '',
    last_name: '',
    email: '',
    password: '',
  });
  const {referral, last_name, phone, email, password} = state;
  const handleOnchanges = (text, input) => {
    setState(prevState => ({...prevState, [input]: text}));
  };

    const referralName = useMemo(() => {
        let referral = '';
        if (location) {
            const searchParams = new URLSearchParams(location.search);
            const ref = searchParams.get('ref');
            if (ref) {
                referral = ref;
            }
        }
        return referral;
    }, [location]);
    const getInviterByName = useCallback(
        name => {
            //console.log(name)
            dispatch(actions.inviter(name));
        },
        [dispatch],
    );
    useEffect(() => {
        if (referralName) {
            getInviterByName(referralName);
        }
        return () => {
            dispatch(actions.clearInviter());
        };
    }, [dispatch, referralName, getInviterByName]);

    const handleOnBlurReferralField = () => {
        const inviterName = referral;
        console.log(inviterName);
        if (inviterName) {
            getInviterByName(inviterName);
        } else {
            dispatch(actions.clearInviter());
        }
    };

  const handleOnSubmit = () => {
    setSignUpStatus('progress');
    api
      .signUp({
          inviter: referral,
        last_name: last_name,
        phone: phone,
        email: email,
        password: password,
      })
      .then(() => {
        setSignUpStatus('successful');
      })
      .catch((err) => {
        setSignUpStatus('failed');
        Alert.alert(err.message)
      });
  };

  // TODO: refactoring
  if (signUpStatus === 'successful') {
    return navigation.navigate('Otp', {phone:phone, email: email});
  }
  return (
    <>
      <SafeAreaView style={styles.container}>
          {inviterLoading ?(
              <>
                  <View style={styles.logo}>
                      <ActivityIndicator
                          size="large"
                          color="#00ff00"
                          animating={inviterLoading}
                      />
                  </View>
              </>
          ):(
              <>
                  <View>
                      {inviter ? (
                          <>
                              <View style={styles.logo}>
                                  <View style={styles.titleinviter}>
                                      <Text style={styles.TextTitleinviter}>{t('signUpPage.inviter.title')}</Text>
                                  </View>
                                  {inviter?.avatar ? (
                                      <Image
                                          style={{width: 70, height: 70, borderRadius: 50}}
                                          source={{uri: `${baseURLAvatar}/${inviter.avatar}`}}
                                      />
                                  ):(
                                      <Image
                                          style={{width: 70, height: 70}}
                                          source={avatars}
                                      />
                                  )}
                                  <View style={styles.titleinviter}>
                                      <Text style={styles.TextTitleinviter}>{inviter.last_name}</Text>
                                  </View>
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
                          </>
                      ):(
                          <>
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
                          </>
                      )}
                  </View>
              </>
          )}
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
                {t('signUpPage.title')}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 20,
              }}>
                <TextInput
                    placeholder={`${t('signUpPage.input.inviter')}`}
                    onChangeText={text => handleOnchanges(text, 'referral')}
                    onBlur={handleOnBlurReferralField}
                    style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        height: 60,
                        borderColor: '#D7D7D7',
                        marginBottom: 25,
                        width: '100%',
                    }}
                />
              <TextInput
                placeholder={`${t('signUpPage.input.lastname')}`}
                onChangeText={text => handleOnchanges(text, 'last_name')}
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  height: 60,
                  borderColor: '#D7D7D7',
                  marginBottom: 25,
                  width: '100%',
                }}
              />
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
                placeholder={`${t('signUpPage.input.phone')}`}
              />
              <TextInput
                onChangeText={text => handleOnchanges(text, 'email')}
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  height: 60,
                  marginBottom: 15,
                  borderColor: '#D7D7D7',
                  width: '100%',
                }}
                placeholder={`${t('signUpPage.input.email')}`}
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
                placeholder={`${t('signUpPage.input.password')}`}
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
              <TouchableOpacity
                onPress={handleOnSubmit}>
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
                    d="M122.821 37.1183V24.4747H127.562C128.534 24.4747 129.349 24.6558 130.007 25.0179C130.67 25.3801 131.17 25.8781 131.507 26.512C131.849 27.1417 132.02 27.8578 132.02 28.6604C132.02 29.4712 131.849 30.1915 131.507 30.8212C131.166 31.4509 130.662 31.9468 129.995 32.309C129.328 32.6671 128.507 32.8461 127.532 32.8461H124.389V30.9632H127.223C127.791 30.9632 128.256 30.8644 128.618 30.6668C128.98 30.4693 129.248 30.1976 129.421 29.8519C129.598 29.5062 129.686 29.109 129.686 28.6604C129.686 28.2118 129.598 27.8167 129.421 27.4751C129.248 27.1334 128.978 26.868 128.612 26.6787C128.25 26.4852 127.783 26.3885 127.21 26.3885H125.111V37.1183H122.821ZM137.973 37.3035C137.022 37.3035 136.201 37.1059 135.509 36.7108C134.822 36.3116 134.293 35.7477 133.923 35.0192C133.552 34.2866 133.367 33.4244 133.367 32.4325C133.367 31.4571 133.552 30.601 133.923 29.8643C134.297 29.1234 134.82 28.5472 135.491 28.1356C136.162 27.7199 136.95 27.5121 137.855 27.5121C138.44 27.5121 138.991 27.6068 139.51 27.7961C140.033 27.9813 140.494 28.2694 140.893 28.6604C141.296 29.0514 141.613 29.5494 141.844 30.1544C142.074 30.7553 142.189 31.4715 142.189 32.3028V32.9881H134.417V31.4817H140.047C140.043 31.0537 139.95 30.673 139.769 30.3396C139.588 30.0021 139.335 29.7367 139.01 29.5432C138.689 29.3498 138.314 29.2531 137.886 29.2531C137.429 29.2531 137.028 29.3642 136.682 29.5864C136.337 29.8046 136.067 30.0927 135.874 30.4508C135.684 30.8047 135.588 31.1936 135.583 31.6176V32.9326C135.583 33.4841 135.684 33.9574 135.886 34.3525C136.088 34.7435 136.37 35.0439 136.732 35.2538C137.094 35.4596 137.518 35.5625 138.004 35.5625C138.329 35.5625 138.623 35.5173 138.886 35.4267C139.15 35.332 139.378 35.1942 139.572 35.0131C139.765 34.832 139.911 34.6077 140.01 34.3401L142.097 34.5747C141.965 35.1263 141.714 35.6078 141.343 36.0194C140.977 36.4268 140.508 36.7438 139.936 36.9701C139.364 37.1924 138.709 37.3035 137.973 37.3035ZM150.352 27.6356V29.4691H146.265V37.1183H144.08V27.6356H150.352ZM154.299 34.0932L158.096 27.6356H160.392V37.1183H158.231V30.6545L154.447 37.1183H152.144V27.6356H154.299V34.0932ZM166.824 37.3035C165.877 37.3035 165.064 37.0956 164.385 36.68C163.71 36.2643 163.189 35.6901 162.823 34.9575C162.461 34.2208 162.28 33.3729 162.28 32.414C162.28 31.4509 162.465 30.601 162.835 29.8643C163.206 29.1234 163.729 28.5472 164.404 28.1356C165.083 27.7199 165.885 27.5121 166.811 27.5121C167.581 27.5121 168.262 27.6541 168.855 27.9381C169.452 28.2179 169.927 28.6151 170.281 29.1296C170.635 29.6399 170.837 30.2367 170.886 30.9199H168.75C168.663 30.4631 168.458 30.0824 168.132 29.7778C167.811 29.4691 167.381 29.3148 166.842 29.3148C166.385 29.3148 165.984 29.4383 165.638 29.6852C165.293 29.928 165.023 30.2779 164.83 30.7347C164.64 31.1916 164.546 31.739 164.546 32.3769C164.546 33.0231 164.64 33.5787 164.83 34.0438C165.019 34.5048 165.284 34.8608 165.626 35.1119C165.972 35.3588 166.377 35.4823 166.842 35.4823C167.171 35.4823 167.466 35.4205 167.725 35.2971C167.988 35.1695 168.209 34.9863 168.386 34.7476C168.563 34.5089 168.684 34.2187 168.75 33.8771H170.886C170.832 34.548 170.635 35.1427 170.293 35.6613C169.952 36.1758 169.487 36.5791 168.898 36.8713C168.309 37.1594 167.618 37.3035 166.824 37.3035ZM172.033 29.4691V27.6356H180.33V29.4691H177.262V37.1183H175.101V29.4691H172.033ZM182.11 40.6743V27.6356H184.307V29.2037H184.437C184.552 28.9732 184.715 28.7283 184.925 28.469C185.135 28.2056 185.419 27.9813 185.777 27.7961C186.135 27.6068 186.592 27.5121 187.147 27.5121C187.88 27.5121 188.54 27.6994 189.129 28.0739C189.722 28.4443 190.191 28.9938 190.537 29.7223C190.886 30.4466 191.061 31.3356 191.061 32.3893C191.061 33.4306 190.891 34.3155 190.549 35.0439C190.207 35.7724 189.742 36.3281 189.154 36.7108C188.565 37.0936 187.898 37.285 187.153 37.285C186.61 37.285 186.16 37.1944 185.801 37.0133C185.443 36.8322 185.155 36.6141 184.937 36.3589C184.723 36.0996 184.556 35.8547 184.437 35.6243H184.344V40.6743H182.11ZM184.301 32.3769C184.301 32.9902 184.388 33.5273 184.561 33.9882C184.738 34.4492 184.991 34.8093 185.32 35.0686C185.653 35.3238 186.057 35.4514 186.53 35.4514C187.024 35.4514 187.437 35.3197 187.771 35.0563C188.104 34.7888 188.355 34.4245 188.524 33.9636C188.697 33.4985 188.783 32.9696 188.783 32.3769C188.783 31.7884 188.699 31.2657 188.53 30.8088C188.361 30.352 188.11 29.9939 187.777 29.7346C187.444 29.4753 187.028 29.3457 186.53 29.3457C186.053 29.3457 185.647 29.4712 185.314 29.7223C184.98 29.9733 184.727 30.3252 184.554 30.778C184.386 31.2307 184.301 31.7637 184.301 32.3769ZM195.704 37.3097C195.103 37.3097 194.562 37.2027 194.08 36.9886C193.603 36.7705 193.224 36.4495 192.944 36.0256C192.669 35.6016 192.531 35.0789 192.531 34.4574C192.531 33.9224 192.629 33.48 192.827 33.1301C193.025 32.7803 193.294 32.5004 193.636 32.2905C193.977 32.0806 194.362 31.9221 194.79 31.8151C195.222 31.704 195.669 31.6237 196.13 31.5744C196.686 31.5167 197.136 31.4653 197.482 31.42C197.828 31.3706 198.079 31.2965 198.235 31.1978C198.396 31.0949 198.476 30.9364 198.476 30.7224V30.6853C198.476 30.2203 198.338 29.8601 198.062 29.605C197.787 29.3498 197.389 29.2222 196.871 29.2222C196.323 29.2222 195.889 29.3416 195.568 29.5803C195.251 29.819 195.037 30.1009 194.926 30.4261L192.839 30.1297C193.004 29.5535 193.276 29.072 193.654 28.6851C194.033 28.2941 194.496 28.0019 195.043 27.8084C195.591 27.6109 196.196 27.5121 196.858 27.5121C197.315 27.5121 197.77 27.5656 198.223 27.6726C198.676 27.7796 199.089 27.9566 199.464 28.2035C199.838 28.4464 200.139 28.7777 200.365 29.1975C200.596 29.6173 200.711 30.1421 200.711 30.7718V37.1183H198.562V35.8156H198.488C198.352 36.0791 198.161 36.326 197.914 36.5565C197.671 36.7829 197.365 36.966 196.994 37.1059C196.628 37.2418 196.198 37.3097 195.704 37.3097ZM196.284 35.6675C196.733 35.6675 197.122 35.579 197.451 35.402C197.78 35.2209 198.033 34.9822 198.21 34.6859C198.392 34.3895 198.482 34.0664 198.482 33.7166V32.5992C198.412 32.6568 198.293 32.7103 198.124 32.7597C197.959 32.8091 197.774 32.8523 197.568 32.8893C197.363 32.9264 197.159 32.9593 196.957 32.9881C196.756 33.0169 196.581 33.0416 196.432 33.0622C196.099 33.1075 195.801 33.1816 195.537 33.2845C195.274 33.3873 195.066 33.5314 194.914 33.7166C194.761 33.8977 194.685 34.1323 194.685 34.4204C194.685 34.832 194.836 35.1427 195.136 35.3526C195.436 35.5625 195.819 35.6675 196.284 35.6675ZM210.965 27.6356V35.4514H212.416V40.1681H210.231V37.1183H202.958V27.6356H205.113V35.2847H208.829V27.6356H210.965ZM216.403 34.0932L220.199 27.6356H222.496V37.1183H220.335V30.6545L216.551 37.1183H214.248V27.6356H216.403V34.0932ZM230.397 37.1183V29.4506H228.372C227.857 29.4506 227.462 29.57 227.186 29.8087C226.911 30.0474 226.775 30.3437 226.779 30.6977C226.775 31.0517 226.905 31.3439 227.168 31.5744C227.431 31.8048 227.808 31.9201 228.298 31.9201H231.101V33.5499H228.298C227.54 33.5499 226.886 33.4306 226.335 33.1918C225.783 32.9531 225.359 32.6156 225.063 32.1794C224.766 31.7431 224.618 31.2327 224.618 30.6483C224.618 30.0392 224.768 29.5103 225.069 29.0617C225.373 28.6089 225.806 28.2591 226.365 28.0122C226.929 27.7611 227.598 27.6356 228.372 27.6356H232.49V37.1183H230.397ZM224.273 37.1183L226.921 32.2535H229.125L226.47 37.1183H224.273Z"
                    fill="white"
                  />
                </Svg>
              </TouchableOpacity>
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
                    {t('signUpPage.ackauntredy')}
                  </Text>
                </View>
                <View style={{marginInline: 5}}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('SignIn');
                    }}>
                    <Text
                      style={{
                        marginInline: 5,
                        fontWeight: '400',
                        color: '#1563FF',
                        fontFamily: 'Inter',
                        fontSize: 15,
                      }}>
                      {t('signUpPage.signin')}
                    </Text>
                  </TouchableOpacity>
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
    titleinviter:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
  TextTitle: {
    marginTop: 250,
    fontWeight: '600',
    fontSize: 20,
    color: '#FFFFFF',
    textAlignLast: 'center',
  },
    TextTitleinviter:{
        fontWeight: '600',
        fontSize: 17,
        color: '#FFFFFF',
        textAlignLast: 'center',
    }
});
export default SignUpScreen;
