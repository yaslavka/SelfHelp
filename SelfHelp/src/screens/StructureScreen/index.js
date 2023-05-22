import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import bg from '../../assets/background/image.png';
import profile from '../../assets/profile/image.png';
import {useDispatch} from 'react-redux';
import * as actions from '../../actions/app.actions';
import {useNavigation} from '@react-navigation/native';
import Svg, {Path} from 'react-native-svg';
import {structure} from './structure';
import StructureMap from './structureMap';
import StructureMap2 from './structureMap2';
import StructureMap3 from './structureMap3';

function StructureScreen() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(false);
  const [struct, setStruct] = useState(structure);
  const dispatch = useDispatch();
  const onRefresh = async () => {
    try {
      setRefresh(true);
      dispatch(actions.userInfo());
    } finally {
      setRefresh(false);
    }
  };
  console.log(struct);
  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <ScrollView
        contentContainerStyle={{width: '100%', flexGrow: 1, height: 'auto'}}
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }>
        <Image
          source={bg}
          style={{
            width: '100%',
            height: 157,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
        <View
          style={{
            marginTop: 40,
            alignItems: 'center',
            justifyContent: 'space-between',
            display: 'flex',
            flexDirection: 'row',
            paddingHorizontal: 25,
            marginBottom: 60,
          }}>
          <View>
            <Text style={{color: '#FFF', fontWeight: '700', fontSize: 22}}>
              Баланс:
            </Text>
            <Text style={{color: '#FFF', fontWeight: '500', fontSize: 17}}>
              3,530 $
            </Text>
            <Text style={{color: '#FFF', fontWeight: '500', fontSize: 17}}>
              55,49231 TRX
            </Text>
          </View>
          <Image
            source={profile}
            style={{
              width: 52.99,
              height: 52.99,
            }}
          />
        </View>
        <View style={{paddingHorizontal: 25}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: '#000000', fontSize: 22, fontWeight: '700'}}>
              Моя Структура
            </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                  d="M18.3333 9.79297C17.8642 9.79297 17.3946 9.97524 17.0371 10.3337L6.66732 20.7035C5.95049 21.4203 5.95049 22.5809 6.66732 23.2959L17.0371 33.6657C17.754 34.3825 18.9146 34.3825 19.6296 33.6657L19.7871 33.5081C20.504 32.7913 20.504 31.6307 19.7871 30.9157L12.7044 23.833H36.6667C37.6787 23.833 38.5 23.0117 38.5 21.9997C38.5 20.9877 37.6787 20.1663 36.6667 20.1663H12.7044L19.7871 13.0837C20.504 12.3668 20.504 11.2062 19.7871 10.4912L19.6296 10.3337C19.2711 9.97524 18.8024 9.79297 18.3333 9.79297Z"
                  fill="#949494"
                />
              </Svg>
            </TouchableOpacity>
          </View>
          <View>
            {struct.ref1.map(item => (
              <>
                <StructureMap item={item} key={item.id} />
              </>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default StructureScreen;
