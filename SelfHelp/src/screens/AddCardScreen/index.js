import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  TextInput,
  Modal,
  Alert,
  Pressable,
} from 'react-native';
import {useDispatch} from 'react-redux';
import * as actions from '../../actions/app.actions';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Svg, {Path} from 'react-native-svg';

const data = [
  {label: 'Master Card', value: '1'},
  {label: 'Visa', value: '2'},
];

function AddCard() {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [value1, setValue1] = useState(null);
  const [isFocus1, setIsFocus1] = useState(false);
  const [value2, setValue2] = useState(null);
  const [isFocus2, setIsFocus2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const onRefresh = async () => {
    try {
      setRefresh(true);
      dispatch(actions.userInfo());
    } finally {
      setRefresh(false);
    }
  };

  return (
    <>
      <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
        <ScrollView
          contentContainerStyle={{width: '100%', flexGrow: 1, height: 'auto'}}
          contentInsetAdjustmentBehavior="automatic"
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }>
          <View style={{paddingHorizontal: 25, paddingTop: 30}}>
            <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 10}}>
              Choose Card
            </Text>
            <Dropdown
              style={[styles.dropdown1, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select item' : ''}
              value={value1}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue1(item.value);
                setIsFocus1(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? 'blue' : 'black'}
                  name="Safety"
                  size={20}
                />
              )}
            />
            <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 10}}>
              Card Number
            </Text>
            <TextInput
              style={{
                width: '100%',
                paddingVertical: 15,
                backgroundColor: '#F1F1F1',
                borderRadius: 10,
                outlineWidth: 0,
                borderWidth: 0,
                color: '#000000',
                fontSize: 18,
                fontWeight: '400',
                paddingHorizontal: 20,
                marginBottom: 20,
              }}
              placeholder={'Card Number'}
            />
            <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 10}}>
              Expired Date
            </Text>
            <View
              style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Dropdown
                style={[styles.dropdown, isFocus1 && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus1 ? '03' : ''}
                searchPlaceholder="Search..."
                value={value2}
                onFocus={() => setIsFocus1(true)}
                onBlur={() => setIsFocus1(false)}
                onChange={item => {
                  setValue1(item.value);
                  setIsFocus1(false);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocus1 ? 'blue' : 'black'}
                    name="calendar"
                    size={20}
                  />
                )}
              />

              <Dropdown
                style={[styles.dropdown, isFocus2 && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus2 ? '2024' : ''}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus2(true)}
                onBlur={() => setIsFocus2(false)}
                onChange={item => {
                  setValue2(item.value);
                  setIsFocus2(false);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocus2 ? 'blue' : 'black'}
                    name="calendar"
                    size={20}
                  />
                )}
              />
            </View>
            <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 10}}>
              CVC
            </Text>
            <View
              style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginBottom: 100,
              }}>
              <TextInput
                style={{
                  width: '100%',
                  paddingVertical: 15,
                  backgroundColor: '#F1F1F1',
                  borderRadius: 10,
                  outlineWidth: 0,
                  borderWidth: 0,
                  color: '#000000',
                  fontSize: 18,
                  fontWeight: '400',
                  paddingHorizontal: 20,
                }}
                placeholder={'CVC'}
              />
              <View style={{position: 'absolute', paddingHorizontal: 5}}>
                <Svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12.5 19H11.5C11.224 19 11 18.776 11 18.5V17.5C11 17.224 11.224 17 11.5 17H12.5C12.776 17 13 17.224 13 17.5V18.5C13 18.776 12.776 19 12.5 19ZM15.07 11.25L14.17 12.17C13.45 12.9 13 13.5 13 15H11V14.5C11 13.4 11.45 12.4 12.17 11.67L13.41 10.41C13.867 9.966 14.095 9.308 13.963 8.607C13.828 7.89 13.275 7.28 12.574 7.081C11.468 6.767 10.437 7.4 10.108 8.353C9.98 8.724 9.668 9 9.275 9H8.984C8.403 9 7.997 8.436 8.159 7.878C8.588 6.406 9.84 5.285 11.384 5.047C12.908 4.812 14.353 5.596 15.257 6.846C16.437 8.478 16.089 10.231 15.07 11.25Z"
                    fill="#B5B5B5"
                  />
                </Svg>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: '#1563FF',
                paddingVertical: 15,
                paddingHorizontal: 27,
                backgroundColor: '#1563FF',
              }}>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 16,
                  fontWeight: '700',
                  textAlign: 'center',
                }}>
                Save Change
              </Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View style={{backgroundColor: 'rgba(32,35,42,0.59)', flex: 1}}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                      Your card will be Add Card, are you sure to continue?
                    </Text>
                    <View
                      style={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Pressable
                        style={[
                          styles.button,
                          styles.buttonClose,
                          {
                            backgroundColor: '#fff',
                            borderColor: '#1563FF',
                            borderWidth: 1,
                          },
                        ]}
                        onPress={() => {
                          setModalVisible(!modalVisible);
                        }}>
                        <Text style={[styles.textStyle, {color: '#1563FF'}]}>
                          No
                        </Text>
                      </Pressable>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                          setModalVisible(!modalVisible);
                        }}>
                        <Text style={styles.textStyle}>Add Card</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#F1F1F1',
    paddingHorizontal: 8,
    marginBottom: 20,
    width: '45%',
  },
  dropdown1: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 8,
    backgroundColor: '#F1F1F1',
    marginBottom: 20,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 43,
    paddingVertical: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default AddCard;
