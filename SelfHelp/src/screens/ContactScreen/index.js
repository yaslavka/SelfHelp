import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  TextInput,
} from 'react-native';
import Svg, {Circle, Path, Rect} from 'react-native-svg';

function ContactScreen() {
  return (
    <>
      <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
        <ScrollView
          contentContainerStyle={{width: '100%', flexGrow: 1, height: 'auto'}}
          contentInsetAdjustmentBehavior="automatic">
          <View style={{paddingHorizontal: 25}}>
            <Text
              style={{fontSize: 24, fontWeight: '700', paddingVertical: 20}}>
              Contact
            </Text>
            <Text style={{fontSize: 14, fontWeight: '400', marginBottom: 20}}>
              We always ready to help you from Monday until Friday on 09.00 AM
              until 05.00 PM. Contact us with this following contact:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 20,
                borderWidth: 1,
                paddingHorizontal: 14,
                borderRadius: 10,
                borderColor: '#D7D7D7',
                marginBottom: 25,
              }}>
              <Svg
                width="56"
                height="56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Rect width="56" height="56" rx="16" fill="#1563FF" />
                <Path
                  d="M28 18C22.4887 18 18 22.4887 18 28C18 33.5113 22.4887 38 28 38H32C32.1325 38.0019 32.2641 37.9774 32.387 37.928C32.51 37.8786 32.6219 37.8052 32.7163 37.7122C32.8107 37.6191 32.8856 37.5082 32.9368 37.386C32.9879 37.2637 33.0142 37.1325 33.0142 37C33.0142 36.8675 32.9879 36.7363 32.9368 36.614C32.8856 36.4918 32.8107 36.3809 32.7163 36.2878C32.6219 36.1948 32.51 36.1214 32.387 36.072C32.2641 36.0226 32.1325 35.9981 32 36H28C23.5693 36 20 32.4307 20 28C20 23.5693 23.5693 20 28 20C32.4307 20 36 23.5693 36 28V29.5C36 30.3408 35.3408 31 34.5 31C33.6592 31 33 30.3408 33 29.5V28C33.0001 27.9628 32.9982 27.9256 32.9941 27.8887C32.9339 25.1904 30.712 23 28 23C25.2504 23 23 25.2504 23 28C23 30.7496 25.2504 33 28 33C29.4136 33 30.6879 32.3989 31.5996 31.4473C32.2307 32.3809 33.2977 33 34.5 33C36.4212 33 38 31.4212 38 29.5V28C38 22.4887 33.5113 18 28 18ZM28 25C29.6687 25 31 26.3313 31 28C31 29.6687 29.6687 31 28 31C26.3313 31 25 29.6687 25 28C25 26.3313 26.3313 25 28 25Z"
                  fill="white"
                />
              </Svg>
              <View style={{alignItems: 'flex-end'}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    marginBottom: 5,
                    color: '#949494',
                  }}>
                  Email
                </Text>
                <Text
                  style={{fontSize: 18, fontWeight: '600', marginBottom: 5}}>
                  Selfhelpapp@gmail.com
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 20,
                borderWidth: 1,
                paddingHorizontal: 14,
                borderRadius: 10,
                borderColor: '#D7D7D7',
              }}>
              <Svg
                width="56"
                height="56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Rect width="56" height="56" rx="16" fill="#1563FF" />
                <Path
                  d="M35.0771 20.9277C32.9951 18.8447 30.1551 17.7937 27.1731 18.0337C23.1641 18.3557 19.6501 21.1437 18.4741 24.9897C17.6341 27.7377 17.9871 30.6067 19.3551 32.9767L18.0591 37.2797C17.9351 37.6927 18.3121 38.0817 18.7291 37.9707L23.2331 36.7637C24.6921 37.5597 26.3341 37.9787 28.0061 37.9797H28.0101C32.2051 37.9797 36.0811 35.4137 37.4221 31.4387C38.7281 27.5627 37.7621 23.6157 35.0771 20.9277ZM32.8981 31.5537C32.6901 32.1367 31.6711 32.6987 31.2131 32.7397C30.7551 32.7817 30.3261 32.9467 28.2181 32.1157C25.6811 31.1157 24.0791 28.5147 23.9551 28.3487C23.8301 28.1817 22.9361 26.9957 22.9361 25.7677C22.9361 24.5397 23.5811 23.9357 23.8101 23.6867C24.0391 23.4367 24.3091 23.3747 24.4761 23.3747C24.6421 23.3747 24.8091 23.3747 24.9541 23.3807C25.1321 23.3877 25.3291 23.3967 25.5161 23.8117C25.7381 24.3057 26.2231 25.5397 26.2851 25.6647C26.3471 25.7897 26.3891 25.9357 26.3061 26.1017C26.2231 26.2677 26.1811 26.3717 26.0571 26.5177C25.9321 26.6637 25.7951 26.8427 25.6831 26.9547C25.5581 27.0787 25.4281 27.2147 25.5731 27.4637C25.7191 27.7137 26.2191 28.5307 26.9611 29.1917C27.9151 30.0417 28.7181 30.3047 28.9681 30.4307C29.2181 30.5557 29.3631 30.5347 29.5091 30.3677C29.6551 30.2017 30.1331 29.6397 30.2991 29.3897C30.4651 29.1397 30.6321 29.1817 30.8611 29.2647C31.0901 29.3477 32.3171 29.9517 32.5661 30.0767C32.8161 30.2017 32.9821 30.2637 33.0441 30.3677C33.1061 30.4707 33.1061 30.9707 32.8981 31.5537Z"
                  fill="white"
                />
              </Svg>
              <View style={{alignItems: 'flex-end'}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    marginBottom: 5,
                    color: '#949494',
                  }}>
                  Whatsapp
                </Text>
                <Text
                  style={{fontSize: 18, fontWeight: '600', marginBottom: 5}}>
                  087 7767 8765
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
export default ContactScreen;
