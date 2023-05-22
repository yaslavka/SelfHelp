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

function HelpScreen() {
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
                  What is Self-Help App?
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
                  General Information
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
                <Text style={{fontWeight: '500', fontSize: 16}}>Top Up</Text>
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
                <Text style={{fontWeight: '500', fontSize: 16}}>Request</Text>
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
                <Text style={{fontWeight: '500', fontSize: 16}}>Send</Text>
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
                  Claim Promo
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
                  Security Pin
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
                <Text style={{fontWeight: '500', fontSize: 16}}>Payment</Text>
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
