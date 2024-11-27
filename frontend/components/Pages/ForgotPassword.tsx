import React, { useState, useContext, useEffect } from "react";
import { Stack, Text } from "@react-native-material/core";
import { View, StyleSheet, TextInput, Pressable, Image, TouchableOpacity } from "react-native";
import AppContext from '../AppContext';
import 'react-native-get-random-values';
import { backend_url } from '../../constants';
// import * as React from 'react';
// import { Email } from './email';
// import { Html } from '@react-email/html';

const sendEmail = async (apiKey, url, to, from, subject, body) => {
    const payload = {
      personalizations: [
        {
          to: [
            {
              email: to, 
            },
          ],
          subject: subject,
        },
      ],
      from: {
        email: from,
      },
      content: [
        {
          type: 'text/plain',
          value: body,
        },
      ],
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        console.log('Failed to send email');
      } else {
        console.log('Email sent successfully');
      }
    } catch (error) {
      console.log('Error sending email', error);
    }
  };
  

export default function ForgotPassword(props: { navigation: { navigate: (arg0: string) => void; }
}) {

    const myContext = useContext(AppContext)
    const [user_email, setEmail] = useState('');
    const [textBoxBorderFocused, setTextBoxBorderFocused] = useState(false);
    const [isTextVisible, setIsTextVisible] = useState(false);

    const setBorderFocused = () => setTextBoxBorderFocused(true);
    const setBorderUnfocused = () => setTextBoxBorderFocused(false);
    
    const setTextVisible = () => setIsTextVisible(true);
    const setTextInvisible = () => setIsTextVisible(false);
    
    // generate random temporary password for user. 
    // IMPORTANT SIDE EFFECT: overwrites user password with new tmp password. 

    // TODO: make it actually temporary; can do this with timeout or by creating
    //       a field for a temporary password in the User schema
    function generateNewTempPassword () {
        const length = 20
        const chars = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let password = ''
        // const wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
        //
        try {
            const array = new Uint32Array(chars.length);
            crypto.getRandomValues(array);
            
            for (let i = 0; i < length; i++) {
              password += chars[array[i] % chars.length];
            }
            
            
            console.log(`Password is ${password}`);
            return password; // overwrite user password with new tmp password: 
        } catch(err) {
            console.log(err);
        }
    }
    
    // send user an email with a temporary password; update their password to
    // temp password in the database
    async function handleEmail() {
        console.log("email: ", user_email)
        setEmail('');
        const to = user_email;
        const new_password = generateNewTempPassword(); 

        //sendEmail parameters: apiKey, url, to, from, subject, body
        await sendEmail('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',
        'https://api.sendgrid.com/v3/mail/send', 
        user_email,
        'potencia.donotreply@gmail.com',
        'Potencia Temporary Password',
        "Here is your temporary password. Do not share this with \
        ANYONE. After logging in with the temporary password, \
        navigate to the \"Settings\" page to make a new \
        permanent password. \n Temporary password: " + new_password);

         // Ok, done. TODO: test. 

        // TODO validate email to be proper format + don't send email if not in database
        // send password reset email to inputted email address, regardless of
        // whether it is associated with a Potencia account or not
        /*if (user_email != "") {
            const transporter = nodemailer.createTransport({
                host: 'smtp.sendgrid.net', //replace with correct host
                port: 465,
                secure: true,
                auth : {
                    user: "apikey", //SMTP credentials?
                    pass: "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",
                }
                
                //TODO fix this
                const emailHtml = render(<Email url="https://example.com"/>);
            
            // email header
            const options = {
                from: 'potenciaDoNotReply@gmail.com', //replace with correct email once set up
                to: user_email, //send to email inputted by user, regardless of whether it is valid or not
                subject: 'Potencia: Temporary Password',
                html: emailHtml, //content of email
            };
            
            transporter.sendMail(options);
            })*/
            // email(to, {
            //     subject: 'Password Reset',
            //     body: "Here is your temporary password. Do not share this with \
            //            ANYONE. After logging in with the temporary password, \
            //            navigate to the \"Change Password \" page to make a new \
            //            permanent password. \n Temporary password: " + new_password,
            //     checkCanOpen: false // Call Linking.canOpenURL prior to Linking.openURL
            // }).catch(console.error)
        //}

        const user = myContext.user;

        // console.log("new (unhashed) password is: ", new_password);
        const body = { email: user_email, new_password: new_password };
        try {
            const response = await fetch(`${backend_url}/settings/update_temp_password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            console.log("posted data")
            if (response.ok) {
                console.log("Password updated successfully");
            }
            else {
                console.log("Password update failed");
            }
        } catch (err) {
            console.error("An error occurred while updating password:", err);
        }
        myContext.user.tempPassword = new_password;
    }
// }

    // save updated password
    /*async function savePassword() {
        const user = myContext.user;

        console.log("password is ", password);
        const body = { email: user.email, new_password: password };
        try {
            const response = await fetch("http://localhost:8000/settings/update_password", {
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
    }*/
    useEffect(() => {
        // Set the text visibility to false when the component is mounted or updated
        setTextInvisible();
    }, []);
    

    return (
        <View style={styles.background}>
            <View style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'left',
                marginLeft: "10%"
            }}>
                <View style={styles.wrapper}>
                            {/* todo: can this be 'Recover Password'? ask Fa. */}
                    <View style={{flexDirection: 'row'}}>
                        <Pressable style={{ marginLeft: 10, marginRight: 15 }} onPress={() => props.navigation.navigate('TextBoxesLogin')} >
                            <Image style={styles.carrot} source={require('./images/back.png')} />
                        </Pressable>
                        <Text style={styles.heading}>Forgot Password?</Text>
                    </View>
                    {/* <Stack fill center spacing={4}>
                        <View style={{ flexDirection: "row"}}>
                            <AntDesign style={{ paddingTop: "20%" }} name="left" size={24} color="black" weight="bold" />
                            <Text style={styles.text}>Forgot Password?</Text>
                        </View>
                    </Stack> */}
                    <Text style={{ fontSize: 13, paddingTop: "8%" }}>Please fill in the email associated with your Potencia account.</Text>
                    {/* <Text style={{ marginLeft: 48, fontSize: 12, color: "#6e7781", paddingTop: 14 }}>Email </Text> */}
                    <Text style={styles.email}>Email</Text>
                    <TextInput
                        value={user_email}
                        style={[
                        styles.input,
                        textBoxBorderFocused ? styles.focused : styles.unfocused,
                        ]}
                        onFocus={setBorderFocused}
                        onBlur={setBorderUnfocused}
                        type="text"
                        placeholder="janedoe@gmail.com"
                        placeholderTextColor={"#C4C4C4"}
                        onChangeText={user_email => setEmail(user_email)}
                        clearTextOnFocus={false}
                        returnKeyType="done"
                        autoCapitalize='none'
                    />
                </View>
            
            <Stack style={styles.button}>
            <TouchableOpacity
                style={{
                    backgroundColor: '#FEB300',
                    borderRadius: 50,
                    width: 120, 
                    height: 39,
                    justifyContent: "center",
                    alignItems: "center"
                }}
                onPress={() => {handleEmail(); setTextVisible()}}
            >
                <Text style={{ color: 'black', textAlign: "center", textAlignVertical: "center", fontFamily: 'Poppins-Bold.ttf'}}>Send</Text>
            {/* <Text style={ color: 'black', textAlign: "center", textAlignVertical: "center"}Send</Text> */}
            </TouchableOpacity>
            </Stack>
            {isTextVisible && <Text style={styles.confirm}>
            We have sent you an email with a temporary password. Please check your inbox and log in with the password provided.</Text>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "white", 
        height: "100%",
    },

    text: {
        paddingTop: "50%", 
        fontWeight: "bold", 
        fontSize: 24, 
        paddingLeft: 26
    },

    email: {
        color: "#6E7781",
        fontWeight: "400",
        fontFamily: 'OpenSans-Regular.ttf',
        // fontSize: "13%",
        paddingTop: "7%",
        
    },

    carrot: {
        width: 20, 
        height: 20,
        marginTop: "35%",
        // marginLeft: "0%",
    },

    heading: {
        fontFamily: 'Poppins-Bold.ttf',
        color: "#000000",
        fontWeight: "700",
        // fontSize: "25%",
        width: "100%",
    },

    confirm: {
        paddingTop: 20,
        marginRight: "10%",
        // fontSize: "14%",
        color: "#00ABAC",
        fontFamily: 'OpenSans-Regular.ttf',
        fontWeight: "600",
    },

    wrapper: {
        width: "90%",
        marginTop: "30%"
    },

    button: {
        // marginLeft: "10%", 
        // marginRight: 215, 
        width: "20%",
        paddingTop: 20
    },

    input: {
        height: 48,
        width: "80%",
        backgroundColor: "#EDF1F7",
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        marginTop: "5%",
        // alignSelf: "center",
        // marginLeft: "10%",
        fontSize: 16,
        fontFamily: 'OpenSans-Regular.ttf',
        borderWidth: 2,
    },

    focused: {
        borderColor: '#FFB400',
    },

    unfocused: {
        borderColor: 'transparent',
    },
})
