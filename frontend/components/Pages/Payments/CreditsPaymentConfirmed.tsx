import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, Stack,Flex, Box, Button } from "@react-native-material/core";
import { SelectList } from 'react-native-dropdown-select-list';
import { AntDesign } from '@expo/vector-icons';
import { Link } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';
import AppContext from '../../AppContext';
import { backend_url } from '../../../constants';

export default function CreditsCheckout(props: { navigation: { navigate: (arg0: string) => void; }}) {

    const myContext = useContext(AppContext)

    const [ payment, setPayment ] = useState(0);
    const [ currBalance, setCurrBalance ] = useState(0);

    useEffect(() => {
        refreshAcct();
    }, [])

    React.useLayoutEffect(() => {
        props.navigation.setOptions({ headerShown: false });
    }, [props.navigation]);

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

                setPayment(user_transactions[user_transactions.length - 1].amount)
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


    // Width of Page: 375, Height: 81

    
    return (
        <View>
        {/* <Stack direction="column" m={4} spacing={4} divider={false}> */}

            <View style={styles.icon}>
                <TouchableOpacity>
                    <Octicons  name="check-circle" size={56.67} color="#009E9E" />
                </TouchableOpacity>
            </View>

            <View>
                <Text style={styles.moneyText}>+${payment.toFixed(0)}</Text>
            </View>

            <View>
                <Text style={styles.balanceText}> Current Balance: ${currBalance.toFixed(0)} </Text>
            </View>

            <View> 
                <Image source={require('frontend/assets/images/PaymentConfirmed.png')} style={styles.image} />

            </View> 


            <View>
                <Text style={styles.receiptText}> Your receipt has been sent to your email. </Text>
            </View>

            <View style={styles.viewSButton}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Home')} style={styles.schedulingButton}>
                    <Text style = {styles.buttonText}>Start Scheduling</Text>
                </TouchableOpacity>
            
                <TouchableOpacity onPress={() => props.navigation.navigate('Credits')} style={styles.backButton}>
                    <Text style = {styles.buttonText}>Back to payment</Text>
                </TouchableOpacity>
            </View>

            {/* </Stack> */}
        </View>

    );

}

const styles = StyleSheet.create({

    icon: {
        alignItems: 'center',
        paddingTop: "40%",  
    },

    moneyText: {
        // position: 'absolute',
        paddingTop: "5%", 
        fontFamily: 'Poppins',
        fontWeight: "700",
        textAlign:"center", 
        fontSize: "36", 
        color: "#5ED18D",
    },

    balanceText: { 
        fontFamily: "Poppins", 
        // fontSize: "16%", 
        fontWeight: "700", 
        textAlign: 'center', 
        paddingTop: "5%", 
        paddingBottom: '5%'
    },

    image: {
        width: 210, 
        height: 158,
        alignSelf: 'center',
    },

    receiptText: {
        fontFamily: 'OpenSans', 
        // textAlign: 'center', 
        // fontSize: '16',
        marginLeft: '10%',
        marginRight: '10%',
    },

    viewSButton: {
        paddingTop: "10%"
    },

    schedulingButton:
    {
        // borderRadius: "50%",
        backgroundColor: "#FEB300",
        width: "75%",
        height: "19%",
        justifyContent: 'center',
        alignSelf: 'center',
    },

    backButton:
    {
        marginTop: 20,
        // borderRadius: "50%",
        backgroundColor: "#E1E6EC",
        width: "75%",
        height: "19%",
        justifyContent: 'center',
        alignSelf: 'center',
    },

    buttonText: {
        fontFamily: 'Poppins',
        fontWeight: "800",
        // fontSize: "16%",
        textAlign: "center",
        color: '#002250'
    }

});
