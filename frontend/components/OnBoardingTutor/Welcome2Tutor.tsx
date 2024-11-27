import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, Pressable, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppContext from "../AppContext";

const Welcome2TutorPage = (props: { navigation: { navigate: (arg0: string) => void; }, user: {
  userType: string,
  userName: string,
  firstName: string,
  lastName: string,
  password: string,
  tempPassword: string,
  tempPassword: string,
  location: string,
  interests: string[],
  englishLevel: string,
  reminders: boolean, 
  achievements: string, 
  university: string,
  tutorInfo: string[],
  languages: string[],
  phone: string,
  email: string,
  monthlyHours: number,
  totalHours: number,
}
}) => {

  const myContext = useContext(AppContext)

  return (
   <View style={styles.body}> 
      <Text style={styles.heading}>Welcome to Potencia, {myContext.user.firstName}!</Text>
      <Image style={styles.img} source={require('../OnBoarding/img/notetaking.png')}/>
      <Text style={styles.words}>You can start managing your tutoring sessions with Potencia online!</Text>
      <Pressable style={styles.button} onPress={() => props.navigation.navigate("MainPagesTutor")} >
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    height: '100%',
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: "20%",
    paddingBottom: "5%",
    paddingLeft: "12%",
    paddingRight: "12%"
  },
  
  heading: {
    fontFamily: 'Poppins-Bold.ttf',
    fontWeight: "700",
    fontSize: "25%",//32,
    lineHeight: '45%',
    width: "100%",
    marginBottom: "5%",
    marginTop: '25%'
  },
  
  img: {
    marginTop: "3%",
    marginBottom: "5%",
    resizeMode: "contain",
    height: "32%",
  },

  words: {
    fontFamily: 'OpenSans-Regular.ttf',
    fontWeight: "400",
    fontSize: "22%",
    lineHeight: '37%',
    width: "100%",
    // marginBottom: "5%",
    alignSelf: "center"
  },

  button: {  
    marginTop: '12%',
    width: 279,
    height: 64,
    backgroundColor: "#FEB300",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%",
  },
    
  buttonText: {
    color: "#002250",
    fontSize: 24,
    lineHeight: 32,
    fontFamily: 'Poppins-Bold.ttf',
    fontWeight: "700"
  }

})

export default Welcome2TutorPage;
