import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Stack, Flex, Box, Button } from "@react-native-material/core";
import { SelectList } from 'react-native-dropdown-select-list';
import { AntDesign } from '@expo/vector-icons';
import { Link } from '@react-navigation/native';
import AppContext from '../../AppContext';
import { PromiseProvider } from "mongoose";
import { backend_url, payments_url } from '../../../constants';

export default function CreditsCheckout(
    { route, navigation }: 
        { route: { params: { price: number } }, 
          navigation:  { setOptions: (arg0: { headerShown: boolean; }) => void, 
                         navigate: (arg0: string) => void }
        }
    ){


    const myContext = useContext(AppContext)

    const creditsPrice = route.params.price;

    const [email, setEmail] = useState(myContext.user.email);
    const [cardSelect, setCardSelected] = useState("");

    const [itemDescription, setItemDescription] = useState("$" + creditsPrice + " bundle (" + creditsPrice / 10 + "-" + creditsPrice / 5 + " classes)");
    const [itemPrice, setItemPrice] = useState(creditsPrice);
    const [subtotal, setSubtotal] = useState(creditsPrice);




    React.useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    // Width of Page: 375, Height: 81

    const card = [
        { key: '1', value: 'VISA ending in 1234' },
        { key: '2', value: 'VISA ending in 5678' },
        { key: '3', value: 'MasterCard ending in 9012' },
    ]

    async function handleCheckout() {
        const user = myContext.user;
        console.log("User is", user.email);
        console.log("User's Credits is", user.credits);
        console.log("Subtotal is", subtotal);
        const body = { email: user.email, subtotal: subtotal };
        try {
            console.log(`${payments_url}/userpay}`)
            const response = await fetch(`${payments_url}/userpay`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            if (response.ok) {
                console.log("info sent");
                navigation.navigate("PaymentsWebPage");
            }
            else {
                console.log("Sending info to PaymentsWebPage failed");
            }
        } catch (err) {
            console.error("An error occurred while sending info:", err);
        }
    }

    return (
        <View style={styles.container}>
            <Stack direction="column" m={4} spacing={4} divider={false}>

                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity style={{ paddingTop: "41%", width: "15%" }} onPress={() => {navigation.navigate("Credits")}}>
                        <AntDesign name="left" size={24} color="black" weight="bold" />
                    </TouchableOpacity>
                    <Text style={styles.header}>Checkout</Text>
                </View>

                <View style={{ width: "32%" }}>
                    <Text style={styles.subheading}> Checkout </Text>
                </View>

                <Box>
                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        <View style={{ width: "70%" }}>
                            <Text style={styles.paymentDescription}>{itemDescription}</Text>
                        </View>
                        <View style={{ width: "30%" }}>
                            <Text style={styles.paymentText}>${itemPrice.toFixed(2)}</Text>
                        </View>
                    </View>
                </Box>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        width: '100%',
                        paddingTop: "3%",
                    }}
                >
                </View>

                <Box style={{ paddingBottom: '5%' }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        <View style={{ width: "70%" }}>
                            <Text style={styles.subtotal}>Subtotal:</Text>
                        </View>
                        <View style={{ width: "30%" }}>
                            <Text style={styles.subtotalText}>${subtotal.toFixed(2)}</Text>
                        </View>
                    </View>
                </Box>

                <SelectList boxStyles={styles.selectList}
                    setSelected={(val) => setCardSelected(val)}
                    data={card}
                    save="value"
                />

                <Link to={{ screen: '' }}
                    style={styles.editPayment}>
                    Edit payment method
                </Link>

                {/* <Button title="Checkout" color="#FEB300" style={{ border width: "50%"}} onPress={() => props.navigation.navigate('ConfirmPaymentPopup')} /> */}
                <Box>
                    <View style={{ alignItems: 'center' }}>
                        {/* <TouchableOpacity onPress={() => props.navigation.navigate('ConfirmPaymentPopup')} style={styles.checkoutButton}> */}
                        <TouchableOpacity onPress={() => handleCheckout()} style={styles.checkoutButton}>
                            <Text style={styles.checkoutText}>Checkout</Text>
                        </TouchableOpacity>
                    </View>
                </Box>
            </Stack>
        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: "10%",
        right: "10%",
        // width: "100%",
        // height: 56,
    },
    header: {
        paddingTop: "40%",
        fontWeight: "bold",
        // fontSize: "24%",
        // paddingLeft: "8%",
    },

    subheading: {
        fontWeight: "700",
        // paddingLeft: "25%",
        // fontSize: "20%",
    },

    paymentDescription: {
        fontWeight: "400",
        // fontSize: "14%",
        // paddingLeft: "5%",
        paddingTop: "5%",
    },

    subtotal: {
        fontWeight: "700",
        // fontSize: "16%",
        paddingTop: "5%",
        paddingBottom: "5%",
    },

    paymentText: {
        fontWeight: "400",
        // fontSize: "16%",
        alignItems: "center",
        textAlign: "right",
        paddingTop: "10%",
    },

    subtotalText: {
        fontWeight: "700",
        // fontSize: "16%",
        alignItems: "center",
        textAlign: "right",
        paddingTop: "10%",
    },

    selectList: {
        borderRadius: 15,
        shadowOpacity: 0.1,
    },

    editPayment: {
        textDecorationLine: "underline",
        alignItems: "center",
        textAlign: 'right',
        paddingTop: "5%",
        paddingBottom: "10%",
        // paddingRight: '10%'
    },

    checkoutButton:
    {
        // borderRadius: "50%",
        backgroundColor: "#FEB300",
        width: "65%",
        height: "43%",
        justifyContent: 'center',
        alignSelf: 'center',
    },

    checkoutText: {
        fontWeight: "800",
        // fontSize: "16%",
        textAlign: "center"
    }

});