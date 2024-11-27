//register page input boxes
//register.tsx and SignUpForm.tsx are the same
import * as React from "react";
// import { Stack, Text, TextInput, Button } from "@react-native-material/core";
import { View, ScrollView, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
// import { RadioButton } from 'react-native-paper';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import Checkbox from 'expo-checkbox';
import { useState, useContext } from 'react';
import AppContext from '../AppContext';

export default function SignUpForm(props: {
  navigation: { navigate: (arg0: string) => void; }
}) {

  const myContext = useContext(AppContext)

  const [radioButtons, setRadioButtons] = useState<RadioButtonProps[]>([
      {
          id: '1', // acts as primary key, should be unique and non-empty string
          label: 'Learner',
          value: 'Learner',
          color: '#6E7781', 
          size: 20
      },
      {
          id: '2',
          label: 'Tutor',
          value: 'Tutor',
          color: '#6E7781', 
          size: 20,
      }
  ]);

  function onPressRadioButton(radioButtonsArray: RadioButtonProps[]) {
      setRadioButtons(radioButtonsArray);
  }

  const [checked, setChecked] = useState('unchecked');
  // const [checked, setChecked] = useState(false);
  const [policiesChecked, setPoliciesChecked] = useState(false);
  const [isChecked, setCheckbox] = useState(true);
  let selectedRadio = 'unchecked';

  // state variables to get user's email, password, phone number
  // const [name, setName] = useState(myContext.user.userName);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  async function setUser() {
    
    if(radioButtons[0].selected == true) {
      selectedRadio = "student"
    } else if (radioButtons[1].selected == true) {
      selectedRadio = "tutor"
    }

    // if any of the fields are empty, then send an alert
    if (email == "" || phone == "" || password == "" || confirmPassword == "" || firstName == "" || lastName == "" || selectedRadio == 'unchecked' || policiesChecked == false) {
      alert("Please fill out all form fields");
      return;
    }

    if (password != confirmPassword) {
      alert("Please make sure your passwords are matching");
      return;
    }

    myContext.setUser({
      ...myContext.user, userType: selectedRadio,
      userName: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      phone: phone,
      email: email,
    });

    if (selectedRadio == "student") {
      props.navigation.navigate('Welcome');
    } else if (selectedRadio == "tutor") {
      props.navigation.navigate("WelcomeTutor");
    }
  }

  // TODO: Get rid of periods at the end of each field
  return (
    <View style={styles.body}>
      <Text style={styles.heading}>Sign Up</Text>
      <ScrollView style={styles.scroll}>
        <View style={styles.innerScroll}>
          
          <Text style={styles.label}>First Name</Text>
          <TextInput style={styles.inputBar}
            onChangeText={firstName => setFirstName(firstName.trim())}
            autoComplete='off'
            autoCorrect={false}
          />
          <Text style={styles.label}>Last Name</Text>
          <TextInput style={styles.inputBar} 
            onChangeText={lastName => setLastName(lastName.trim())}
            autoComplete='off'
            autoCorrect={false}
          />
          <Text style={styles.label} >Email</Text>
          <TextInput style={styles.inputBar}
            onChangeText={email => setEmail(email.trim())}
            autoCapitalize='none'
            autoComplete='off'
            autoCorrect={false}
          />
          <Text style={styles.label} >Phone Number</Text>
          <TextInput style={styles.inputBar}
            onChangeText={phoneNumber => setPhone(phoneNumber.trim())}
            autoCapitalize='none'
            autoComplete='off'
            autoCorrect={false}
          />
          <Text style={styles.label} >Password</Text>
          <TextInput style={styles.inputBar}
            onChangeText={password => setPassword(password)}
            autoCapitalize='none'
            autoComplete='off'
            autoCorrect={false}
            secureTextEntry={true}
          />
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput style={styles.inputBar}
            onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
            autoCapitalize='none'
            autoComplete='off'
            autoCorrect={false}
            secureTextEntry={true}
          />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 15, marginTop: 15, color: "#6E7781" }}>Role</Text>
            <View style={{paddingTop: 15, paddingLeft: 35, paddingRight: 3}}>
            <RadioGroup 
                radioButtons={radioButtons} 
                onPress={onPressRadioButton} 
                layout="row"
            />
            </View>
            
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", margin: 5, marginTop: 23 }}>
            <Checkbox
              style={styles.checkbox}
              value={policiesChecked}
              onValueChange={setPoliciesChecked}
              color={policiesChecked ? '#52D26F' : '#000000'}
            />
            <Text style={styles.agreement}>
              I agree to the
              <TouchableOpacity onPress={() => {
                props.navigation.navigate('TermsPoliciesOnSignUp')
              }}>
                <Text style={styles.termsPolicies}> Terms of Use and Privacy Policy</Text>
              </TouchableOpacity>
            </Text>
          </View>

          <TouchableOpacity
            style={{ marginTop: 28, backgroundColor: "#FEB300", padding: 10, borderRadius: 50, height: 64, justifyContent: "center" }}
            onPress={() => setUser()}>
           <Text style={{ color: "black", fontWeight: "bold", fontSize: 16, textAlign: "center" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({

  scroll: {
    height: "60%",
    width: "100%",
    paddingTop: "3%",
    paddingLeft: "10%",
    paddingRight: "10%",
  },

  innerScroll: {
    height: 1300,
  },

  body: {
    backgroundColor: "white",
    paddingTop: "20%",
    paddingBottom: "5%",
    height: "100%",
    width: "100%",
  },
  
  inputBar: {
    height: 48,
    width: "100%",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 15,
    marginRight: 0,
    marginTop: 8,
    fontSize: 16,
    fontFamily: 'OpenSans-Regular.ttf',
    backgroundColor: "#EDF1F6"
  },

  label: {
    marginTop: 15,
    fontSize: 12, 
    color: "#6E7781"
  },

  heading: {
    fontWeight: "bold", 
    fontSize: 24, 
    marginTop: "5%",
    paddingLeft: "10%",
    paddingRight: "10%",
  }, 

  agreement: {
    fontSize: 14,
    color: "#8C8C8C",
    lineHeight: 20,
  },

  termsPolicies: {
    color: "#8C8C8C",
    textDecorationLine: 'underline',
    fontWeight: "bold",
    paddingBottom: 0,
    paddingTop: 5,
  }, 

  checkbox: {
    borderWidth: 1,
    color: "#8C8C8C",
    marginRight: 3,
    width: 18,
    height: 18
  },

  radio: {
    width: 5, 
    height: 5,
    backgroundColor: "#EDF1F6",
    borderRadius: 40
  }

})


