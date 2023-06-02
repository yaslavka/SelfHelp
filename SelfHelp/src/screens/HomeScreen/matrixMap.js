import React, {useState} from "react";
import {Alert, Image, Text, TouchableOpacity, View} from "react-native";
import avatars from "../../assets/Avatar/image.png";
import {api} from "../../api";
import {useTranslation} from "react-i18next";

function MatrixMap({matrix, setError}) {
    const {t} = useTranslation('common');
    const [tarif, setTarif]=useState(false)

    const joinTarif = (tarif)=>{
        api.juoinTarifs({tarif:tarif})
            .then(()=>{
                api.getUserInfo()
                    .then(()=>{})
                    .catch(()=>{})
            })
            .catch(err=>{
                setError(err.message)
            })
    }

    return(
        <>
            <TouchableOpacity
                onPress={() => {
                    setTarif(!tarif);
                }}>
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        display: 'flex',
                        flexDirection: 'row',
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                    }}>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            display: 'flex',
                            flexDirection: 'row',
                        }}>
                        <View>
                            <Image source={avatars} style={{width: 46, height: 46}} />
                        </View>
                        <View>
                            <Text
                                style={{
                                    marginHorizontal: 10,
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                }}>
                                {matrix.name}-{matrix.summ}
                            </Text>
                        </View>
                    </View>
                    <Text
                        style={{
                            color: '#949494',
                            fontWeight: '400',
                            fontSize: 22,
                            textAlign: 'center',
                        }}>
                        {matrix.count}
                    </Text>
                </View>
            </TouchableOpacity>
            {tarif && (
                <View
                    style={{
                        borderBottomWidth: matrix.id !== 1 || matrix.id !== 2 || matrix.id !==3 ? 0 :1,
                        borderBottomColor: '#949494',
                        paddingHorizontal: 5,
                        paddingVertical: 10,
                        borderTopWidth: 1,
                        borderTopColor: '#949494',
                    }}>
                    <TouchableOpacity disabled={matrix.isActive || matrix.canBuy ? false: true} onPress={()=>joinTarif(matrix.id)}
                        style={{
                            backgroundColor:matrix.isActive?  '#219653' : matrix.canBuy ? '#1563FF' :'#949494',
                            height: 46,
                            borderRadius: 9,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                color: '#fff',
                                fontWeight: '600',
                                fontSize: 17,
                            }}>
                            {matrix.isActive ? `${t('homescreen.buttons.active')} ${matrix.count}` : `${t('homescreen.buttons.join')}`}
                        </Text>
                    </TouchableOpacity>
                    {/*{matrix.isActive ?(*/}
                    {/*    <>*/}
                    {/*        <TouchableOpacity*/}
                    {/*            style={{*/}
                    {/*                backgroundColor: '#219653',*/}
                    {/*                height: 46,*/}
                    {/*                borderRadius: 9,*/}
                    {/*                alignItems: 'center',*/}
                    {/*                justifyContent: 'center',*/}
                    {/*            }}>*/}
                    {/*            <Text*/}
                    {/*                style={{*/}
                    {/*                    textAlign: 'center',*/}
                    {/*                    color: '#fff',*/}
                    {/*                    fontWeight: '600',*/}
                    {/*                    fontSize: 17,*/}
                    {/*                }}>*/}
                    {/*                {t('homescreen.buttons.active')} 0*/}
                    {/*            </Text>*/}
                    {/*        </TouchableOpacity>*/}
                    {/*    </>*/}
                    {/*):(*/}
                    {/*    <>*/}
                    {/*        <TouchableOpacity disabled={matrix.canBuy ? false: true} onPress={()=>{joinTarif(matrix.id)}}*/}
                    {/*                          style={{*/}
                    {/*                              backgroundColor: matrix.canBuy ? '#1563FF' :'#949494',*/}
                    {/*                              height: 46,*/}
                    {/*                              borderRadius: 9,*/}
                    {/*                              alignItems: 'center',*/}
                    {/*                              justifyContent: 'center',*/}
                    {/*                          }}>*/}
                    {/*            <Text*/}
                    {/*                style={{*/}
                    {/*                    textAlign: 'center',*/}
                    {/*                    color: '#fff',*/}
                    {/*                    fontWeight: '600',*/}
                    {/*                    fontSize: 17,*/}
                    {/*                }}>*/}
                    {/*                {t('homescreen.buttons.join')}*/}
                    {/*            </Text>*/}
                    {/*        </TouchableOpacity>*/}
                    {/*    </>*/}
                    {/*)}*/}
                    {/*{matrix.isActive ? (*/}
                    {/*    <TouchableOpacity onPress={()=>{joinTarif(matrix.id)}}*/}
                    {/*                      style={{*/}
                    {/*                          backgroundColor: '#219653',*/}
                    {/*                          height: 46,*/}
                    {/*                          borderRadius: 9,*/}
                    {/*                          alignItems: 'center',*/}
                    {/*                          justifyContent: 'center',*/}
                    {/*                      }}>*/}
                    {/*        <Text*/}
                    {/*            style={{*/}
                    {/*                textAlign: 'center',*/}
                    {/*                color: '#fff',*/}
                    {/*                fontWeight: '600',*/}
                    {/*                fontSize: 17,*/}
                    {/*            }}>*/}
                    {/*            {t('homescreen.buttons.join')}*/}
                    {/*        </Text>*/}
                    {/*    </TouchableOpacity>*/}
                    {/*):(*/}
                    {/*    <TouchableOpacity onPress={()=>{joinTarif(matrix.id)}}*/}
                    {/*                      style={{*/}
                    {/*                          backgroundColor: '#1563FF',*/}
                    {/*                          height: 46,*/}
                    {/*                          borderRadius: 9,*/}
                    {/*                          alignItems: 'center',*/}
                    {/*                          justifyContent: 'center',*/}
                    {/*                      }}>*/}
                    {/*        <Text*/}
                    {/*            style={{*/}
                    {/*                textAlign: 'center',*/}
                    {/*                color: '#fff',*/}
                    {/*                fontWeight: '600',*/}
                    {/*                fontSize: 17,*/}
                    {/*            }}>*/}
                    {/*            {t('homescreen.buttons.join')}*/}
                    {/*        </Text>*/}
                    {/*    </TouchableOpacity>*/}
                    {/*)}*/}
                </View>
            )}
        </>
    )
}
export default MatrixMap
