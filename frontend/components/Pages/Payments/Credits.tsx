import React, { useState, useContext, useEffect } from "react";
import { View, Alert, Modal, StyleSheet, Text, TextInput, Pressable, TouchableOpacity } from 'react-native';
import { Link } from '@react-navigation/native';
import { Stack, Flex, Box } from "@react-native-material/core";
import { Table, Row, Rows } from "react-native-table-component";
import BottomNavBar from "../BottomNavBar";
import AppContext from '../../AppContext';
import { backend_url } from '../../../constants';

export default function Credits(props: {
    navigation: { navigate: (arg0: string, arg1?: object) => void; }
}) {

    const myContext = useContext(AppContext)
    const [modalError, setModalError] = useState(false);
    const [currBalance, setCurrBalance] = useState(0);
    const [activityTitle, setTitle] = useState("Group Session with Jake L.");
    const [activityDate, setDate] = useState("July 24, 2021 11:30 AM");
    const [activityPrice, setPrice] = useState("-$5");

    const [activityTitle2, setTitle2] = useState("Bought Credits");
    const [activityDate2, setDate2] = useState("July 24, 2021");
    const [activityPrice2, setPrice2] = useState("+$10");

    const [modalVisible, setModalVisible] = useState(false);
    const [addAmount, setAddAmount] = useState(0.00);

    const [customAmount, setCustomAmount] = useState("");

    function handleTextChange(text: string) {
        setCustomAmount(text);
    }

    React.useLayoutEffect(() => {
        props.navigation.setOptions({ headerShown: false });
    }, [props.navigation]);

    // CHECK: IS THIS THE MOST EFFICIENT WAY TO DO THIS?
    useEffect(() => {
        refreshAcct();
    }, [])
    
    async function refreshAcct() {
        //update global context transaction array to the db transaction arr
        // update user credits (global context) to db num credits
        const body = { email: myContext.user.email };

        try {
            const response = await fetch(`${backend_url}/refreshBalance`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            if (response.ok) {
                console.log("info sent");
                const { user_transactions, user_balance } = await response.json();

                setCurrBalance(user_balance)

                myContext.setUser({
                    ...myContext.user, balance: user_balance,
                    transactions: user_transactions
                });
            } else {
                console.log("Sending info to backend failed");
            }
        } catch (err) {
            console.error("An error occurred while refreshing:", err);
        }
    }
    // Width of Page: 375, Height: 816
    // TODO: Figure out how to make icons appear in nav bar
    //       Change the "add amount" box to a button that creates a pop-up

    return (
        <View>
            <Box style={styles.headerBox}>
                <Text style={styles.header}>My Balance</Text>
            </Box>
            <View style={{ paddingLeft: '13%', alignContent: 'center' }}>

                <View style={{ alignContent: "left" }}>
                    {/* <Stack direction="column" m={4} spacing={4} divider={false}> */}

                    {/* <View style={{   alignContent: 'left'}}> */}

                    {/* </View> */}

                    {/* <View>  */}
                    <View style={{ alignContent: 'left' }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: '10%' }}>
                            <Text style={styles.currentBalanceAmount}>${currBalance.toFixed(2)}</Text>
                            <Text style={styles.currentBalanceText}>Current {'\n'} Balance</Text>
                        </View>
                    </View>
                    {/* </View> */}

                    <View style={{ alignContent: 'left', paddingTop: '10%' }}>
                        <Text style={styles.subheading}>Buy More</Text>
                    </View>

                    <View style={{ alignContent: 'left' }}>
                        {/* paddingLeft: "10%" */}
                        <View style={{ flexDirection: "row", paddingTop: "3%", borderColor: '#FFFFF' }}>
                            <Text style={{ fontSize: "12%" }}><Text style={{ fontWeight: "700" }}>$5 </Text>for Group</Text>
                            <Text style={{ fontSize: "12%", paddingLeft: "3%" }}><Text style={{ fontWeight: "700" }}>$10 </Text>for One-on-One</Text>
                        </View>
                    </View>


                    <View style={{ alignContent: 'left' }}>
                        {/* paddingRight: "5.5%", paddingLeft: "5.5%", justifyContent: "space-around"  */}
                        <View style={{ flexDirection: "row", paddingTop: '4%' }}>
                            <Box style={styles.classOption}>
                                <TouchableOpacity onPress={() => props.navigation.navigate("CreditsCheckout", { price: 20 })}>
                                    <Text style={styles.classPrice}>$20</Text>
                                    <Text style={styles.classAmount}>2-4 classes</Text>
                                </TouchableOpacity>
                            </Box>

                            <Box style={{ paddingLeft: '5%' }}></Box>

                            <Box style={styles.classOption2}>
                                <TouchableOpacity onPress={() => props.navigation.navigate("CreditsCheckout", { price: 40 })}>
                                    <Text style={styles.classPrice}>$40</Text>
                                    <Text style={styles.classAmount}>4-8 classes</Text>
                                </TouchableOpacity>
                            </Box>
                        </View>
                    </View>

                    <View style={{ alignContent: 'left' }}>
                        {/* <View style={{  paddingTop: '10%'}}> */}
                        <TouchableOpacity
                            style={styles.buttonOpen}
                            onPress={() => setModalVisible(true)}>
                            <Text style={styles.textStyle}>Add Amount</Text>
                        </TouchableOpacity>
                        <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                                setModalVisible(!modalVisible);
                            }}>
                                {/* TODO HERE FIX THE BUTTON SO THAT THERE IS A DOUBLE BUTTON SIDE BY SIDE HERE */}
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <View style={{display:'flex', flexDirection:'row'}}>
                                    <Text style={styles.addAmountText}>
                                        Add Amount  
                                    </Text>
                                    </View>


                                    <View style={{
                                                
                                                paddingTop: '10%',
                                                paddingBottom: '15%',
                                                paddingLeft: '10%',display: 'flex', flexDirection: 'row'}}>
                                    <Text style={{
                                                textAlign: 'left',
                                                fontSize: 16,
                                                }}>
                                  $      </Text>
                                    <TextInput
                                            style={{
                                                textAlign: 'left',
                                                fontSize: 16,
                                            }}
                                            value={customAmount}
                                            onChangeText={handleTextChange}
                                            placeholder="10"
                                            keyboardType="numeric"
                                        />
                                        </View>
                                        

                                    </View>
                                    {modalError && (<Text style={styles.error}>Error: Please Input a Valid
                                                        Amount</Text>)}
                                    <TouchableOpacity style={styles.goBackButton} onPress={() => setModalVisible(false)}>                                    
                                      <Text style={styles.goBackText}>
                                            Go back
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonClose} onPress={() => {

                                        const checkoutAmount = parseInt(customAmount);

                                        if (isNaN(checkoutAmount) == true) {
                                            setModalError(true);
                                        } else {
                                            if (checkoutAmount > 1000 || checkoutAmount <= 0) {
                                                // throw error
                                                setModalError(true);
                                            } else {
                                                setModalError(false);
                                                setModalVisible(!modalVisible);
                                                props.navigation.navigate("CreditsCheckout", { price: checkoutAmount });
                                            }
                                        }
                                    }}>
                                            <Text style={styles.textStyle2}>Add</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                        </Modal>
                           
                        </View>
                    </View>


                    <View style={{ alignContent: 'left' }}>
                        <View style={styles.creditHistoryFormat}>
                            <Text style={styles.creditHistoryText}>Credit history</Text>
                            <Link to={{ screen: 'CreditsHistory' }} style={styles.creditHistoryLink}>View all</Link>
                        </View>
                    </View>

                    <View style={{ alignContent: 'left' }}>
                        <Text style={styles.creditHistorySubheading}>Recent activity</Text>
                    </View>

                    <View style={{ alignContent: 'left' }}>
                        {/*  justifyContent: "space-around"  */}
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.activityTitle}>{activityTitle}</Text>
                            {/* how to get tutor to be in blue: 
                            - create a separate state variable for the tutor, set the state to a name based on the type of activity that is happening*/}
                            {/*<Text> Group Session with <Text style={{ fontWeight: "bold", color: "#009E9E" }}>Jake L.</Text></Text> */}
                            <Text style={styles.activityPrice}>{activityPrice}</Text>
                        </View>
                        <Text style={styles.activityDate}>{activityDate}</Text>
                    </View>

                    <View style={{ alignContent: 'left' }}>
                        {/* justifyContent: "space-around"  */}
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.activityTitle2}>{activityTitle2}</Text>
                            <Text style={styles.activityPrice2}>{activityPrice2}</Text>
                        </View>
                        <Text style={styles.activityDate2}>{activityDate2}</Text>
                    </View>

                    {/* </Stack>
                    {/* <View style={{   position: "relative" }}> */}
                    {/* <BottomNavBar></BottomNavBar> */}
                    {/* </View> */}
                    {/* </Stack> */}
                </View>
            </View>

        </View>
    );
}

