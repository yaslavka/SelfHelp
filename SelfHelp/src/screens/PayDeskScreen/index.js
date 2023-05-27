import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
    SafeAreaView,
    ScrollView,
    RefreshControl, Alert,
} from 'react-native';
import bg from '../../assets/background/image.png';
import profile from '../../assets/profile/image.png';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../actions/app.actions';
import PayDeskMap from "./PayDeskMap";
import {useTranslation} from "react-i18next";
import {api, baseURLAvatar} from "../../api";

function PayDeskScreen() {
    const {t} = useTranslation('common');
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const [matrixTypes, setMatrixTypes] = useState(null);
  const userInfo = useSelector(state => state.app.user);

    useEffect(()=>{
        api
            .getMatrixTypes()
            .then(response=>{
                setMatrixTypes(response)
            })
            .catch(err=>{
                Alert.alert(err.message)
            })
    },[])
  const onRefresh = async () => {
    try {
      setRefresh(true);
      dispatch(actions.userInfo());
    } finally {
      setRefresh(false);
    }
  };
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
          {userInfo && (
              <>
                  <View
                      style={{
                          marginTop: 40,
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          display: 'flex',
                          flexDirection: 'row',
                          marginHorizontal: 25,
                          marginBottom: 25,
                      }}>
                      <View>
                          <Text style={{color: '#FFF', fontWeight: '700', fontSize: 22}}>
                              {t('homescreen.userInfo.balance')}
                          </Text>
                          <Text style={{color: '#FFF', fontWeight: '500', fontSize: 17}}>
                              {userInfo.balance} $
                          </Text>
                          <Text style={{color: '#FFF', fontWeight: '500', fontSize: 17}}>
                              {userInfo.trx} TRX
                          </Text>
                      </View>
                      {!userInfo?.avatar?(
                          <Image
                              source={profile}
                              style={{
                                  width: 52.99,
                                  height: 52.99,
                              }}
                          />
                      ):(
                          <Image
                              source={{uri: `${baseURLAvatar}/${userInfo.avatar}`}}
                              style={{
                                  width: 52.99,
                                  height: 52.99,
                                  borderRadius: 50
                              }}
                          />
                      )}
                  </View>
                  {matrixTypes && (
                      <>
                          {matrixTypes.map((matrix)=>(
                              <PayDeskMap t={t} matrix={matrix} key={matrix.id}/>
                          ))}
                      </>
                  )}
              </>
          )}
      </ScrollView>
    </SafeAreaView>
  );
}
export default PayDeskScreen;
