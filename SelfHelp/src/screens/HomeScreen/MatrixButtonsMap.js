import React from "react";
import {Text, TouchableOpacity} from "react-native";
import {useTranslation} from "react-i18next";

function MatrixButtonsMap({joinTarif, matrix}) {
    const {t} = useTranslation('common');
    return(
        <>
            <TouchableOpacity onPress={()=>{joinTarif(matrix.id)}}
                              style={{
                                  backgroundColor: '#1563FF',
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
                    {t('homescreen.buttons.join')}
                </Text>
            </TouchableOpacity>
        </>
    )
}
export default MatrixButtonsMap
