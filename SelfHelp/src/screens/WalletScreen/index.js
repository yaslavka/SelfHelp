import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  StyleSheet,
  TextInput,
  processColor,
  Modal,
  Alert,
  Pressable,
} from 'react-native';
import bg from '../../assets/background/image.png';
import {useDispatch} from 'react-redux';
import * as actions from '../../actions/app.actions';
import profile from '../../assets/profile/image.png';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const {width} = Dimensions.get('window');
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectDropdown from 'react-native-select-dropdown';
import QRCode from 'react-native-qrcode-svg';
import update from 'immutability-helper';
import _ from 'lodash';
import {CandleStickChart} from 'react-native-charts-wrapper';
import qr from './Images/image.png';
import cop from './Images/copy.png';
import {data} from './data';

function WalletScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [chart, setCart] = useState(true);
  const [exchange, setExchange] = useState(false);
  const [send, setSend] = useState(false);
  const [request, setRequest] = useState(false);
  const [state, setState] = useState(data);
  const dispatch = useDispatch();
  const value = 'fsd;lhtr6iotfvdbkl5rtO0fdssdgt5...';
  const onRefresh = async () => {
    try {
      setRefresh(true);
      dispatch(actions.userInfo());
    } finally {
      setRefresh(false);
    }
  };
  const countriesWithFlags = [
    {title: 'TRON', image: require('./Images/Canada.png')},
  ];

  const handleSelect = event => {
    let entry = event.nativeEvent;
    if (entry == null) {
      setState({...state, selectedEntry: null});
    } else {
      setState({...state, selectedEntry: JSON.stringify(entry)});
    }
  };
  useEffect(() => {
    setState(
      update(state, {
        xAxis: {
          $set: {
            drawLabels: true,
            drawGridLines: true,
            position: 'BOTTOM',
            yOffset: 5,

            limitLines: _.times(state.data.dataSets[0].values.length / 5, i => {
              return {
                limit: 5 * (i + 1) + 0.5,
                lineColor: processColor('darkgray'),
                lineWidth: 1,
                label: (i + 1).toString(),
              };
            }),
          },
        },
        yAxis: {
          $set: {
            left: {
              valueFormatter: '$ #',
              limitLines: [
                {
                  limit: 112.4,
                  lineColor: processColor('red'),
                  lineDashPhase: 2,
                  lineDashLengths: [10, 20],
                },
                {
                  limit: 89.47,
                  lineColor: processColor('red'),
                  lineDashPhase: 2,
                  lineDashLengths: [10, 20],
                },
              ],
            },
            right: {
              enabled: false,
            },
          },
        },
        zoomXValue: {
          $set: 99999,
        },
      }),
    );
  }, []);
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
            marginHorizontal: 25,
            marginBottom: 5,
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
        <View style={{paddingHorizontal: 25, marginBottom: 10}}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              paddingVertical: 25,
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 1,
                height: 2,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 4,
              paddingHorizontal: 15,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                display: 'flex',
                flexDirection: 'row',
              }}>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    setExchange(true);
                    setSend(false);
                    setRequest(false);
                    setCart(false);
                  }}>
                  <MaterialCommunityIcons
                    name={'sync-circle'}
                    size={60}
                    color={exchange ? '#1563FF' : '#4F4F4F'}
                  />
                </TouchableOpacity>
                <Text>Обмен</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    setExchange(false);
                    setSend(true);
                    setRequest(false);
                    setCart(false);
                  }}>
                  <MaterialCommunityIcons
                    name={'arrow-up-bold-box'}
                    size={60}
                    color={send ? '#1563FF' : '#4F4F4F'}
                  />
                </TouchableOpacity>
                <Text>Вывод</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    setExchange(false);
                    setSend(false);
                    setRequest(true);
                    setCart(false);
                  }}>
                  <MaterialCommunityIcons
                    name={'arrow-down-bold-box'}
                    size={60}
                    color={request ? '#1563FF' : '#4F4F4F'}
                  />
                </TouchableOpacity>
                <Text>Ввод</Text>
              </View>
            </View>
          </View>
        </View>
        {chart && (
          <View style={{paddingHorizontal: 25, flex: 1, marginBottom: 35}}>
            <CandleStickChart
              style={{flex: 1}}
              data={state.data}
              marker={state.marker}
              chartDescription={{text: 'CandleStick'}}
              legend={state.legend}
              xAxis={state.xAxis}
              yAxis={state.yAxis}
              maxVisibleValueCount={16}
              autoScaleMinMaxEnabled={true}
              // zoom={{scaleX: 2, scaleY: 1, xValue:  400000, yValue: 1}}
              zoom={{
                scaleX: 15.41,
                scaleY: 1,
                xValue: 40,
                yValue: 916,
                axisDependency: 'LEFT',
              }}
              onSelect={handleSelect}
              onChange={event => console.log(event.nativeEvent)}
            />
          </View>
        )}
        {exchange && (
          <View style={{paddingHorizontal: 25}}>
            <Text style={{color: '#000000', fontWeight: '700', fontSize: 22}}>
              The exchange rate:
            </Text>
            <Text style={{color: '#000000', fontWeight: '700', fontSize: 18}}>
              For 1 TRX
            </Text>
            <Text
              style={{
                color: '#000000',
                fontWeight: '400',
                fontSize: 18,
                marginBottom: 20,
              }}>
              $0,063818
            </Text>
            <Text
              style={{
                color: '#000000',
                fontWeight: '700',
                fontSize: 22,
                marginBottom: 5,
              }}>
              Give back:
            </Text>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 20,
              }}>
              <SelectDropdown
                data={countriesWithFlags}
                defaultValueByIndex={1}
                // defaultValue={{
                //   title: 'England',
                //   image: require('./Images/Canada.png'),
                // }}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                buttonStyle={{
                  width: 120,
                  height: 40,
                  backgroundColor: '#FFF',
                  borderWidth: 1,
                  borderRadius: 8,
                  borderColor: '#444',
                }}
                renderCustomizedButtonChild={(selectedItem, index) => {
                  return (
                    <View style={styles.dropdown3BtnChildStyle}>
                      {selectedItem ? (
                        <Image
                          source={selectedItem.image}
                          style={{width: 10, height: 10, resizeMode: 'cover'}}
                        />
                      ) : (
                        <Ionicons
                          name="ios-logo-usd"
                          color={'#444'}
                          size={10}
                        />
                      )}
                      <Text
                        style={{
                          color: '#444',
                          textAlign: 'center',
                          fontWeight: '400',
                          fontSize: 15,
                          marginHorizontal: 10,
                        }}>
                        {selectedItem ? selectedItem.title : 'Валюта'}
                      </Text>
                      <FontAwesome
                        name="chevron-down"
                        color={'#444'}
                        size={15}
                      />
                    </View>
                  );
                }}
                dropdownStyle={styles.dropdown3DropdownStyle}
                rowStyle={styles.dropdown3RowStyle}
                renderCustomizedRowChild={(item, index) => {
                  return (
                    <View style={styles.dropdown3RowChildStyle}>
                      <Image
                        source={item.image}
                        style={styles.dropdownRowImage}
                      />
                      <Text style={styles.dropdown3RowTxt}>{item.title}</Text>
                    </View>
                  );
                }}
              />
              <TextInput
                style={{
                  width: 165,
                  height: 40,
                  backgroundColor: '#F1F1F1',
                  borderRadius: 10,
                  outlineWidth: 0,
                  borderWidth: 0,
                  color: '#000000',
                  fontSize: 18,
                  fontWeight: '400',
                  paddingHorizontal: 20,
                }}
              />
            </View>
            <Text
              style={{
                color: '#000000',
                fontWeight: '600',
                fontSize: 22,
                marginBottom: 5,
              }}>
              Retrieved:
            </Text>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 20,
              }}>
              <SelectDropdown
                data={countriesWithFlags}
                defaultValueByIndex={1}
                // defaultValue={{
                //   title: 'England',
                //   image: require('./Images/Canada.png'),
                // }}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                buttonStyle={{
                  width: 120,
                  height: 40,
                  backgroundColor: '#FFF',
                  borderWidth: 1,
                  borderRadius: 8,
                  borderColor: '#444',
                }}
                renderCustomizedButtonChild={(selectedItem, index) => {
                  return (
                    <View style={styles.dropdown3BtnChildStyle}>
                      {selectedItem ? (
                        <Image
                          source={selectedItem.image}
                          style={{width: 10, height: 10, resizeMode: 'cover'}}
                        />
                      ) : (
                        <Ionicons
                          name="ios-logo-usd"
                          color={'#444'}
                          size={10}
                        />
                      )}
                      <Text
                        style={{
                          color: '#444',
                          textAlign: 'center',
                          fontWeight: '400',
                          fontSize: 15,
                          marginHorizontal: 10,
                        }}>
                        {selectedItem ? selectedItem.title : 'Валюта'}
                      </Text>
                      <FontAwesome
                        name="chevron-down"
                        color={'#444'}
                        size={15}
                      />
                    </View>
                  );
                }}
                dropdownStyle={styles.dropdown3DropdownStyle}
                rowStyle={styles.dropdown3RowStyle}
                renderCustomizedRowChild={(item, index) => {
                  return (
                    <View style={styles.dropdown3RowChildStyle}>
                      <Image
                        source={item.image}
                        style={styles.dropdownRowImage}
                      />
                      <Text style={styles.dropdown3RowTxt}>{item.title}</Text>
                    </View>
                  );
                }}
              />
              <TextInput
                style={{
                  width: 165,
                  height: 40,
                  backgroundColor: '#F1F1F1',
                  borderRadius: 10,
                  outlineWidth: 0,
                  borderWidth: 0,
                  color: '#000000',
                  fontSize: 18,
                  fontWeight: '400',
                  paddingHorizontal: 20,
                }}
              />
            </View>
            <Text style={{color: '#000000', fontWeight: '700', fontSize: 18}}>
              Transaction fee:
            </Text>
            <Text
              style={{
                color: '#000000',
                fontWeight: '400',
                fontSize: 18,
                marginBottom: 20,
              }}>
              0,00001 TRX
            </Text>
            <View style={{marginBottom: 35}}>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{
                  backgroundColor: '#1563FF',
                  paddingVertical: 20,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontSize: 17,
                    fontWeight: '700',
                  }}>
                  Обмен
                </Text>
              </TouchableOpacity>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: '#E3E3E3',
                      width: '100%',
                      borderTopStartRadius: 20,
                      borderTopEndRadius: 20,
                      paddingVertical: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        textAlign: 'center',
                      }}>
                      Application № 123456789876
                    </Text>
                  </View>
                  <Text style={styles.modalText}>
                    You requested to exchange TRX to USD You will be credited
                    40,7 USD to the Sberbank card indicated in this chat.
                    Transfer 1 TRX on a purse: #123456789 After receipt of funds
                    we will credit card.
                  </Text>
                  <View style={{marginBottom: 20}}>
                    <Text
                      style={{
                        color: '#000000',
                        fontWeight: '700',
                        fontSize: 22,
                        marginBottom: 10,
                      }}>
                      Сумма :
                    </Text>
                    <TextInput
                      style={{
                        width: 300,
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
                    />
                  </View>
                  <View style={{marginBottom: 20}}>
                    <TextInput
                      style={{
                        width: 300,
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
                    />
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}>
                      <Text style={styles.textStyle}>отмена</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}>
                      <Text style={styles.textStyle}>Ok</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        )}
        {send && (
          <View style={{paddingHorizontal: 25}}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 10,
              }}>
              <Text style={{color: '#000000', fontWeight: '700', fontSize: 22}}>
                Валюта:
              </Text>
              <View>
                <SelectDropdown
                  data={countriesWithFlags}
                  defaultValueByIndex={1}
                  // defaultValue={{
                  //   title: 'England',
                  //   image: require('./Images/Canada.png'),
                  // }}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                  }}
                  buttonStyle={styles.dropdown3BtnStyle}
                  renderCustomizedButtonChild={(selectedItem, index) => {
                    return (
                      <View style={styles.dropdown3BtnChildStyle}>
                        {selectedItem ? (
                          <Image
                            source={selectedItem.image}
                            style={styles.dropdown3BtnImage}
                          />
                        ) : (
                          <Ionicons
                            name="ios-logo-usd"
                            color={'#444'}
                            size={32}
                          />
                        )}
                        <Text style={styles.dropdown3BtnTxt}>
                          {selectedItem ? selectedItem.title : 'Валюта'}
                        </Text>
                        <FontAwesome
                          name="chevron-down"
                          color={'#444'}
                          size={15}
                        />
                      </View>
                    );
                  }}
                  dropdownStyle={styles.dropdown3DropdownStyle}
                  rowStyle={styles.dropdown3RowStyle}
                  renderCustomizedRowChild={(item, index) => {
                    return (
                      <View style={styles.dropdown3RowChildStyle}>
                        <Image
                          source={item.image}
                          style={styles.dropdownRowImage}
                        />
                        <Text style={styles.dropdown3RowTxt}>{item.title}</Text>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
            <View style={{marginBottom: 20}}>
              <Text
                style={{
                  color: '#000000',
                  fontWeight: '700',
                  fontSize: 22,
                  marginBottom: 10,
                }}>
                Адрес кошелька :
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
                }}
              />
            </View>
            <View style={{marginBottom: 20}}>
              <Text
                style={{
                  color: '#000000',
                  fontWeight: '700',
                  fontSize: 22,
                  marginBottom: 10,
                }}>
                Сумма :
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
                }}
              />
            </View>
            <Text
              style={{
                color: '#2C2C2C',
                fontWeight: '700',
                fontSize: 18,
                marginBottom: 10,
              }}>
              Сумма:
            </Text>
            <Text
              style={{
                color: '#000000',
                fontWeight: '400',
                fontSize: 18,
                marginBottom: 20,
              }}>
              0,00010 TRX
            </Text>
            <Text
              style={{
                color: '#2C2C2C',
                fontWeight: '700',
                fontSize: 18,
                marginBottom: 10,
              }}>
              Комисия за транзакцию:
            </Text>
            <Text
              style={{
                color: '#000000',
                fontWeight: '400',
                fontSize: 18,
                marginBottom: 20,
              }}>
              0,00001 TRX
            </Text>
            <Text
              style={{
                color: '#2C2C2C',
                fontWeight: '700',
                fontSize: 18,
                marginBottom: 10,
              }}>
              Итого:
            </Text>
            <Text
              style={{
                color: '#000000',
                fontWeight: '400',
                fontSize: 18,
                marginBottom: 20,
              }}>
              0,00011 TRX
            </Text>
            <View style={{marginBottom: 35}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#1563FF',
                  paddingVertical: 20,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontSize: 17,
                    fontWeight: '700',
                  }}>
                  Отправить
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {request && (
          <View style={{paddingHorizontal: 25}}>
            <View style={{marginBottom: 30}}>
              <Text
                style={{
                  color: '#000000',
                  fontWeight: '700',
                  fontSize: 22,
                  marginBottom: 10,
                }}>
                Ваш Адрес кошелька :
              </Text>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  display: 'flex',
                  flexDirection: 'row',
                  backgroundColor: '#F1F1F1',
                  borderRadius: 10,
                  paddingVertical: 20,
                  paddingHorizontal: 20,
                }}>
                <Text>{value}</Text>
                <TouchableOpacity>
                  <Image
                    source={cop}
                    style={{
                      width: 20,
                      height: 22,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
              <QRCode
                value={value}
                logo={qr}
                logoSize={30}
                size={150}
                logoBackgroundColor="transparent"
              />
            </View>
            <View style={{marginBottom: 20}}>
              <Text
                style={{
                  color: '#000000',
                  fontWeight: '700',
                  fontSize: 22,
                  marginBottom: 10,
                }}>
                Сумма :
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
                }}
              />
            </View>
            <View style={{marginBottom: 35}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#1563FF',
                  paddingVertical: 20,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontSize: 17,
                    fontWeight: '700',
                  }}>
                  Поделится Адресом
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    width,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
  },
  headerTitle: {color: '#000', fontWeight: 'bold', fontSize: 16},
  saveAreaViewContainer: {flex: 1, backgroundColor: '#FFF'},
  viewContainer: {flex: 1, width, backgroundColor: '#FFF'},
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '10%',
    paddingBottom: '20%',
  },

  dropdown1BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},

  dropdown2BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#444',
    borderRadius: 8,
  },
  dropdown2BtnTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#444',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dropdown2RowStyle: {backgroundColor: '#444', borderBottomColor: '#C5C5C5'},
  dropdown2RowTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  dropdown3BtnStyle: {
    height: 50,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#444',
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  dropdown3BtnImage: {width: 35, height: 35, resizeMode: 'cover'},
  dropdown3BtnTxt: {
    color: '#444',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 10,
  },
  dropdown3DropdownStyle: {backgroundColor: 'slategray'},
  dropdown3RowStyle: {
    backgroundColor: 'slategray',
    borderBottomColor: '#444',
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  dropdownRowImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdown3RowTxt: {
    color: '#F1F1F1',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },

  dropdown4BtnStyle: {
    width: '50%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown4BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown4DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown4RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown4RowTxtStyle: {color: '#444', textAlign: 'left'},
  centeredView: {
    flex: 1,

    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 30,
    alignItems: 'center',
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
    marginHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    elevation: 2,
    width: 140,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    paddingHorizontal: 15,
    justifyContent: 'flex-start',
    marginTop: 20,
  },
});
export default WalletScreen;