// const App = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   return (
//     <View style={styles.centeredView}>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           Alert.alert('Modal has been closed.');
//           setModalVisible(!modalVisible);
//         }}>
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalText}>Hello World!</Text>
//             <Pressable
//               style={[styles.button, styles.buttonClose]}
//               onPress={() => setModalVisible(!modalVisible)}>
//               <Text style={styles.textStyle}>Hide Modal</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//       <Pressable
//         style={[styles.button, styles.buttonOpen]}
//         onPress={() => setModalVisible(true)}>
//         <Text style={styles.textStyle}>Show Modal</Text>
//       </Pressable>
//     </View>
//   );
// };

const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        // justifyContent: 'center',
        paddingTop: '50%',
        alignItems: 'center',
        // borderColor: 'red',
        // borderWidth: 1
        backgroundColor: '#808080aa',
    },

    // button: {
    //     borderRadius: 1,
    //     padding: 10,
    //     elevation: 2,
    // },

    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: '100%',
        height: '35%',
        // borderColor: 'red',
        // borderWidth: 1
    },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 4,
    //     elevation: 5,
    //   },

    buttonOpen: {
        // alignItems: 'left',
        // paddingLeft: '5%',
        marginTop: "3%",
        backgroundColor: '#009E9E',
        // borderRadius: "5%",
        width: '85%',
        paddingBottom: '5%',
        // height: "40%",
        // borderColor: 'red',
        // borderWidth: 1
    },


    buttonClose: {
        backgroundColor: '#FFB400',
        // borderRadius: "5%",
        width: '100%',
        height: "35%",
        // borderColor: 'red',
        // borderWidth: 1
    },

    goBackButton: {
        backgroundColor: "#E1E6EC",
        width: "100%",
        height: "35%",
    },

    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        // fontSize: '14',
        // textAlign: 'center',
        // textAlign: 'left',
        paddingLeft: '6%',
        paddingTop: '6%'
    },

    textStyle2: {
        color: 'black',
        // fontSize: '20%',
        fontWeight: '800',
        textAlign: 'center',
        // paddingLeft: '5%',
        paddingTop: '4%'
    },

    addAmountText: {
        textAlign: 'center',
        // fontSize: '16%',
        fontWeight: 'bold',
        width: "60%",
        alignSelf: "center",
        // paddingTop: '10%',
        // paddingBottom: '15%',
        // paddingLeft: '10%'
    },

    goBackText: {
        textAlign: 'center',
        // fontSize: '20%',
        fontWeight: '800',
        width: "60%",
        alignSelf: "center",
        padding: "5%",
        // paddingTop: '10%',
        // paddingBottom: '15%',
        // paddingLeft: '10%'
    },

    header: {
        fontFamily: "Poppins",
        fontWeight: "800",
        // fontSize: "32%",
        paddingTop: "30%",
        paddingLeft: "13%",
        // borderColor: 'red',
        // borderWidth: 1
    },

    headerBox: {
        backgroundColor: '#FFB400',
        height: "25%",
        width: "100%",
        alignSelf: "center",
        // top: "-1%",
        // borderColor: 'red',
        // borderWidth: 1
    },

    currentBalanceAmount: {
        fontWeight: "bold",
        // fontSize: "48%",
        color: "#009E9E",
        // paddingTop: "5%",
        // paddingLeft: "10%",
        // paddingBottom: "5%",
        // borderColor: 'red',
        // borderWidth: 1
    },

    currentBalanceText: {
        // fontSize: "16%",
        fontWeight: "700",
        color: "#008080",
        paddingTop: "3%",
        paddingRight: "26%",
        // paddingBottom: "5%",
        textAlign: "center",
    },

    subheading: {
        // fontSize: "16",
        fontWeight: "700",
        // paddingLeft: "12%",
        paddingTop: "5%",
    },

    classOption: {
        backgroundColor: "#009E9E",
        // borderRadius: "5%",
        height: "100%",
        width: "40%",
        paddingBottom: "5%",
        shadowOpacity: 0.1,
    },

    classOption2: {
        backgroundColor: "#009E9E",
        // borderRadius: "5%",
        height: "100%",
        width: "40%",
        shadowOpacity: 0.1,
    },


    classPrice: {
        color: 'white',
        fontWeight: "700",
        // fontSize: "30%",
        paddingLeft: "10%",
        paddingTop: "10%",
    },

    classAmount: {
        color: "#BBC3CD",
        // fontSize: "12%",
        paddingLeft: "10%",
    },

    creditHistoryFormat: {
        flexDirection: "row",
        // justifyContent: "space-around",
        alignItems: "center",
        // paddingRight: "5%",
        // paddingLeft: "5%",
        paddingTop: "10%",
    },

    creditHistoryText: {
        fontWeight: "700",
        // fontSize: "25%",
    },

    creditHistoryLink: {
        fontWeight: "700",
        // fontSize: "18%",
        color: "#009E9E",
        textDecorationLine: "underline",
        paddingLeft: "18%"
    },

    creditHistorySubheading: {
        paddingTop: "5%",
        fontWeight: "700",
        // fontSize: "14%",
        // paddingLeft: "12%",
    },

    activityTitle: {
        paddingTop: "5%",
        // fontWeight: "700",
        // fontSize: "14%",
        // paddingLeft: "5%",
    },

    activityPrice: {
        paddingTop: "5%",
        fontWeight: "400",
        // fontSize: "20%",
        textAlignVertical: 'center',
        paddingLeft: "23%",
    },

    activityDate: {
        borderBottomColor: "#6E7781",
        fontWeight: "400",
        // fontSize: "10%",
        color: "#6E7781",
        // paddingLeft: "12%",
    },

    activityTitle2: {
        paddingTop: "5%",
        // fontWeight: "700",
        // fontSize: "14%",
        // paddingLeft: "0%",
    },

    activityPrice2: {
        paddingTop: "5%",
        fontWeight: "700",
        // fontSize: "20%",
        paddingLeft: "41%",
    },

    activityDate2: {
        borderBottomColor: "#6E7781",
        fontWeight: "400",
        // fontSize: "10%",
        color: "#6E7781",
        // paddingLeft: "12%",
    },

    error: {
        fontWeight: "600",
        // fontSize: "20%",
        color: "red",
        textAlign: "center",
    },

});

