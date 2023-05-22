import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import structureavatar from '../../assets/Avatar/structureavatar/image.png';
import Svg, {Path} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import StructureMap2 from './structureMap2';

function StructureMap({item}) {
  const [open, setOpen] = useState(false);
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
        }}>
        <Image
          source={structureavatar}
          style={{
            width: 57,
            height: 57,
            zIndex: 1,
          }}
        />
        <View
          style={{
            borderWidth: 1,
            flex: 2,
            paddingVertical: 8,
            borderLeftWidth: 0,
            paddingLeft: 7,
            borderTopEndRadius: 30,
            borderBottomEndRadius: 30,
            borderColor: '#1563FF',
            backgroundColor: '#EBF2FF',
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
              <Text>{item.name}</Text>
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
                  Профиль
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setOpen(!open)}>
              {!open ? (
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
              ) : (
                <Svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M14.0031 16.2925L9.77308 12.0625C9.31477 11.6042 8.57084 11.6042 8.11253 12.0625C7.65422 12.5208 7.65422 13.2647 8.11253 13.723L13.2204 18.8309C13.6532 19.2637 14.354 19.2637 14.7857 18.8309L19.8936 13.723C20.3519 13.2647 20.3519 12.5208 19.8936 12.0625C19.4353 11.6042 18.6913 11.6042 18.233 12.0625L14.0031 16.2925Z"
                    fill="#1563FF"
                  />
                </Svg>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {open && (
        <>
          {item.ref2.map(item2 => (
            <>
              <StructureMap2 item={item2} key={item2.id} />
            </>
          ))}
        </>
      )}
    </>
  );
}
export default StructureMap;
