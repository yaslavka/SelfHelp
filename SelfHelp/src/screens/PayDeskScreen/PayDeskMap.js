import React from "react";
import {Alert, Text, TouchableOpacity, View} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {api} from "../../api";

function PayDeskMap({t, matrix}) {

    const joinTarif = (tarif)=>{
        api.juoinTarifs({tarif:tarif})
            .then(()=>{
                api.getUserInfo()
                    .then(()=>{})
                    .catch(()=>{})
            })
            .catch(err=>{
                Alert.alert(err.message)
            })
    }
    return(
        <>
            <View style={{backgroundColor: matrix.canBuy ?'#282828':'#8C8C8C', height: 35}}>
                <Text
                    style={{
                        color: '#fff',
                        fontSize: 20,
                        fontWeight: '700',
                        paddingVertical: 5,
                        paddingHorizontal: 25,
                    }}>
                    {matrix.name}{matrix.summ}
                </Text>
            </View>

            <View style={{backgroundColor: matrix.canBuy ?'#FFFFFF': '#D6D6D6'}}>
                <View
                    style={{
                        paddingHorizontal: 25,
                        paddingVertical: 5,
                        alignItems: 'flex-start',
                    }}>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            display: 'flex',
                            flexDirection: 'row',
                        }}>
                        <View>
                            <Text
                                style={{color: '#2C2C2C', fontWeight: '700', fontSize: 17}}>
                                {t('PayDesk.tarif1.input')}:
                            </Text>
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}>
                                <Text
                                    style={{color: '#2C2C2C', fontWeight: '700', fontSize: 17}}>
                                    TRX:{' '}
                                </Text>
                                <Text> {matrix.summ} </Text>
                            </View>
                        </View>
                        <MaterialCommunityIcons
                            name={'arrow-right-thick'}
                            size={35}
                            color={'rgba(0, 0, 0, 0.25)'}
                        />
                        <View>
                            <Text
                                style={{color: '#2C2C2C', fontWeight: '700', fontSize: 17}}>
                                {' '}
                                {t('PayDesk.tarif1.output')}:{' '}
                            </Text>
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}>
                                <Text
                                    style={{color: '#2C2C2C', fontWeight: '700', fontSize: 17}}>
                                    {' '}
                                    TRX:{' '}
                                </Text>
                                <Text
                                    style={{color: '#2C2C2C', fontWeight: '400', fontSize: 16}}>
                                    {' '}
                                    {matrix.id === 1 && 450} {matrix.id === 2 && 4500} {matrix.id === 3 && 45000}{' '}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            display: 'flex',
                            flexDirection: 'row',
                        }}>
                        <Text style={{color: '#2C2C2C', fontWeight: '700', fontSize: 17}}>
                            {t('PayDesk.tarif1.members')}:{' '}
                        </Text>
                        <Text style={{color: '#2C2C2C', fontWeight: '400', fontSize: 16}}>
                            {' '}
                            {matrix.count}
                        </Text>
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            display: 'flex',
                            flexDirection: 'row',
                        }}>
                        <Text style={{color: '#2C2C2C', fontWeight: '700', fontSize: 17}}>
                            {t('PayDesk.tarif1.budget')}: TRX{' '}
                        </Text>
                        <Text style={{color: '#2C2C2C', fontWeight: '400', fontSize: 16}}>
                            {' '}
                            {matrix.budget}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 25,
                        paddingVertical: 10,
                    }}>
                    <TouchableOpacity disabled={matrix.isActive || matrix.canBuy ? false: true} onPress={()=>joinTarif(matrix.id)}
                        style={{
                            backgroundColor: matrix.isActive?  '#219653' : matrix.canBuy ? '#1563FF' :'#4F4F4F',
                            width: '100%',
                            height: 50,
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text style={{color: '#FFF', fontSize: 17, fontWeight: '600'}}>
                            {matrix.isActive ? `${t('homescreen.buttons.active')} ${matrix.count}` : `${t('homescreen.buttons.join')}`}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}
export default PayDeskMap
