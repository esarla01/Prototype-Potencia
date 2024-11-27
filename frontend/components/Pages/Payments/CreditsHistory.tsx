import React, { useState, useContext, useEffect } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Stack, Flex, Box } from "@react-native-material/core";
import { AntDesign } from '@expo/vector-icons';
import AppContext from '../../AppContext';
import { SelectList } from 'react-native-dropdown-select-list';
import { backend_url } from '../../../constants';


export default function CreditsHistory(props: {
    navigation: {
        navigate: (arg0: string) => void;
        setOptions: (arg0: { headerShown: boolean }) => void;
    }
}) {

    const myContext = useContext(AppContext)
    const [transactions, setTransactions] = useState(myContext.user.transactions);
    React.useLayoutEffect(() => {
        props.navigation.setOptions({ headerShown: false });
    }, [props.navigation]);

    const [monthYearSelect, setMonthYearSelected] = useState("");

    const monthYear = [
        { key: '1', value: 'July 2021' },
        { key: '2', value: 'June 2021' },
        { key: '3', value: 'May 2021' },
    ]


    // CHECK: IS THIS THE MOST EFFICIENT SOLUTION?
    useEffect(() => {
        refreshAcct();
    }, [])

    // Width of Page: 375, Height: 81
    //Implement scrollview/flatlist
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
                setTransactions(user_transactions);

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


    return (
        <View>
            <View style={styles.container}>
                <Stack direction="column" m={4} spacing={4}>

                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity style={{ paddingTop: 96, paddingLeft: "10.39%" }} onPress={() => {props.navigation.navigate("Credits")}}>
                            <AntDesign name="left" size={24} color="black" weight="bold" />
                        </TouchableOpacity>
                        <Text style={styles.header}>Balance History</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.subheading}>This month</Text>
                        <SelectList boxStyles={styles.selectList}
                            setSelected={(val) => setMonthYearSelected(val)}
                            data={monthYear}
                            save="value"
                            inputStyles={styles.dropdownText}
                            dropdownTextStyles={styles.dropdownText}
                        />
                        {/* <Text style={styles.subheadingSpecial}>July             2021</Text> */}
                    </View>

                    {/* <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => refreshAcct()} style={styles.checkoutButton}>
                            <Text style={styles.checkoutText}>refresh history</Text>
                        </TouchableOpacity>
                    </View> */}

                    <ScrollView>
                    {transactions.slice(0).reverse().map((transaction, index) => (
                        <Box key={index}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ width: "70%" }}>
                                    <Text style={styles.activityTitle}>{transaction.description}</Text>
                                </View>
                                <View style={{ width: "14%" }}>
                                    <Text style={styles.activityPrice}>+${transaction.amount.toFixed(0)}</Text>
                                </View>
                            </View>
                            <Text style={styles.activityDate}>{transaction.date.toString()}</Text>
                        </Box>
                    ))}
                    </ScrollView>

                </Stack>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 10,
        right: 0,
        // width: "100%",
        // height: 56,
    },
    header: {
        paddingTop: "25%",
        fontWeight: "700",
        // fontSize: "24%",
        paddingLeft: "5%",
        paddingBottom: "5%",
    },

    subheading: {
        fontWeight: "400",
        paddingLeft: "10.39%",
        paddingTop: "5%",
        // fontSize: "20%",
        alignItems: "center",
        paddingRight: "5%",
    },

    subheadingSpecial: {
        fontWeight: "700",
        // fontSize: "20%",
        color: "#009E9E",
    },

    tutor: {
        fontWeight: "700",
        // fontSize: "14%",
        color: "#009E9E",
    },

    activityTitle: {
        fontWeight: "400",
        // fontSize: "14%",
        alignItems: "center",
        paddingLeft: "20%",
        paddingTop: "5%",
    },

    activityTitleBold: {
        fontWeight: "700",
        // fontSize: "14%",
        alignItems: "center",
        paddingLeft: "20%",
        paddingTop: "5%",
    },

    activityPrice: {
        fontWeight: "400",
        // fontSize: "20%",
        alignItems: "center",
        textAlign: "right",
        paddingTop: "20%",
        // paddingLeft: "10%",
    },

    activityPriceBold: {
        fontWeight: "700",
        // fontSize: "20%",
        alignItems: "center",
        textAlign: "right",
        paddingTop: "20%",
        // paddingLeft: "1%",
    },

    activityDate: {
        fontWeight: "400",
        // fontSize: "10%",
        color: "#6E7781",
        paddingLeft: "15%",
    },

    activityBox: {
        flexDirection: "row",
        alignItems: "center",
        // margin: 10,
        // padding: 20,
        // paddingRight: 15,
        // paddingLeft: 15,
        // textAlign: 'left',
        backgroundColor: '#FFFFFF',
        // borderRadius: "10%",
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },

    checkoutButton:
    {
        // borderRadius: "50%",
        backgroundColor: "#FEB300",
        width: "30%",
        height: "25%",
        justifyContent: 'center',
        alignSelf: 'center',
    },

    checkoutText: {
        // fontWeight: "800",
        // fontSize: "12%",
        textAlign: "center"
    },

    selectList: {
        borderRadius: 15,
        shadowOpacity: 0.1,
    },

    dropdownText: {
        color: "#009E9E",
        // fontSize: "20%",
        fontWeight: "bold",
        fontFamily: "Open Sans",
    },
});