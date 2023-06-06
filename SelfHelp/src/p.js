import React, {useEffect, useState} from "react";
import PINCode from "@haskkor/react-native-pincode";
import {getAccessPinCode, setAccessPinCode} from "./utils";
import {api} from "./api";
//import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actions from "./actions/auth.actions";
function Pi() {
    const dispatch = useDispatch();
    //const [pinSetup, setPinSetup]=useState('')
    //const {t} = useTranslation('common');
    const userInfo = useSelector(state => state.app.user);


    function pinSetup (pinCode){
        api.pinCodeSetup({pin:pinCode})
            .then(async (response) => {
                await api
                    .getUserInfo()
                    .then(() => {})
                    .catch(() => {});
            })
            .catch(error => {console.log(error)})
    }

    function pinVery(pinCode){
       console.log(pinCode)
        api.pinCodeVeryfy({pin:pinCode})
            .then(async response => {
                dispatch(actions.pinCodeVeryfySuccess());
                //console.log(response)
                await setAccessPinCode(response);
                await api
                    .getUserInfo()
                    .then(() => {})
                    .catch(() => {});
            })
            .catch(error => {console.log(error)})
    }


    return(
        <>
            {userInfo && (
                <>
                    {userInfo.pinCode === null ? (
                        <>
                            <PINCode status={'choose'} vibrationEnabled={true} alphabetCharsVisible={true} timePinLockedAsyncStorageName={'pinCode'}  finishProcess={(pinCode)=>{pinSetup(pinCode)}}/>
                        </>
                    ):(
                        <>
                            <PINCode status={'enter'} vibrationEnabled={true} alphabetCharsVisible={true} timePinLockedAsyncStorageName={'pinCode'} finishProcess={(pinCode)=>{pinVery(pinCode)}}/>
                        </>
                    )}
                </>
            )}
        </>
    )
}
export default Pi
