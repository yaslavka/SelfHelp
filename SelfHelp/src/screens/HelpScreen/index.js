import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {useTranslation} from "react-i18next";

function HelpScreen() {
    const {t} = useTranslation('common');
  return (
    <>
      <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
        <ScrollView
          contentContainerStyle={{width: '100%', flexGrow: 1, height: 'auto'}}
          contentInsetAdjustmentBehavior="automatic">
          <View style={{borderBottomWidth: 1, borderBottomColor: '#F2F2F2'}}>
            <View style={{paddingHorizontal: 25}}>
              <TouchableOpacity
                style={{
                  paddingVertical: 20,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontWeight: '500', fontSize: 16}}>
                 {t('help.What')}
                </Text>
                <Svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M13.071 11.9997L9.24995 8.17866C8.83595 7.76466 8.83595 7.09266 9.24995 6.67866C9.66395 6.26466 10.336 6.26466 10.75 6.67866L15.364 11.2927C15.755 11.6837 15.755 12.3167 15.364 12.7067L10.75 17.3207C10.336 17.7347 9.66395 17.7347 9.24995 17.3207C8.83595 16.9067 8.83595 16.2347 9.24995 15.8207L13.071 11.9997Z"
                    fill="#1563FF"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{borderBottomWidth: 1, borderBottomColor: '#F2F2F2'}}>
            <View style={{paddingHorizontal: 25}}>
              <TouchableOpacity
                style={{
                  paddingVertical: 20,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontWeight: '500', fontSize: 16}}>{t('help.General')}</Text>
                <Svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M13.071 11.9997L9.24995 8.17866C8.83595 7.76466 8.83595 7.09266 9.24995 6.67866C9.66395 6.26466 10.336 6.26466 10.75 6.67866L15.364 11.2927C15.755 11.6837 15.755 12.3167 15.364 12.7067L10.75 17.3207C10.336 17.7347 9.66395 17.7347 9.24995 17.3207C8.83595 16.9067 8.83595 16.2347 9.24995 15.8207L13.071 11.9997Z"
                    fill="#1563FF"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{borderBottomWidth: 1, borderBottomColor: '#F2F2F2'}}>
            <View style={{paddingHorizontal: 25}}>
              <TouchableOpacity
                style={{
                  paddingVertical: 20,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontWeight: '500', fontSize: 16}}>{t('help.TopUp')}</Text>
                <Svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M13.071 11.9997L9.24995 8.17866C8.83595 7.76466 8.83595 7.09266 9.24995 6.67866C9.66395 6.26466 10.336 6.26466 10.75 6.67866L15.364 11.2927C15.755 11.6837 15.755 12.3167 15.364 12.7067L10.75 17.3207C10.336 17.7347 9.66395 17.7347 9.24995 17.3207C8.83595 16.9067 8.83595 16.2347 9.24995 15.8207L13.071 11.9997Z"
                    fill="#1563FF"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{borderBottomWidth: 1, borderBottomColor: '#F2F2F2'}}>
            <View style={{paddingHorizontal: 25}}>
              <TouchableOpacity
                style={{
                  paddingVertical: 20,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontWeight: '500', fontSize: 16}}>{t('help.Request')}</Text>
                <Svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M13.071 11.9997L9.24995 8.17866C8.83595 7.76466 8.83595 7.09266 9.24995 6.67866C9.66395 6.26466 10.336 6.26466 10.75 6.67866L15.364 11.2927C15.755 11.6837 15.755 12.3167 15.364 12.7067L10.75 17.3207C10.336 17.7347 9.66395 17.7347 9.24995 17.3207C8.83595 16.9067 8.83595 16.2347 9.24995 15.8207L13.071 11.9997Z"
                    fill="#1563FF"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{borderBottomWidth: 1, borderBottomColor: '#F2F2F2'}}>
            <View style={{paddingHorizontal: 25}}>
              <TouchableOpacity
                style={{
                  paddingVertical: 20,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontWeight: '500', fontSize: 16}}>{t('help.Send')}</Text>
                <Svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M13.071 11.9997L9.24995 8.17866C8.83595 7.76466 8.83595 7.09266 9.24995 6.67866C9.66395 6.26466 10.336 6.26466 10.75 6.67866L15.364 11.2927C15.755 11.6837 15.755 12.3167 15.364 12.7067L10.75 17.3207C10.336 17.7347 9.66395 17.7347 9.24995 17.3207C8.83595 16.9067 8.83595 16.2347 9.24995 15.8207L13.071 11.9997Z"
                    fill="#1563FF"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{borderBottomWidth: 1, borderBottomColor: '#F2F2F2'}}>
            <View style={{paddingHorizontal: 25}}>
              <TouchableOpacity
                style={{
                  paddingVertical: 20,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontWeight: '500', fontSize: 16}}>
                    {t('help.ClaimPromo')}
                </Text>
                <Svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M13.071 11.9997L9.24995 8.17866C8.83595 7.76466 8.83595 7.09266 9.24995 6.67866C9.66395 6.26466 10.336 6.26466 10.75 6.67866L15.364 11.2927C15.755 11.6837 15.755 12.3167 15.364 12.7067L10.75 17.3207C10.336 17.7347 9.66395 17.7347 9.24995 17.3207C8.83595 16.9067 8.83595 16.2347 9.24995 15.8207L13.071 11.9997Z"
                    fill="#1563FF"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{borderBottomWidth: 1, borderBottomColor: '#F2F2F2'}}>
            <View style={{paddingHorizontal: 25}}>
              <TouchableOpacity
                style={{
                  paddingVertical: 20,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontWeight: '500', fontSize: 16}}>
                    {t('help.SecurityPin')}
                </Text>
                <Svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M13.071 11.9997L9.24995 8.17866C8.83595 7.76466 8.83595 7.09266 9.24995 6.67866C9.66395 6.26466 10.336 6.26466 10.75 6.67866L15.364 11.2927C15.755 11.6837 15.755 12.3167 15.364 12.7067L10.75 17.3207C10.336 17.7347 9.66395 17.7347 9.24995 17.3207C8.83595 16.9067 8.83595 16.2347 9.24995 15.8207L13.071 11.9997Z"
                    fill="#1563FF"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{borderBottomWidth: 1, borderBottomColor: '#F2F2F2'}}>
            <View style={{paddingHorizontal: 25}}>
              <TouchableOpacity
                style={{
                  paddingVertical: 20,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontWeight: '500', fontSize: 16}}>{t('help.Payment')}</Text>
                <Svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M13.071 11.9997L9.24995 8.17866C8.83595 7.76466 8.83595 7.09266 9.24995 6.67866C9.66395 6.26466 10.336 6.26466 10.75 6.67866L15.364 11.2927C15.755 11.6837 15.755 12.3167 15.364 12.7067L10.75 17.3207C10.336 17.7347 9.66395 17.7347 9.24995 17.3207C8.83595 16.9067 8.83595 16.2347 9.24995 15.8207L13.071 11.9997Z"
                    fill="#1563FF"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
export default HelpScreen;
