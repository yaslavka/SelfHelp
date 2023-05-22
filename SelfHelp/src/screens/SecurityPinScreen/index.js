import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';

function SecurityPinScreen() {
  return (
    <>
      <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
        <ScrollView
          contentContainerStyle={{width: '100%', flexGrow: 1, height: 'auto'}}
          contentInsetAdjustmentBehavior="automatic">
          <View style={{paddingHorizontal: 25}}>
            <Text
              style={{fontSize: 24, fontWeight: '700', paddingVertical: 20}}>
              Security Pin
            </Text>
            <Text style={{fontSize: 14, fontWeight: '400', marginBottom: 20}}>
              Security Pin is a code that is useful in increasing the security
              of your B-Wallet account, so that every transaction becomes safer
            </Text>

            <TouchableOpacity onPress={() => {}}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  display: 'flex',
                  flexDirection: 'row',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#F2F2F2',
                  paddingVertical: 15,
                  paddingHorizontal: 15,
                  marginBottom: 15,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <Svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <Path
                      d="M12 1C8.67619 1 6 3.67619 6 7V8C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8V7C18 3.67619 15.3238 1 12 1ZM12 3C14.2762 3 16 4.72381 16 7V8H8V7C8 4.72381 9.72381 3 12 3ZM12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13Z"
                      fill="#1563FF"
                    />
                  </Svg>
                  <Text style={{fontSize: 16, fontWeight: '400'}}>
                    {' '}
                    Security Pin
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <Svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <Path
                      d="M13.071 11.9997L9.24995 8.17866C8.83595 7.76466 8.83595 7.09266 9.24995 6.67866C9.66395 6.26466 10.336 6.26466 10.75 6.67866L15.364 11.2927C15.755 11.6837 15.755 12.3167 15.364 12.7067L10.75 17.3207C10.336 17.7347 9.66395 17.7347 9.24995 17.3207C8.83595 16.9067 8.83595 16.2347 9.24995 15.8207L13.071 11.9997Z"
                      fill="#FF9900"
                    />
                  </Svg>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
export default SecurityPinScreen;
