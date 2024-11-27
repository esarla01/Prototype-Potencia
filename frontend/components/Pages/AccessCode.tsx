import React, { useState, useRef, useContext } from "react";
import { Link } from '@react-navigation/native';
import { Stack, Text, TextInput } from "@react-native-material/core";
import { View } from "react-native";
import { NativeSyntheticEvent, TextInputKeyPressEventData, StyleSheet } from "react-native";
import AppContext from '../AppContext';
import { backend_url } from "../../constants";

export default function AccessCode(props: { navigation: { navigate: (arg0: string) => void;}}) {

    const myContext = useContext(AppContext);

    const [code, setCode] = useState("");

    const [textVisible, setTextVisible] = useState(false);
    const handleCodeChange = (text: string) => {
      setCode(text);
      handleVerifyCode(text);
    }
    const handleVerifyCode = async (newCode: string) => {
      if (newCode.length != 5) {
        return;
      }
        console.log(backend_url + '/auth/get_accessCode')
        fetch(`${backend_url}/auth/get_accessCode`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({pin: newCode})
        }).then(response => {
          //console.log("error handling");
          return response.json()
        }).then(json_data => {
          if (json_data.success) {
            console.log ("Got back success: true");
            props.navigation.navigate("SignUpForm");
          } else {
            alert(json_data.message);
            setTextVisible(true);
          }
        }).catch(err => {
          console.log(err);
          alert(err);
        });
        // alert("Access code is verified!");
        
    }


    return (
      <View style={styles.body}>
        <Stack spacing={4} style={{ margin: 35 }}>
          <Text style={{ fontWeight: "bold", fontSize: 32 }}>Access Code</Text>
          <Text style={{ fontSize: 16 }}>Please enter the code provided by Potencia at the end of your diagnostic assessment.</Text>
          <Stack>
            
              
                <TextInput
                  onChangeText={(text) => handleCodeChange(text)}
                  maxLength={5}
                  style={{ margin: 5 }} />
              
          
          </Stack>
          <Text style={[textVisible ? styles.verification_visible : styles.verification_text]}>Please enter a correct access code</Text>
        </Stack>
      </View>
    );
}

const styles = StyleSheet.create({
  verification_text: {
    fontWeight: "bold", 
    fontSize: 16, 
    paddingTop: 21, 
    color: "white",
  }, 
  signup_text: {
    fontSize: 16,
    color: "white"
  }, 
  verification_visible: {
    fontWeight: "bold", 
    fontSize: 16, 
    padding: 8, 
    color: "#FFB400", 
  },
  signup_visble: {
    fontSize: 16,
    padding: 8,
    color: "black"
  }, 
  body: {
    backgroundColor: "white",
    paddingTop: "20%",
    paddingBottom: "5%",
    height: "100%",
    width: "100%",
  },
})
  