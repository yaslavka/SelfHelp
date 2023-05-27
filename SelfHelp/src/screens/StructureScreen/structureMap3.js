import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import structureavatar from '../../assets/Avatar/structureavatar/image.png';
import Svg, {Path} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';

function StructureMap3({item, t}) {
  const navigation = useNavigation();
  return (
    <>
      <View
        key={item.id}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          paddingHorizontal: 5,
        }}>
          {item.avatar ? (
              <View style={{borderRadius: 50, borderWidth: 3, borderStyle: 'solid', zIndex: 1, borderColor: '#1563FF'}}>
                  <Image
                      source={{uri: `http://192.168.0.100/api/user/avatars/${item.avatar}`}}
                      style={{
                          width: 46,
                          height: 46,
                          borderRadius: 50,
                          zIndex: 1,
                      }}
                  />
              </View>
          ):(
              <Image
                  source={structureavatar}
                  style={{
                      width: 46,
                      height: 46,
                      zIndex: 1,
                  }}
              />
          )}
        <View
          style={{
            borderWidth: 1,
            flex: 2,
            paddingVertical: 4,
            borderLeftWidth: 0,
            paddingLeft: 7,
            borderTopEndRadius: 30,
            borderBottomEndRadius: 30,
            borderColor: '#FFF9C3',
            backgroundColor: '#FFF9C3',
            marginHorizontal: -15,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              paddingHorizontal: 10,
            }}>
            <View>
              <Text>{item.last_name}</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('StructureProfile', {id: item.id})
                }
                style={{
                  backgroundColor: '#1563FF',
                  borderRadius: 20,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '600',
                    fontSize: 10,
                    textAlign: 'center',
                  }}>
                    {t('mystructure.profile')}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                  d="M16.2956 14.0001L12.0657 18.2301C11.6073 18.6884 11.6073 19.4323 12.0657 19.8906C12.524 20.349 13.2679 20.349 13.7262 19.8906L18.8341 14.7828C19.2669 14.3499 19.2669 13.6492 18.8341 13.2174L13.7262 8.10959C13.2679 7.65128 12.524 7.65128 12.0657 8.10959C11.6073 8.5679 11.6073 9.31183 12.0657 9.77014L16.2956 14.0001Z"
                  fill="#1563FF"
                />
              </Svg>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
export default StructureMap3;
