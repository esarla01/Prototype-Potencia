import React, { useContext, useState } from 'react'
import { Text } from "@react-native-material/core";
import { View, ScrollView, Pressable, TextInput, Image, StyleSheet, TouchableOpacity } from "react-native";
import AppContext from '../AppContext';
import { backend_url } from '../../constants';

export default function SettingsPage(props: { navigation: { navigate: (arg0: string) => void;}
}) {

    const myContext = useContext(AppContext);

    const [email, onChangeEmail] = useState(myContext.user.email);
    const [emailEditing, setEmailEditing] = useState(false);
    const [number, onChangeNumber] = useState(myContext.user.phone);
    const [numEditing, setNumEditing] = useState(false);
    const [password, onChangePassword] = useState(myContext.user.password);
    const [isEditing, setIsEditing] = useState(false);
    
    // save updated email
    async function saveEmail() {
        const user = myContext.user;
        console.log("new email is ", email);
        console.log("old email is ", user.email);
        console.log("line 45");
        const email_lowercase = email.toLowerCase() || '';
        // const body = { email: "rihanna@gmail.com", new_email: email };
        const body = { email: user.email, new_email: email_lowercase };
        try {
            console.log("the body is: ", body);
            const response = await fetch(`${backend_url}/settings/update_email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            if (response.ok) {
                console.log("Email updated");
            }
            else {
                console.log("Email update failed");
            }
        } catch (err) {
            console.error("An error occurred while updating email:", err);
        }
        myContext.user.email = email_lowercase;

    }

    // save updated phone number
    async function savePhoneNumber() {
        const user = myContext.user;
        console.log("phone number is ", user.phone);
        const body = { phone: user.phone, new_phone: number };
        try {
            const response = await fetch(`${backend_url}/settings/update_phone`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            if (response.ok) {
                console.log("Phone number updated");
            }
            else {
                console.log("Phone update failed");
            }
        } catch (err) {
            console.error("An error occurred while updating phone:", err);
        }
        myContext.user.phone = number;
    }

    // save updated password
    async function savePassword() {
        const user = myContext.user;

        console.log("password is ", password);
        const body = { email: user.email, new_password: password };
        try {
            const response = await fetch(`${backend_url}settings/update_password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            if (response.ok) {
                console.log("Password updated");
            }
            else {
                console.log("Password update failed");
            }
        } catch (err) {
            console.error("An error occurred while updating password:", err);
        }
        myContext.user.password = password;
    }

    // async function saveFunction() {
    //     if (email != "") {
    //         saveEmail();
    //     }
    //     if (number != "") {
    //         savePhoneNumber();
    //     }
    //     if (password != "") {
    //         savePassword();
    //     }
    // }
    return (
        <View style={styles.body}>
        <ScrollView style={styles.space}>
            <View style={{ height: 1000 }}>
            <Text style={styles.heading}>Settings</Text>
            <View style={styles.account}>
                <Text style={{ fontWeight: "bold", margin: 5 }}>Account</Text>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        width: '114%',
                        marginLeft: '-7%',
                        marginBottom: 15
                    }}
                >
                </View>
                <Text>Email</Text>
                <View style={styles.inputRow}>
                    {emailEditing ? (
                        <TextInput
                            style={styles.textInput}
                            value={email}
                            onChangeText={email => onChangeEmail(email)} 
                            autoCapitalize='none'
                        />
                    ) : (
                        <Text style={styles.plainText}>{email}</Text>
                    )}
                    <Pressable 
                        style={styles.doneButton} 
                        onPress={() => {
                            setEmailEditing(!emailEditing);
                            console.log("emailEditing: ", emailEditing);
                            if (emailEditing) {
                                console.log("saving email");
                                saveEmail();
                            }
                        }}>
                        <Text style={styles.buttonText}>{emailEditing ? "Done" : "Edit"}</Text>
                    </Pressable>
                </View>

                <Text>Phone Number</Text> 
                <View style={styles.inputRow}>
                    {numEditing ? (
                        <TextInput
                        style={styles.textInput}
                            value={number}
                            onChangeText={number => onChangeNumber(number)}
                        />
                    ) : (
                        <Text style={styles.plainText}>{number}</Text>
                    )}
                    <Pressable 
                        style={styles.doneButton} 
                        onPress={() => {
                            setNumEditing(!numEditing);
                            console.log("numEditing: ", numEditing);
                            if (numEditing) {
                                console.log("saving number");
                                savePhoneNumber();
                            }
                        }}>
                        <Text style={styles.buttonText}>{numEditing ? "Done" : "Edit"}</Text>
                    </Pressable>

                </View>

                <Text>Password</Text>
                <View style={styles.inputRow}>
                    {isEditing ? (
                        <TextInput
                        style={styles.textInput}
                            value={password}
                            onChangeText={password => onChangePassword(password)}
                            autoCapitalize='none'
                        />
                    ) : (
                        <Text style={styles.plainText}>{password}</Text>
                    )}
                    {/* <Button
                        buttonStyle={styles.doneButton}
                        title={isEditing ? "Done" : "Edit"}
                        onPress={() => {
                            setIsEditing(!isEditing);
                            console.log("isEditing: ", isEditing);
                            if (isEditing) {
                                console.log("saving password");
                                savePassword();
                            }
                        }}
                    /> */}
                    <Pressable 
                        style={styles.doneButton} 
                        // title={isEditing ? "Done" : "Edit"}
                        onPress={() => {
                            setIsEditing(!isEditing);
                            console.log("isEditing: ", isEditing);
                            if (isEditing) {
                                console.log("saving password");
                                savePassword();
                            }
                        }}>
                        <Text style={styles.buttonText}>{isEditing ? "Done" : "Edit"}</Text>
                    </Pressable>
                </View>
            </View>

            <TouchableOpacity style={styles.navButton} onPress={() => props.navigation.replace('LanguagePage')}>
                <Text style={styles.buttonText2}>Language</Text>
                <Image style={styles.carrot} source={require('./images/carrot.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={() => props.navigation.replace('NotificationPage')}>
                <Text style={styles.buttonText2}>Notification</Text>
                <Image style={styles.carrot} source={require('./images/carrot.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={() => props.navigation.replace('TermPolicyPage')}>
                <Text style={styles.buttonText2}>Terms & Policies</Text>
                <Image style={styles.carrot} source={require('./images/carrot.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={() => props.navigation.replace('AboutPage')}>
                <Text style={styles.buttonText2}>About</Text>
                <Image style={styles.carrot} source={require('./images/carrot.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={{ margin: 20 }}>
                <Text style={{color: "#D83D3D", fontWeight: "700"}}>Log out</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

    // body: {
        // backgroundColor: "white",
    // },

    body: {
        backgroundColor: "white",
        alignItems: "center",
        // paddingLeft: "12%",
        // paddingRight: "12%",
        paddingTop: "20%",
        paddingBottom: "5%",
        height: "100%",
      },

    space: {
        marginHorizontal: 40,
        padding: 10,
        height: "100%",
    },


    heading: {
        fontFamily: 'Poppins-Bold.ttf',
        fontWeight: "700", // this isn't working, should be bolder
        fontSize: 32,
        marginLeft: 10,
    },
    account: {
        margin: 10,
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 3,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },

    inputRow: {
        display: "flex",
        flexDirection: "row",
    },

    doneButton: {
        fontFamily: 'OpenSans-Regular.ttf',
        fontSize: "17%",
        fontWeight: "700",
        backgroundColor: "#FFD776",
        width: 59,
        height: 25,
        justifyContent: "center",
        // alignContent: "center",
        borderRadius: 20,
        // justifySelf: "center",
        marginRight: 0,
        marginLeft: "auto"
    }, 

    buttonText: {
        alignSelf: "center",
        fontSize: 10,
    },

    textInput: {
        backgroundColor: "#EDF1F7", 
        padding: 10, 
        borderRadius: 1,
        height: 37,
        width: "70%",
    },

    plainText: {
        height: 37,
        padding: 10, 
        paddingLeft: 0,
    },

    navButton: {
        flexDirection: "row",
        alignItems: "center",
        margin: 10,
        padding: 20,
        paddingRight: 15,
        paddingLeft: 15,
        textAlign: 'left',
        backgroundColor: '#FFFFFF',
        borderRadius: 3,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },

    buttonText2: {
        justifySelf: "center",
        fontSize: 16,
        fontWeight: "700",
    },

    carrot: { 
        width: 6,
        height: 12,
        marginLeft: "auto",
    }

})
