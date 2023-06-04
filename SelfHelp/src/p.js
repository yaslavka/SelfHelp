import React, {useEffect, useState} from "react";
import PINCode from "@haskkor/react-native-pincode";
import {setAccessPinCode} from "./utils";
import {api} from "./api";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
function Pi() {
    const [pin, setPin]=useState('')
    const [pinSetup, setPinSetup]=useState('')
    const {t} = useTranslation('common');
    const userInfo = useSelector(state => state.app.user);
    useEffect(()=>{
       if (pinSetup !== ''){
           api.pinCodeSetup(pinSetup)
               .then(async () => {
                   await api
                       .getUserInfo()
                       .then(() => {})
                       .catch(() => {});
               })
               .catch(error => {console.log(error)})
       }else if (pin !== ''){
           api.pinCodeVeryfy(pin)
               .then(async response => {
                   await setAccessPinCode(response)
                   await api
                       .getUserInfo()
                       .then(() => {})
                       .catch(() => {});
               })
               .catch(error => {console.log(error)})
       }
    },[])

    const hours = 1;
    let now = new Date().getTime();
    useEffect(()=>{
        async function timer() {
            const setupTime = AsyncStorage.getItem('pinCode');
            if (setupTime == null) {
               await AsyncStorage.setItem('pinCode', now)
            } else {
                if(now-setupTime > hours*10*60*1000) {
                    await AsyncStorage.clear()
                    await  AsyncStorage.removeItem('pinCode', now);
                }
            }
        }
        timer()
    },[])

    return(
        <>
            {userInfo && (
                <>
                    {userInfo.pinCode === null ? (
                        <>
                            <PINCode status={'choose'} vibrationEnabled={true} alphabetCharsVisible={true}   endProcessFunction={(pinCode)=>{setPin(pinCode)}}/>
                        </>
                    ):(
                        <>
                            <PINCode status={'enter'} vibrationEnabled={true} alphabetCharsVisible={true}  endProcessFunction={(pinCode)=>{setPinSetup(pinCode)}}/>
                        </>
                    )}
                </>
            )}
        </>
    )
}
export default Pi
